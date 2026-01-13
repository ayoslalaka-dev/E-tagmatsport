export type UserRole = 'SHIPPER' | 'CARRIER' | 'ADMIN';

export interface User {
    id: string;
    nom: string;
    email: string;
    role: UserRole;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    nom: string;
    email: string;
    password: string;
    role: UserRole;
}
