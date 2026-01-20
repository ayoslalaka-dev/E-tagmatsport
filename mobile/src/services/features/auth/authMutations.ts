import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../../stores/authStore';
import {
    loginApi,
    registerApi,
    logoutApi,
    LoginRequest,
    RegisterRequest
} from './authApi';

// Login mutation
export const useLoginMutation = () => {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginRequest) => loginApi(data),
        onSuccess: (response) => {
            setAuth(response.user, response.tokens.accessToken, response.tokens.refreshToken);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            router.replace('/(app)');
        },
    });
};

// Register mutation
export const useRegisterMutation = () => {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RegisterRequest) => registerApi(data),
        onSuccess: (response) => {
            setAuth(response.user, response.tokens.accessToken, response.tokens.refreshToken);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            router.replace('/(app)');
        },
    });
};

// Logout mutation
export const useLogoutMutation = () => {
    const router = useRouter();
    const { refreshToken, clearAuth } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => {
            if (refreshToken) {
                return logoutApi(refreshToken);
            }
            return Promise.resolve();
        },
        onSuccess: () => {
            clearAuth();
            queryClient.clear();
            router.replace('/(auth)/login');
        },
        onError: () => {
            // Even if logout fails, clear local auth state
            clearAuth();
            queryClient.clear();
            router.replace('/(auth)/login');
        },
    });
};
