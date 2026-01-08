import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Search, Package, User } from 'lucide-react-native';
import { isAuthenticated } from './src/services/auth.service';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import TendersListScreen from './src/screens/TendersListScreen';
import NewTenderScreen from './src/screens/NewTenderScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0F0F12',
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#64748b',
            }}
        >
            <Tab.Screen
                name="Explore"
                component={TendersListScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="My Tenders"
                component={TendersListScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Package size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="New"
                component={NewTenderScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Package size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Artificial delay to show the nice splash screen
            await new Promise(resolve => setTimeout(resolve, 2500));
            const authenticated = await isAuthenticated();
            setIsAuth(authenticated);
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuth && <Stack.Screen name="Login" component={LoginScreen} />}
                <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
