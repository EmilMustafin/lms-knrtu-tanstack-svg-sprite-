export type User = {
  id: string;
  login: string;
  name: string;
};

export type LoginCredentials = {
  login: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
