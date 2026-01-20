import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Theme } from '../../../src/theme';

export default function ShipperDrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerShown: false,
                    drawerActiveTintColor: Theme.colors.primary,
                    drawerStyle: {
                        backgroundColor: Theme.colors.background
                    }
                }}
            >
                <Drawer.Screen
                    name="(tabs)" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: 'Overview',
                    }}
                />
                {/* We can add other Drawer-only screens here if needed, 
            or just let the Tabs handle the main nav */}
            </Drawer>
        </GestureHandlerRootView>
    );
}
