#  PROVIDER
provider "aws" {
  profile = "oriter"
  region  = "us-east-1"
}

data "aws_caller_identity" "current" {}

# RANDOM
resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "_%"

  lifecycle {
    ignore_changes = [result]
  }
}

resource "random_string" "jwt_secret" {
  length  = 32
  special = false
}

# RDS
resource "aws_db_instance" "oriter_database" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.t3.micro"
  identifier           = "oriter-database"
  username             = "oriter"
  password             = random_password.db_password.result
  parameter_group_name = "default.postgres16"
  skip_final_snapshot  = true

  lifecycle {
    ignore_changes = [password]
  }
}

# SECRETS
resource "aws_secretsmanager_secret" "jwt_secret" {
  name = "jwtsecret"
}

resource "aws_secretsmanager_secret" "db_password" {
  name = "oriter_database_password"
}

resource "aws_secretsmanager_secret_version" "jwt_secret" {
  secret_id     = aws_secretsmanager_secret.jwt_secret.id
  secret_string = random_string.jwt_secret.result
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = random_password.db_password.result

}

# S3
resource "aws_s3_bucket" "oriter_customer_images" {
  bucket = "oriter-customer-images"
  acl    = "private"
}

resource "aws_s3_bucket" "oriter_api_code" {
  bucket = "oriter-api-code"
  acl    = "private"
}

resource "aws_s3_bucket" "oriter_oriter_migrations" {
  bucket = "oriter-migrations-code"
  acl    = "private"
}

resource "aws_s3_bucket_object" "oriter_api_object" {
  bucket     = "oriter-api-code"
  key        = "oriter_api.zip"
  source     = "../functions/api/oriter_api.zip"
  etag       = filemd5("../functions/api/oriter_api.zip")
  depends_on = [aws_s3_bucket.oriter_api_code]
}

resource "aws_s3_bucket_object" "oriter_migrations_object" {
  bucket     = "oriter-migrations-code"
  key        = "oriter_migrations.zip"
  source     = "../functions/migrations/oriter_migrations.zip"
  etag       = filemd5("../functions/migrations/oriter_migrations.zip")
  depends_on = [aws_s3_bucket.oriter_oriter_migrations]
}

# IAM
resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect = "Allow"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "lambda_access" {
  name = "lambda_access"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "rds:*",
          "s3:*"
        ]
        Resource = [
          "arn:aws:rds:us-east-1:${data.aws_caller_identity.current.account_id}:db:${aws_db_instance.oriter_database.identifier}",
          aws_s3_bucket.oriter_customer_images.arn,
        ]
        Effect = "Allow"
      },
    ]
  })
}

# LAMBDA
resource "aws_lambda_function" "oriter_api" {
  function_name    = "oriter_api"
  handler          = "index.handler"
  runtime          = "nodejs18.x"
  role             = aws_iam_role.lambda_role.arn
  s3_bucket        = aws_s3_bucket.oriter_api_code.bucket
  s3_key           = "oriter_api.zip"
  source_code_hash = filebase64sha256("../functions/api/oriter_api.zip")

  environment {
    variables = {
      JWT_SECRET  = aws_secretsmanager_secret_version.jwt_secret.secret_string
      DB_PASSWORD = aws_secretsmanager_secret_version.db_password.secret_string
      DB_HOST     = aws_db_instance.oriter_database.address
      DB_USER     = aws_db_instance.oriter_database.username
      DB_NAME     = aws_db_instance.oriter_database.identifier
    }
  }

  depends_on = [aws_s3_bucket_object.oriter_api_object]
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.oriter_api.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_function" "migrations_lambda" {
  function_name    = "migrations_lambda"
  handler          = "index.handler"
  runtime          = "nodejs18.x"
  role             = aws_iam_role.lambda_role.arn
  s3_bucket        = aws_s3_bucket.oriter_oriter_migrations.bucket
  s3_key           = "oriter_migrations.zip"
  source_code_hash = filebase64sha256("../functions/migrations/oriter_migrations.zip")
  timeout          = 15

  environment {
    variables = {
      DATABASE_URL = "postgresql://${aws_db_instance.oriter_database.username}:${aws_secretsmanager_secret_version.db_password.secret_string}@${aws_db_instance.oriter_database.address}:5432/${aws_db_instance.oriter_database.identifier}"
    }
  }

  depends_on = [aws_s3_bucket_object.oriter_migrations_object]
}

# API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name        = "oriter_api"
  description = "API for Oriter"
}

resource "aws_api_gateway_resource" "resource" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.oriter_api.invoke_arn
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [aws_api_gateway_integration.integration]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "v1"
}