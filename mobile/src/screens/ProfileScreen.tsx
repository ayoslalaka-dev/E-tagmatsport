import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar
} from 'react-native';
import {
    User,
    Shield,
    FileText,
    Settings,
    LogOut,
    ChevronRight,
    History,
    CreditCard,
    LayoutDashboard
} from 'lucide-react-native';
import { Theme } from '../theme';

export default function ProfileScreen({ navigation }: any) {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>YT</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Shield size={14} color={Theme.colors.white} />
                        </View>
                    </View>
                    <Text style={styles.name}>Yassine Transport</Text>
                    <Text style={styles.email}>contact@yassine-transport.ma</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>24</Text>
                            <Text style={styles.statLabel}>Completed</Text>
                        </View>
                        <View style={[styles.statItem, styles.statDivider]}>
                            <Text style={styles.statValue}>4.9</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Active</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Business</Text>
                    <ProfileItem icon={LayoutDashboard} label="Operations Center" />
                    <ProfileItem icon={History} label="Tender History" />
                    <ProfileItem icon={CreditCard} label="Payments & Wallet" />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <ProfileItem icon={User} label="Personal Information" />
                    <ProfileItem icon={Shield} label="Security & Verification" badge="Verified" />
                    <ProfileItem icon={Settings} label="App Settings" />
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <LogOut size={20} color={Theme.colors.error} />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>E-Tagmat v1.0.4</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

function ProfileItem({ icon: Icon, label, badge }: any) {
    return (
        <TouchableOpacity style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.iconContainer}>
                    <Icon size={20} color={Theme.colors.textMuted} />
                </View>
                <Text style={styles.itemLabel}>{label}</Text>
            </View>
            <View style={styles.itemRight}>
                {badge && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                )}
                <ChevronRight size={18} color={Theme.colors.surfaceLight} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: Theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.surface,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: Theme.spacing.md,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: Theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Theme.colors.primary,
        ...Theme.shadows.primary,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '900',
        color: Theme.colors.primary,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: Theme.colors.secondary,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Theme.colors.background,
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
    statsContainer: {
        flexDirection: 'row',
        marginTop: Theme.spacing.lg,
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.lg,
        padding: Theme.spacing.md,
        width: '90%',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: Theme.colors.surfaceLight,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: Theme.colors.primary,
    },
    statLabel: {
        fontSize: 10,
        color: Theme.colors.textMuted,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginTop: 2,
    },
    section: {
        paddingHorizontal: Theme.spacing.lg,
        paddingTop: Theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: Theme.colors.textMuted,
        marginBottom: Theme.spacing.md,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Theme.colors.surface,
        padding: Theme.spacing.md,
        borderRadius: Theme.borderRadius.md,
        marginBottom: Theme.spacing.sm,
        borderWidth: 1,
        borderColor: Theme.colors.surfaceLight,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Theme.spacing.md,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemLabel: {
        color: Theme.colors.text,
        fontSize: 15,
        fontWeight: '600',
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        backgroundColor: Theme.colors.secondary + '20',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        color: Theme.colors.secondary,
        fontSize: 10,
        fontWeight: '800',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: Theme.spacing.xl,
        padding: Theme.spacing.md,
    },
    logoutText: {
        color: Theme.colors.error,
        fontSize: 16,
        fontWeight: '700',
    },
    versionText: {
        textAlign: 'center',
        color: Theme.colors.textMuted,
        fontSize: 12,
        marginTop: Theme.spacing.md,
        marginBottom: Theme.spacing.xxl,
    },
});

