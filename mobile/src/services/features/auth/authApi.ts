import api from '../../../lib/api';

// Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    nom: string;
    email: string;
    password: string;
    role?: 'SHIPPER' | 'CARRIER';
}

export interface User {
    id: string;
    nom: string;
    email: string;
    role: 'SHIPPER' | 'CARRIER' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    user: User;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

// API Functions
export const loginApi = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
};

export const registerApi = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
};

export const refreshTokenApi = async (refreshToken: string): Promise<RefreshResponse> => {
    const response = await api.post<RefreshResponse>('/auth/refresh', { refreshToken });
    return response.data;
};

export const logoutApi = async (refreshToken: string): Promise<void> => {
    await api.post('/auth/logout', { refreshToken });
};

export const getProfileApi = async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
};
