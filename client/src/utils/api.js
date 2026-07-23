const configuredBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '');

export const apiUrl = (path) => `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
