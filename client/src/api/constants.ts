/**
 * BASE_URL configuration for different environments:
 *
 * 1. Local development (npm run dev): Uses localhost:8080/api
 *    - Vite dev server runs, import.meta.env.DEV is true
 *
 * 2. Docker Compose: env.sh replaces ${APP_API_URL} at runtime
 *    - Built app runs in nginx container
 *    - env.sh replaces ${APP_API_URL} with value from docker-compose.yaml (APP_API_URL env var)
 *
 * 3. Google Cloud Run: env.sh replaces ${APP_API_URL} at runtime
 *    - Built app runs in nginx container
 *    - env.sh replaces ${APP_API_URL} with value from Cloud Run environment variables
 */

// In development mode (Vite dev server), use localhost
// In production builds, env.sh will replace ${APP_API_URL} at runtime in the built JS files
export const BASE_URL = import.meta.env.DEV
  ? `http://localhost:8080/api` // Local development - adjust port if your server uses a different one
  : "${APP_API_URL}"; // Production - env.sh replaces this placeholder at container startup
