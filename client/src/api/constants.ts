export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL // Development build
  : window._env_?.APP_API_URL || ""; // Production runtime value

//Note when we run docker compose the react image has already been built and so it's not considered DEV
console.log("import.meta.env.DEV ----->", import.meta.env.DEV);
console.log("import.meta.env.VITE_API_URL ---->", import.meta.env.VITE_API_URL);
console.log("window._env_ ---->", window._env_);
console.log("window._env_.APP_API_URL ---->", window._env_?.APP_API_URL);
