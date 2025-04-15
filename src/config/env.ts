export const env = Object.freeze({
  NODE_ENV: import.meta.env.MODE,
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
} as const);