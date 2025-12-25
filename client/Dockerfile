# ---- Build stage ----
    FROM node:25-alpine3.22 AS build

    WORKDIR /app
    
    COPY package.json package-lock.json* ./
    RUN npm install
    
    COPY . .
    
    RUN npm run build
    
    # ---- Runtime stage ----
    FROM nginx:alpine
    
    # Install gettext (contains envsubst)
    RUN apk add --no-cache gettext
    
    # REMOVE all default configs (important)
    RUN rm -rf /etc/nginx/conf.d/*
    
    # Copy built app
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Copy and process Nginx config template
    COPY nginx/default.conf /etc/nginx/conf.d/default.conf.template
    RUN envsubst '\$PORT \$API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
        && rm /etc/nginx/conf.d/default.conf.template
    
    # Cloud Run will inject PORT environment variable
    EXPOSE 8080
    
    CMD ["nginx", "-g", "daemon off;"]