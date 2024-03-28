#!/bin/bash
set -e

echo "Cleanup starting..."

echo "Cleaning up artifacts..."
cd functions/api && rm -rf dist oriter_api.zip
cd ../migrations && rm -rf dist prisma oriter_migrations.zip

echo "Cleanup COMPLETE"