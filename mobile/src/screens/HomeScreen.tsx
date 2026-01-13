import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import { Briefcase, Users, TrendingUp, ChevronRight } from 'lucide-react-native';
import { Theme } from '../theme';

import { getStats } from '../services/stats.service';

export default function HomeScreen({ navigation }: any) {
    const [stats, setStats] = React.useState({ visitors: 0, activeTenders: 0 });

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStats();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Bonjour,</Text>
                    <Text style={styles.title}>E-Tagmat Sport</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Text style={styles.sectionTitle}>Sélectionnez votre profil</Text>

                    <TouchableOpacity
                        style={[styles.mainButton, styles.providerBtn]}
                        onPress={() => navigation.navigate('Explore')}
                    >
                        <View style={styles.buttonIcon}>
                            <Briefcase size={32} color={Theme.colors.white} />
                        </View>
                        <View style={styles.buttonTextContent}>
                            <Text style={styles.buttonTitle}>Prestataire</Text>
                            <Text style={styles.buttonSubtitle}>Accédez aux appels d'offres et proposez vos services</Text>
                        </View>
                        <ChevronRight size={20} color={Theme.colors.white} opacity={0.5} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainButton, styles.clientBtn]}
                        onPress={() => navigation.navigate('GroupageTrends')}
                    >
                        <View style={styles.buttonIcon}>
                            <Users size={32} color={Theme.colors.white} />
                        </View>
                        <View style={styles.buttonTextContent}>
                            <Text style={styles.buttonTitle}>Client / Bénéficiaire</Text>
                            <Text style={styles.buttonSubtitle}>Optimisez vos envois avec nos tendances groupage</Text>
                        </View>
                        <ChevronRight size={20} color={Theme.colors.white} opacity={0.5} />
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <TrendingUp size={24} color={Theme.colors.primary} />
                        <Text style={styles.statValue}>{stats.visitors}</Text>
                        <Text style={styles.statLabel}>Visiteurs Actifs</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Briefcase size={24} color={Theme.colors.secondary} />
                        <Text style={styles.statValue}>{stats.activeTenders}</Text>
                        <Text style={styles.statLabel}>Offres Actives</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    header: {
        marginBottom: Theme.spacing.xl,
        marginTop: Theme.spacing.md,
    },
    greeting: {
        fontSize: 18,
        color: Theme.colors.textMuted,
        fontWeight: '500',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Theme.colors.text,
        marginTop: 4,
    },
    buttonContainer: {
        gap: Theme.spacing.md,
    },
    sectionTitle: {
        fontSize: 16,
        color: Theme.colors.textMuted,
        fontWeight: '600',
        marginBottom: Theme.spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    mainButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Theme.spacing.lg,
        borderRadius: Theme.borderRadius.lg,
        gap: Theme.spacing.md,
        ...Theme.shadows.card,
    },
    providerBtn: {
        backgroundColor: Theme.colors.primary,
    },
    clientBtn: {
        backgroundColor: Theme.colors.accent,
    },
    buttonIcon: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextContent: {
        flex: 1,
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.white,
    },
    buttonSubtitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 2,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Theme.spacing.xl,
        gap: Theme.spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: Theme.colors.surface,
        padding: Theme.spacing.lg,
        borderRadius: Theme.borderRadius.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.surfaceLight,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        color: Theme.colors.text,
        marginTop: Theme.spacing.sm,
    },
    statLabel: {
        fontSize: 12,
        color: Theme.colors.textMuted,
        marginTop: 2,
    },
});
