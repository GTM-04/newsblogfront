import apiClient from './client';

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_editor: boolean;
  date_joined: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>('/api/auth/login/', { email, password });
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get<User>('/api/users/me/');
  return data;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('access_token');
};
