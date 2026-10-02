// Empty in development (Vite proxies /api to localhost:5000). Set VITE_API_URL in production.
export const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
