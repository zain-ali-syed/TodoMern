#!/bin/sh

# Fallback if PORT is not set (use 8080 locally)
: "${PORT:=8080}"

# Replace placeholders in Nginx template
envsubst '$PORT $API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
exec nginx -g 'daemon off;'
