import { useQuery } from '@tanstack/react-query';
import { getProfileApi, User } from './authApi';
import { useAuthStore } from '../../../stores/authStore';

// Profile query
export const useProfileQuery = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return useQuery<User>({
        queryKey: ['profile'],
        queryFn: getProfileApi,
        enabled: isAuthenticated,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });
};
