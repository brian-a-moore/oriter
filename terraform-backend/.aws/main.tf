#  PROVIDER
provider "aws" {
  profile = "oriter"
  region  = "us-east-1"
}

# ARCHIVE
data "archive_file" "oriter_code" {
  type        = "zip"
  source_file = "../oriter_code.zip"
  output_path = "../oriter_code.zip"
}

# DYNAMODB
resource "aws_dynamodb_table" "oriter_database" {
  name           = "oriter_database"
  hash_key       = "PK"
  range_key      = "SK"
  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "PK"
    type = "S"
  }

  attribute {
    name = "SK"
    type = "S"
  }
}

# S3
resource "aws_s3_bucket" "oriter_customer_images" {
  bucket = "oriter-customer-images"
  acl    = "private"
}

resource "aws_s3_bucket" "oriter_lambda_code" {
  depends_on = [aws_s3_bucket.oriter_lambda_code]
  bucket = "oriter-lambda-code"
  acl    = "private"
}

resource "aws_s3_bucket_object" "object" {
  bucket = "oriter-lambda-code"
  key    = "oriter_code.zip"
  source = "../oriter_code.zip"
  etag   = filemd5("../oriter_code.zip")
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
          "dynamodb:*",
          "s3:*"
        ]
        Resource = [
          aws_dynamodb_table.oriter_database.arn,
          aws_s3_bucket.oriter_customer_images.arn
        ]
        Effect = "Allow"
      },
    ]
  })
}

# LAMBDA
resource "aws_lambda_function" "oriter_form_submission" {
  function_name = "oriter_form_submission"
  handler       = "dist/index.handlerMiddleware"
  runtime       = "nodejs18.x"
  role          = aws_iam_role.lambda_role.arn
  s3_bucket = aws_s3_bucket.oriter_lambda_code.bucket
  s3_key    = "oriter_code.zip"
  source_code_hash = filebase64sha256(data.archive_file.oriter_code.output_path)

  depends_on = [aws_s3_bucket_object.object]
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.oriter_form_submission.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

# API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name        = "oriter_api"
  description = "API for Oriter form submission"
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
  uri                     = aws_lambda_function.oriter_form_submission.invoke_arn
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [aws_api_gateway_integration.integration]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "v1"
}