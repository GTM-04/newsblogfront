import axios, { AxiosError } from 'axios';

// Use environment variable or default to Railway backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://newsblogbackend.railway.internal';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
apiClient.interceptors.response.use(
  (response: any) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && error.config) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/api/auth/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', data.access);
          error.config.headers.Authorization = `Bearer ${data.access}`;
          return axios(error.config);
        } catch {
          // Refresh failed, logout
          localStorage.clear();
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
