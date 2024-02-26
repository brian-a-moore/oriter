#!/bin/bash

echo "Deploy starting..."

# Run the build command
npm run build

# Run the deploy command
cd .aws && terraform apply

# Go back to the project root directory
cd ..

# Remove the dist folder and the zip file
rm -rf dist oriter_code.zip

echo "Deploy complete"