#!/bin/bash
set -e

echo "Deploy starting..."

echo "Building functions..."
cd ./functions/api && npm run build
cp -r ./prisma ../migrations
cd ../migrations && npm run build

echo "Deploying infrastructure..."
cd ../../.aws && terraform apply -auto-approve

echo "Cleaning up artifacts..."
cd ../functions/api && rm -rf dist oriter_api.zip
cd ../migrations && rm -rf dist prisma oriter_migrations.zip

echo "Running migrations..."
AWS_PROFILE=oriter aws lambda invoke --region us-east-1 --function-name migrations_lambda outputfile.txt

echo "Deploy COMPLETE"