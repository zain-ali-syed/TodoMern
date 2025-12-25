# Stage 1: Build React app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Install envsubst for template variable replacement
RUN apk add --no-cache gettext

# Copy React build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx template (with placeholders)
COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

# Replace placeholders at runtime and start Nginx
CMD envsubst '$PORT $API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'
