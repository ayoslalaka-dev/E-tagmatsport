import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { User, LogOut, Settings, Bell, Shield, HelpCircle } from 'lucide-react-native';
import { Theme } from '../../../src/theme';
import { useAuthStore } from '../../../src/stores/authStore';
import { useLogoutMutation, useProfileQuery } from '../../../src/services/features/auth';

export default function ProfileScreen() {
    const { user } = useAuthStore();
    const logoutMutation = useLogoutMutation();
    const { data: profile } = useProfileQuery();

    const displayUser = profile || user;

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const menuItems = [
        { icon: Settings, label: 'Account Settings', onPress: () => { } },
        { icon: Bell, label: 'Notifications', onPress: () => { } },
        { icon: Shield, label: 'Privacy & Security', onPress: () => { } },
        { icon: HelpCircle, label: 'Help & Support', onPress: () => { } },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <User size={48} color={Theme.colors.primary} />
                        </View>
                    </View>
                    <Text style={styles.name}>{displayUser?.nom || 'User'}</Text>
                    <Text style={styles.email}>{displayUser?.email || ''}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{displayUser?.role || 'SHIPPER'}</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                            <View style={styles.menuItemLeft}>
                                <item.icon size={22} color={Theme.colors.textMuted} />
                                <Text style={styles.menuItemText}>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    disabled={logoutMutation.isPending}
                >
                    <LogOut size={22} color={Theme.colors.error} />
                    <Text style={styles.logoutText}>
                        {logoutMutation.isPending ? 'Logging out...' : 'Log Out'}
                    </Text>
                </TouchableOpacity>

                {/* Version */}
                <Text style={styles.version}>E-Tagmat v1.0.0</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 30,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Theme.colors.primary,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: Theme.colors.text,
    },
    email: {
        fontSize: 14,
        color: Theme.colors.textMuted,
        marginTop: 4,
    },
    roleBadge: {
        backgroundColor: Theme.colors.primary + '20',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 12,
    },
    roleText: {
        color: Theme.colors.primary,
        fontSize: 12,
        fontWeight: '600',
    },
    menuContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Theme.colors.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuItemText: {
        fontSize: 16,
        color: Theme.colors.text,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 16,
        backgroundColor: Theme.colors.error + '10',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Theme.colors.error + '30',
    },
    logoutText: {
        fontSize: 16,
        color: Theme.colors.error,
        fontWeight: '600',
    },
    version: {
        textAlign: 'center',
        color: Theme.colors.textMuted,
        fontSize: 12,
        marginTop: 30,
        marginBottom: 40,
    },
});
