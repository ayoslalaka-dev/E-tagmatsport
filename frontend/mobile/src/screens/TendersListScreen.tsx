import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Image,
    StatusBar
} from 'react-native';
import { Package, MapPin, Calendar, ChevronRight, Filter } from 'lucide-react-native';
import { Theme } from '../theme';

const TENDERS = [
    { id: '1', origin: 'Casablanca', destination: 'Marseille', date: 'Oct 12, 2023', weight: '4500 kg', type: 'EXPORT', status: 'OPEN', budget: '$1,200', company: 'LogiTrans SA' },
    { id: '2', origin: 'Valencia', destination: 'Tanger Med', date: 'Oct 15, 2023', weight: '12000 kg', type: 'IMPORT', status: 'IN_PROGRESS', budget: '$2,800', company: 'SitMar Maroc' },
    { id: '3', origin: 'Casablanca', destination: 'Antwerp', date: 'Oct 18, 2023', weight: '2100 kg', type: 'EXPORT', status: 'OPEN', budget: '$950', company: 'Global Freight' },
    { id: '4', origin: 'Hamburg', destination: 'Agadir', date: 'Oct 20, 2023', weight: '8000 kg', type: 'IMPORT', status: 'URGENT', budget: '$3,100', company: 'Dachser Morocco' },
];

export default function TendersListScreen() {
    const renderItem = ({ item }: any) => {
        const isUrgent = item.status === 'URGENT';

        return (
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.typeBadge, { backgroundColor: item.type === 'EXPORT' ? Theme.colors.primary + '20' : Theme.colors.secondary + '20' }]}>
                        <Text style={[styles.typeText, { color: item.type === 'EXPORT' ? Theme.colors.primary : Theme.colors.secondary }]}>
                            {item.type}
                        </Text>
                    </View>
                    <View style={[styles.statusBadge, isUrgent && styles.urgentBadge]}>
                        <Text style={[styles.statusText, isUrgent && styles.urgentText]}>
                            {item.status.replace('_', ' ')}
                        </Text>
                    </View>
                </View>

                <View style={styles.routeContainer}>
                    <View style={styles.locationInfo}>
                        <View style={styles.dotContainer}>
                            <View style={[styles.dot, { backgroundColor: Theme.colors.primary }]} />
                            <View style={styles.dotLine} />
                            <View style={[styles.dot, { backgroundColor: Theme.colors.error }]} />
                        </View>
                        <View style={styles.cities}>
                            <Text style={styles.cityName}>{item.origin}</Text>
                            <Text style={[styles.cityName, { marginTop: 24 }]}>{item.destination}</Text>
                        </View>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>EST. BUDGET</Text>
                        <Text style={styles.priceValue}>{item.budget}</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.stats}>
                        <View style={styles.statItem}>
                            <Package size={14} color={Theme.colors.textMuted} />
                            <Text style={styles.statText}>{item.weight}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Calendar size={14} color={Theme.colors.textMuted} />
                            <Text style={styles.statText}>{item.date}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>View Details</Text>
                        <ChevronRight size={16} color={Theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Marketplace</Text>
                    <Text style={styles.title}>Available Tenders</Text>
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Filter size={20} color={Theme.colors.white} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={TENDERS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.lg,
    },
    greeting: {
        fontSize: 14,
        color: Theme.colors.textMuted,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Theme.colors.text,
        marginTop: 4,
    },
    filterBtn: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.surfaceLight,
    },
    list: {
        padding: Theme.spacing.lg,
        gap: Theme.spacing.md,
    },
    card: {
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.lg,
        padding: Theme.spacing.lg,
        borderWidth: 1,
        borderColor: Theme.colors.surfaceLight,
        ...Theme.shadows.card,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.lg,
    },
    typeBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    statusBadge: {
        backgroundColor: Theme.colors.surfaceLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 10,
        color: Theme.colors.textMuted,
        fontWeight: '700',
    },
    urgentBadge: {
        backgroundColor: Theme.colors.error + '20',
    },
    urgentText: {
        color: Theme.colors.error,
    },
    routeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.lg,
    },
    locationInfo: {
        flexDirection: 'row',
        gap: 16,
    },
    dotContainer: {
        alignItems: 'center',
        paddingVertical: 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dotLine: {
        width: 1,
        height: 30,
        backgroundColor: Theme.colors.surfaceLight,
        marginVertical: 4,
    },
    cities: {
        justifyContent: 'space-between',
    },
    cityName: {
        color: Theme.colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    priceLabel: {
        fontSize: 10,
        color: Theme.colors.textMuted,
        fontWeight: '600',
        marginBottom: 4,
    },
    priceValue: {
        fontSize: 20,
        color: Theme.colors.primary,
        fontWeight: '800',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.surfaceLight,
    },
    stats: {
        flexDirection: 'row',
        gap: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 12,
        color: Theme.colors.textMuted,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionBtnText: {
        fontSize: 14,
        color: Theme.colors.primary,
        fontWeight: '700',
    },
});

