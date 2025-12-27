export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL // Local development - adjust as needed
  : "${APP_API_URL}"; // Production - env.sh replaces this placeholder at container startup

//Note when we run docker compose the react image has already been built and so it's not considered DEV
// console.log("import.meta.env.DEV ----->", import.meta.env.DEV);
// console.log("import.meta.env.VITE_API_URL ---->", import.meta.env.VITE_API_URL);
// console.log("APP_API_URL ---->", "${APP_API_URL}");
