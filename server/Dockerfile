# Build React
FROM node:25-alpine3.22 AS builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Final container
FROM node:25-alpine3.22
WORKDIR /app/server

ENV PORT_INTERNAL=5000

# Copy React build
COPY --from=builder /app/client/build /usr/share/nginx/html

# Install backend dependencies
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Install Nginx
RUN apk add --no-cache nginx

# Copy Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Run Express and Nginx together in a single CMD
CMD node server/index.js & exec nginx -g 'daemon off;'
