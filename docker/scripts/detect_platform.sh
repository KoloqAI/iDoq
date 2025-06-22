#!/bin/bash

# Detect the operating system and architecture
detect_platform() {
    local os=$(uname -s)
    local arch=$(uname -m)
    
    if [[ "$os" == "Darwin" && "$arch" == "arm64" ]]; then
        echo "macos_arm64"
    elif [[ "$os" == "Darwin" && "$arch" == "x86_64" ]]; then
        echo "macos_x86_64"
    elif [[ "$os" == "Linux" ]]; then
        echo "linux"
    elif [[ "$os" == "MINGW"* || "$os" == "MSYS"* || "$os" == "CYGWIN"* ]]; then
        echo "windows"
    else
        echo "unknown"
    fi
}

# Check if we need to force AMD64 platform
should_force_amd64() {
    local platform=$(detect_platform)
    if [[ "$platform" == "macos_arm64" ]]; then
        echo "true"
    else
        echo "false"
    fi
}

# Get platform-specific Docker Compose arguments
get_platform_args() {
    local force_amd64=$(should_force_amd64)
    
    if [[ "$force_amd64" == "true" ]]; then
        echo "--platform linux/amd64"
    else
        echo ""
    fi
}

# Export functions for use in other scripts
export -f detect_platform
export -f should_force_amd64
export -f get_platform_args

# If script is run directly, output the platform
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    detect_platform
fi 