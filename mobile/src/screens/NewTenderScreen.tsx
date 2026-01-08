import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Switch,
    ImageBackground,
    StatusBar
} from 'react-native';
import { Package, MapPin, Calendar, Info, Send, Scale, Box } from 'lucide-react-native';
import { Theme } from '../theme';
import { PremiumInput } from '../components/PremiumInput';
import { PremiumButton } from '../components/PremiumButton';

export default function NewTenderScreen() {
    const [title, setTitle] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [weight, setWeight] = useState('');
    const [volume, setVolume] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Tender published successfully!');
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={require('../../assets/containers.jpg')}
                    style={styles.header}
                    resizeMode="cover"
                >
                    <View style={styles.overlay} />
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>New Transport Request</Text>
                        <Text style={styles.headerSubtitle}>Reach the best carriers in Morocco</Text>
                    </View>
                </ImageBackground>

                <View style={styles.formContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Info</Text>
                        <PremiumInput
                            label="Tender Title"
                            placeholder="e.g. Export of Electronics to Lyon"
                            value={title}
                            onChangeText={setTitle}
                            icon={<Box size={18} color={Theme.colors.textMuted} />}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Route</Text>
                        <View style={styles.row}>
                            <View style={{ flex: 1 }}>
                                <PremiumInput
                                    label="Origin"
                                    placeholder="Casablanca"
                                    value={origin}
                                    onChangeText={setOrigin}
                                    icon={<MapPin size={18} color={Theme.colors.textMuted} />}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <PremiumInput
                                    label="Destination"
                                    placeholder="Marseille"
                                    value={destination}
                                    onChangeText={setDestination}
                                    icon={<MapPin size={18} color={Theme.colors.error} />}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cargo Details</Text>
                        <View style={styles.row}>
                            <View style={{ flex: 1 }}>
                                <PremiumInput
                                    label="Weight (KG)"
                                    placeholder="4500"
                                    value={weight}
                                    onChangeText={setWeight}
                                    keyboardType="numeric"
                                    icon={<Scale size={18} color={Theme.colors.textMuted} />}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <PremiumInput
                                    label="Volume (CBM)"
                                    placeholder="12.5"
                                    value={volume}
                                    onChangeText={setVolume}
                                    keyboardType="numeric"
                                    icon={<Package size={18} color={Theme.colors.textMuted} />}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.section, styles.settingsSection]}>
                        <View style={styles.switchContainer}>
                            <View>
                                <Text style={styles.switchLabel}>Urgent Shipment</Text>
                                <Text style={styles.switchSublabel}>Mark as high priority for carriers</Text>
                            </View>
                            <Switch
                                value={isUrgent}
                                onValueChange={setIsUrgent}
                                trackColor={{ false: Theme.colors.surfaceLight, true: Theme.colors.primary }}
                                thumbColor={Theme.colors.white}
                            />
                        </View>
                    </View>

                    <PremiumButton
                        title="Publish Tender"
                        onPress={handleSubmit}
                        loading={isLoading}
                        style={styles.submitBtn}
                    />
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
    scroll: {
        flexGrow: 1,
    },
    header: {
        height: 180,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(10, 10, 12, 0.6)',
    },
    headerContent: {
        padding: Theme.spacing.lg,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: Theme.colors.text,
    },
    headerSubtitle: {
        fontSize: 14,
        color: Theme.colors.primary,
        fontWeight: '600',
        marginTop: 4,
    },
    formContainer: {
        padding: Theme.spacing.lg,
    },
    section: {
        marginBottom: Theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: Theme.colors.primary,
        marginBottom: Theme.spacing.md,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    row: {
        flexDirection: 'row',
        gap: Theme.spacing.md,
    },
    settingsSection: {
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.lg,
        padding: Theme.spacing.md,
        borderWidth: 1,
        borderColor: Theme.colors.surfaceLight,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchLabel: {
        color: Theme.colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    switchSublabel: {
        color: Theme.colors.textMuted,
        fontSize: 12,
        marginTop: 2,
    },
    submitBtn: {
        marginTop: Theme.spacing.xl,
        marginBottom: Theme.spacing.xxl,
    },
});

