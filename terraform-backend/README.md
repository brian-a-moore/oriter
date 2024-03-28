# Backend

This is the backend infrastructure and code for Oriter.

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

Setup scripts:
- `chmod +x deploy.sh`
- `chmod +x cleanup.sh`

Run scripts:
- `./deploy.sh` to deploy to AWS
- `./cleanup.sh` to cleanup artifacts if a deploy fails partway through

## Prisma

| Command       | Description                                        | Notes                                     |
| ------------- | -------------------------------------------------- | ----------------------------------------- |
| `db:format`   | Formats the prisma.schema file                     |                                           |
| `db:reset`    | Resets the database                                | Will delete all existing data and re-seed |
| `db:migrate`  | Will create new migrations based on recent changes |                                           |
| `db:generate` | Will update the client package                     | Happens automatically with `db:migrate`   |
| `db:seed`     | Will seed the local database                       | Happens automatically with `db:migrate`   |
| `db:studio`   | Opens a local GUI for exploring db                 |                                           |
| `db:mock`     | Adds some test data to the database                |                                           |
