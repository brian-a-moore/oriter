# Backend

## Overview


## Requirements

- You need to create a `.env` file based on the `.env.template` file
- You also need to add the `oriter` profile to your local AWS configuration

### Example

```
[oriter]
    aws_access_key_id = <YOUR AWS ACCESS KEY ID>
    aws_secret_access_key = <YOUR AWS SECRET ACCESS KEY>
```

## Terraform

- Run `terraform init` to initialize your Terraform project.
- Run `terraform apply` to create the resources.
- Run `terraform destroy` to destroy all resources.

## Deploying

- `chmod +x deploy.sh`

## Drizzle

- Create migrations: `drizzle-kit generate:pg`
- Delete previous migration: `drizzle-kit drop`
- Pull DDL from existing DB: `drizzle-kit introspect:pg`
- Push directly to DB (no migration files): `drizzle-kit push:pg`
- Check for DB drift: `drizzle-kit check:pg`
- Open Studio: `drizzle-kit studio --port 3000 --verbose`
