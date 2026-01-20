import { Redirect } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';
import { View, ActivityIndicator } from 'react-native';

export default function AppIndex() {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (user?.role === 'SHIPPER') {
        return <Redirect href="/(app)/(shipper)" />;
    }

    // Default to Carrier/Prestataire
    return <Redirect href="/(app)/(carrier)" />;
}
