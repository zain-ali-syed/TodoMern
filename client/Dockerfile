# ---- Build stage ----
    FROM node:25-alpine3.22 AS build

    WORKDIR /app
    
    COPY package.json package-lock.json* ./
    RUN npm install
    
    COPY . .
    
    RUN npm run build
    
    
    # ---- Runtime stage ----
    FROM nginx:alpine
    
    # REMOVE all default configs (important)
    RUN rm -rf /etc/nginx/conf.d/*
    
    # Copy our config
    COPY nginx/default.conf /etc/nginx/conf.d/default.conf
    
    # Copy built app
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Cloud Run port
    EXPOSE 8080

    COPY env.sh /docker-entrypoint.d/env.sh
    RUN chmod +x /docker-entrypoint.d/env.sh
    
    # Start nginx (env.sh runs automatically from /docker-entrypoint.d/ before this)
    CMD ["nginx", "-g", "daemon off;"]
    