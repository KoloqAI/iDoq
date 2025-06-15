#!/bin/bash

# Exit on any error
set -e

echo "🛑 Starting platform cleanup..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Docker is installed
if ! command_exists docker; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Stop all running containers
echo "📦 Stopping all running containers..."
docker stop $(docker ps -aq) 2>/dev/null || true

# Remove all containers
echo "🗑️  Removing all containers..."
docker rm -f $(docker ps -aq) 2>/dev/null || true

# Remove all volumes
echo "🗑️  Removing all volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || true

# Remove all images
echo "🗑️  Removing all images..."
docker rmi -f $(docker images -aq) 2>/dev/null || true

# Remove all networks (except default ones)
echo "🗑️  Removing all custom networks..."
docker network prune -f

# Remove all build cache
echo "🗑️  Removing build cache..."
docker builder prune -af

# Remove temporary files
echo "🗑️  Cleaning up temporary files..."
rm -rf .next 2>/dev/null || true
rm -rf node_modules 2>/dev/null || true
rm -rf .turbo 2>/dev/null || true
rm -rf dist 2>/dev/null || true
rm -rf build 2>/dev/null || true

# Remove Docker system prune (removes unused data)
echo "🧹 Running Docker system prune..."
docker system prune -af --volumes

echo "✅ Platform cleanup completed successfully!" 