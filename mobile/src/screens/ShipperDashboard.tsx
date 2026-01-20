import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    FlatList
} from 'react-native';
import { Search, SlidersHorizontal, Bell, Menu } from 'lucide-react-native';
import { Theme } from '../theme';
import { TenderCard } from '../components/TenderCard';
import { useTendersQuery } from '../services/features/tender/tenderQueries';
import { useAuthStore } from '../stores/authStore';

const CATEGORIES = ['All Tenders', 'Agroalimentaire', 'Électronique', 'Textile', 'Chimique'];

export default function ShipperDashboard() {
    const { user } = useAuthStore();
    const { data: tenders, isLoading } = useTendersQuery();
    const [activeCategory, setActiveCategory] = useState('All Tenders');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data if API returns empty (for visualization purposes as requested)
    const displayTenders = tenders && tenders.length > 0 ? tenders : [
        {
            id: '1',
            type: 'standard', // Mapping to API type might need adjustment
            origine: 'Casablanca, Tanger Med Port',
            destination: 'Paris, Gennevilliers Port',
            date: new Date().toISOString(),
            statut: 'OPEN',
            description: 'Export Agroalimentaire',
            budget: 1200,
            createdById: 'user1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: '2',
            type: 'express',
            origine: 'Tanger, Rabat Business Park',
            destination: 'Madrid, Zona Industrial',
            date: new Date().toISOString(),
            statut: 'OPEN',
            description: 'Import Électronique',
            budget: 2450,
            createdById: 'user1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                    <Menu size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tenders Dashboard</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.badge} />
                    <Bell size={24} color={Theme.colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search size={20} color={Theme.colors.textMuted} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search routes or cargo..."
                        placeholderTextColor={Theme.colors.textLight}
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <SlidersHorizontal size={20} color={Theme.colors.textMuted} />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryChip,
                                activeCategory === cat && styles.categoryChipActive
                            ]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText,
                                activeCategory === cat && styles.categoryTextActive
                            ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Section Title */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Active Opportunities</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See archived</Text>
                    </TouchableOpacity>
                </View>

                {/* Tenders List */}
                <View style={styles.tendersList}>
                    {displayTenders.map((tender) => (
                        <TenderCard
                            key={tender.id}
                            tender={tender as any}
                            onPress={() => console.log('View tender', tender.id)}
                        />
                    ))}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.md,
        backgroundColor: Theme.colors.background,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Theme.colors.text,
    },
    iconButton: {
        padding: 8,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Theme.colors.error,
        zIndex: 1,
        borderWidth: 1,
        borderColor: Theme.colors.background,
    },
    scrollContent: {
        paddingBottom: Theme.spacing.xxl,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.white,
        marginHorizontal: Theme.spacing.lg,
        marginTop: Theme.spacing.sm,
        paddingHorizontal: Theme.spacing.md,
        height: 50,
        borderRadius: Theme.borderRadius.full,
        ...Theme.shadows.sm,
    },
    searchIcon: {
        marginRight: Theme.spacing.sm,
    },
    input: {
        flex: 1,
        height: '100%',
        color: Theme.colors.text,
        fontSize: 14,
    },
    filterButton: {
        padding: 8,
        borderLeftWidth: 1,
        borderLeftColor: Theme.colors.borderLight,
        marginLeft: 4,
    },
    categoriesContainer: {
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.md,
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: Theme.borderRadius.full,
        backgroundColor: Theme.colors.white,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    categoryChipActive: {
        backgroundColor: Theme.colors.primary,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: Theme.colors.textSecondary,
    },
    categoryTextActive: {
        color: Theme.colors.white,
        fontWeight: '600',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
        marginBottom: Theme.spacing.md,
        marginTop: Theme.spacing.sm,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Theme.colors.text,
    },
    seeAllText: {
        fontSize: 14,
        color: Theme.colors.primary,
        fontWeight: '500',
    },
    tendersList: {
        paddingHorizontal: Theme.spacing.lg,
    },
});
