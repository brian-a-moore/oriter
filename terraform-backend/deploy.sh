#!/bin/bash

echo "Deploy starting..."

# Run Prisma migration
echo "Step 1 of 4: Running Prisma migration..."
dotenv -e .env -- npx prisma migrate deploy
dotenv -e .env -- npx prisma generate

echo "Step 1 of 4: COMPLETE"
# Run the build command
echo "Step 2 of 4: Building..."
npm run build

echo "Step 2 of 4: COMPLETE"
# Run the deploy command
echo "Step 3 of 4: Deploying..."
cd .aws && terraform apply -auto-approve

echo "Step 3 of 4: COMPLETE"
# Go back to the project root directory
echo "Step 4 of 4: Cleanup..."
cd ..

# Remove the dist folder and the zip file
rm -rf dist oriter_code.zip

echo "Step 4 of 4: COMPLETE"
echo "Deploy COMPLETE"