import { queryOptions } from '@tanstack/react-query';
import { AuthResponse, LoginCredentials, User } from '../model/types';
import { jsonApiInstance } from '@/shared/api/auth-user/api-instance';

export const authApi = {
  baseKey: 'auth',

  getCurrentUserQueryOptions: () => {
    return queryOptions({
      queryKey: [authApi.baseKey, 'me'],
      queryFn: (meta) =>
        jsonApiInstance<User>(`/auth/me`, {
          signal: meta.signal,
        }),
    });
  },

  login: (credentials: LoginCredentials) => {
    return jsonApiInstance<AuthResponse>(`/auth/login`, {
      method: 'POST',
      json: credentials,
    });
  },

  logout: () => {
    return jsonApiInstance(`/auth/logout`, {
      method: 'POST',
    });
  },
};
