import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import { User, Truck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.4;

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Hero Image Section with Gradient */}
            <View style={styles.heroContainer}>
                <ImageBackground
                    source={require('../../assets/cargo-ship.jpg')}
                    style={styles.heroImage}
                    resizeMode="cover"
                >
                    {/* White gradient overlay at bottom */}
                    <LinearGradient
                        colors={['transparent', 'rgba(255,255,255,0.5)', '#FFFFFF']}
                        locations={[0, 0.6, 1]}
                        style={styles.gradient}
                    />
                </ImageBackground>
            </View>

            {/* Content Section */}
            <SafeAreaView style={styles.content}>
                {/* Logo Icon */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoIcon}>
                        <Truck size={32} color="#FFFFFF" />
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>E-Tagmat</Text>
                <Text style={styles.subtitle}>
                    Gestion intelligente des chaînes{'\n'}logistiques
                </Text>

                {/* Role Selection Buttons */}
                <View style={styles.buttonContainer}>
                    <Link href={{ pathname: '/(auth)/login', params: { role: 'SHIPPER' } }} asChild>
                        <TouchableOpacity style={styles.expediteurButton}>
                            <User size={20} color="#FFFFFF" />
                            <Text style={styles.expediteurButtonText}>Connexion Expéditeur</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href={{ pathname: '/(auth)/login', params: { role: 'CARRIER' } }} asChild>
                        <TouchableOpacity style={styles.prestataireButton}>
                            <Truck size={20} color="#FFFFFF" />
                            <Text style={styles.prestataireButtonText}>Connexion Prestataire</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OU</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Create Account */}
                <Link href="/(auth)/register" asChild>
                    <TouchableOpacity>
                        <Text style={styles.createAccountText}>Créer un compte</Text>
                    </TouchableOpacity>
                </Link>

                {/* Language Selector */}
                <View style={styles.languageSelector}>
                    <TouchableOpacity>
                        <Text style={[styles.languageText, styles.languageActive]}>FR</Text>
                    </TouchableOpacity>
                    <Text style={styles.languageDivider}>|</Text>
                    <TouchableOpacity>
                        <Text style={styles.languageText}>EN</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    heroContainer: {
        height: HERO_HEIGHT,
        width: '100%',
    },
    heroImage: {
        flex: 1,
        width: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '60%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#FFFFFF',
        marginTop: -50,
    },
    logoContainer: {
        marginBottom: 16,
    },
    logoIcon: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        gap: 12,
    },
    expediteurButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B82F6',
        paddingVertical: 16,
        borderRadius: 30,
        gap: 10,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    expediteurButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    prestataireButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F59E0B',
        paddingVertical: 16,
        borderRadius: 30,
        gap: 10,
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    prestataireButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    forgotPassword: {
        marginTop: 24,
    },
    forgotPasswordText: {
        color: '#6B7280',
        fontSize: 14,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        paddingHorizontal: 16,
        color: '#9CA3AF',
        fontSize: 12,
        fontWeight: '500',
    },
    createAccountText: {
        color: '#3B82F6',
        fontSize: 16,
        fontWeight: '600',
    },
    languageSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 24,
    },
    languageText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    languageActive: {
        color: '#3B82F6',
        fontWeight: '600',
    },
    languageDivider: {
        marginHorizontal: 12,
        color: '#D1D5DB',
    },
});
