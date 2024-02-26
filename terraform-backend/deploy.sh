#!/bin/bash

# Run the build command
npm run build

# Run the deploy command
cd .aws && terraform apply

# Go back to the project root directory
cd ..

# Print the contents of the zip file
unzip -l oriter_code.zip

# Remove the dist folder and the zip file
rm -rf dist oriter_code.zip