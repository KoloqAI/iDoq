#!/bin/bash

# Wrapper script for docker compose commands that automatically applies platform overrides on macOS ARM64

# Source platform detection
script_dir=$(dirname "$(readlink -f "$BASH_SOURCE")")
source "$script_dir/detect_platform.sh"

# Get the base compose file
compose_file="$1"
shift

# Detect platform and set compose files
platform=$(detect_platform)
compose_files="-f $compose_file"

if [[ "$platform" == "macos_arm64" ]]; then
    echo "Detected macOS ARM64. Using AMD64 platform override for compatibility."
    compose_files="-f $compose_file -f docker-compose.macos-override.yaml"
fi

# Execute docker compose command with appropriate files
docker compose $compose_files "$@" 