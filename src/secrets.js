// Determine base URL dynamically based on environment or Vite mode:
// - Local development (npm run dev): http://localhost:5000
// - Production deployment (npm run build): https://config.frenchcert.org
const rawBaseUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://config.frenchcert.org');

// Normalize: remove trailing slash and trailing '/api' because components append '/api/...'
const BASE_URL = rawBaseUrl.replace(/\/+$/, '').replace(/\/api$/, '');

export { BASE_URL };