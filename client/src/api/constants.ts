// In development, use localhost
// In production, env.sh will replace the placeholder ${APP_API_URL} at runtime
// Note: The placeholder must appear as a literal string in the built JS for sed to replace it
const API_URL_PLACEHOLDER = "${APP_API_URL}";
console.log("API_URL_PLACEHOLDER ", API_URL_PLACEHOLDER);
export const BASE_URL = import.meta.env.DEV ? `http://localhost:8080/api` : API_URL_PLACEHOLDER;
