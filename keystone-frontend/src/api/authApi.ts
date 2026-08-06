import api from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {

  const response = await api.post<LoginResponse>(
    "/auth/login",
    request
  );

  return response.data;
};