import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin, Calendar, Truck, ShieldCheck, User } from 'lucide-react-native';
import { Theme } from '../theme';
import { Tender } from '../services/features/tender/tenderApi';

interface TenderCardProps {
    tender: Tender;
    onPress: () => void;
}

export const TenderCard = ({ tender, onPress }: TenderCardProps) => {
    // Format price if available
    const formattedPrice = tender.budget
        ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(tender.budget)
        : 'Sur devis';

    // Mock images based on tender type for visual appeal (since we don't have real images in the API type yet)
    // In a real app, this would come from the backend or be generic assets
    const getImageSource = () => {
        switch (tender.type) {
            case 'AGROALIMENTAIRE': // Assuming this fits into the types loosely or we add it
            case 'STANDARD':
                return require('../../assets/cargo-ship.jpg'); // Fallback/Reuse existing asset for now
            // Add more cases or default assets
            default:
                return require('../../assets/cargo-ship.jpg');
        }
    };

    return (
        <View style={styles.card}>
            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image source={getImageSource()} style={styles.image} resizeMode="cover" />
                <View style={styles.badge}>
                    <ShieldCheck size={12} color={Theme.colors.white} />
                    <Text style={styles.badgeText}>{tender.statut}</Text>
                </View>
            </View>

            {/* Content Section */}
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={1}>
                        {tender.description || `Transport ${tender.type}`}
                    </Text>
                    <Text style={styles.price}>{formattedPrice}</Text>
                </View>

                {/* Route */}
                <View style={styles.routeContainer}>
                    <View style={styles.locationItem}>
                        <MapPin size={16} color={Theme.colors.primary} />
                        <View>
                            <Text style={styles.city}>{tender.origine.split(',')[0].trim()}</Text>
                            <Text style={styles.locationDetail} numberOfLines={1}>{tender.origine}</Text>
                        </View>
                    </View>

                    <View style={styles.routeLine} />

                    <View style={styles.locationItem}>
                        <View style={styles.destinationIcon}>
                            <MapPin size={16} color={Theme.colors.secondary} />
                        </View>
                        <View>
                            <Text style={styles.city}>{tender.destination.split(',')[0].trim()}</Text>
                            <Text style={styles.locationDetail} numberOfLines={1}>{tender.destination}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer Info */}
                <View style={styles.footer}>
                    <View style={styles.infoBadge}>
                        <Calendar size={14} color={Theme.colors.textMuted} />
                        <Text style={styles.infoText}>{new Date(tender.date).toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.infoBadge}>
                        <Truck size={14} color={Theme.colors.textMuted} />
                        <Text style={styles.infoText}>{tender.type}</Text>
                    </View>
                </View>

                {/* Action */}
                <View style={styles.actionRow}>
                    <View style={styles.offersReceived}>
                        <View style={styles.offerAvatar}>
                            <Text style={styles.avatarText}>2</Text>
                        </View>
                        <Text style={styles.offersText}>Offers received</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Theme.colors.white,
        borderRadius: Theme.borderRadius.xl,
        overflow: 'hidden',
        marginBottom: Theme.spacing.lg,
        ...Theme.shadows.md,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
    },
    imageContainer: {
        height: 140,
        backgroundColor: Theme.colors.surfaceLight,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: Theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: Theme.borderRadius.full,
        gap: 4,
    },
    badgeText: {
        color: Theme.colors.white,
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    content: {
        padding: Theme.spacing.md,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.text,
        flex: 1,
        marginRight: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    routeContainer: {
        marginBottom: Theme.spacing.md,
    },
    locationItem: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        marginVertical: 4,
    },
    destinationIcon: {
        // paddingLeft: 1, // Visual alignment
    },
    city: {
        fontSize: 14,
        fontWeight: '600',
        color: Theme.colors.text,
    },
    locationDetail: {
        fontSize: 12,
        color: Theme.colors.textLight,
        maxWidth: 200,
    },
    routeLine: {
        position: 'absolute',
        left: 7, // Align with pin center
        top: 24,
        bottom: 24,
        width: 2,
        backgroundColor: Theme.colors.border,
        zIndex: -1,
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: Theme.spacing.md,
    },
    infoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: Theme.colors.surfaceLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: Theme.borderRadius.sm,
    },
    infoText: {
        fontSize: 12,
        color: Theme.colors.textMuted,
        fontWeight: '500',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    offersReceived: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    offerAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E0F2FE', // Light blue
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    offersText: {
        fontSize: 12,
        color: Theme.colors.textMuted,
    },
    button: {
        backgroundColor: Theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: Theme.borderRadius.pill,
        ...Theme.shadows.primary,
    },
    buttonText: {
        color: Theme.colors.white,
        fontWeight: '600',
        fontSize: 14,
    },
});
