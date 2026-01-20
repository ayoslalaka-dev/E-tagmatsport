import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../src/stores/authStore';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

export default function RootLayout() {
    const setLoading = useAuthStore((state) => state.setLoading);

    useEffect(() => {
        // Check if Zustand has finished hydrating from AsyncStorage
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setLoading(false);
        });

        // If already hydrated
        if (useAuthStore.persist.hasHydrated()) {
            setLoading(false);
        }

        return () => {
            unsubscribe();
        };
    }, [setLoading]);

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(app)" />
            </Stack>
        </QueryClientProvider>
    );
}
