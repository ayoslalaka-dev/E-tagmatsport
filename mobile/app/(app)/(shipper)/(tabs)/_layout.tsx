import { Tabs } from 'expo-router';
import { LayoutDashboard, Truck, Wallet, User, FileText } from 'lucide-react-native';
import { Theme } from '../../../../src/theme';

export default function ShipperTabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Theme.colors.background,
                    borderTopWidth: 1,
                    borderTopColor: Theme.colors.border,
                    height: 60,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.textMuted,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Tenders',
                    tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="shipments"
                options={{
                    title: 'Shipments',
                    tabBarIcon: ({ color, size }) => <Truck size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="payments"
                options={{
                    title: 'Payments',
                    tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
