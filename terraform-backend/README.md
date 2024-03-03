# Backend

## Terraform

- Run `terraform init` to initialize your Terraform project.
- Run `terraform apply` to create the resources.

## Script

- `chmod +x deploy.sh`

## Drizzle

- Create migrations: `drizzle-kit generate:pg`
- Delete previous migration: `drizzle-kit drop`
- Pull DDL from existing DB: `drizzle-kit introspect:pg`
- Push directly to DB (no migration files): `drizzle-kit push:pg`
- Check for DB drift: `drizzle-kit check:pg`
- Open Studio: `drizzle-kit studio --port 3000 --verbose`
