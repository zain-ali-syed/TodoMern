#!/bin/sh
echo "Replacing environment variables in config.js"

# Export all APP_ variables for envsubst
export $(env | grep APP_ | cut -d= -f1)

# Replace placeholders in config.js
envsubst < /usr/share/nginx/html/config.js > /usr/share/nginx/html/config.js.tmp
mv /usr/share/nginx/html/config.js.tmp /usr/share/nginx/html/config.js

echo "Environment variables injected successfully"
