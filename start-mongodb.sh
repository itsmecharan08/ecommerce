#!/bin/bash

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    # Try to start MongoDB (adjust path if needed)
    if command -v brew &> /dev/null; then
        # macOS with Homebrew
        brew services start mongodb-community
    elif command -v systemctl &> /dev/null; then
        # Linux with systemd
        sudo systemctl start mongod
    else
        echo "Please start MongoDB manually"
        exit 1
    fi
    echo "MongoDB started successfully!"
else
    echo "MongoDB is already running"
fi
