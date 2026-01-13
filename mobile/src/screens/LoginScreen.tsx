import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { Mail, Lock, AlertCircle } from 'lucide-react-native';
import { Theme } from '../theme';
import { PremiumButton } from '../components/PremiumButton';
import { PremiumInput } from '../components/PremiumInput';
import { login } from '../services/auth.service';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            await login(email, password);
            navigation.navigate('Main');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={require('../../assets/cargo-ship.jpg')}
                style={styles.hero}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
                <View style={styles.heroContent}>
                    <Text style={styles.brand}>E-TAGMAT</Text>
                    <Text style={styles.tagline}>Smart Subcontracting & Logistics</Text>
                </View>
            </ImageBackground>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.formContainer}>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>Welcome back</Text>
                        <Text style={styles.subtitle}>Sign in to manage your freight</Text>
                    </View>

                    {error ? (
                        <View style={styles.errorContainer}>
                            <AlertCircle size={16} color={Theme.colors.error} />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}

                    <PremiumInput
                        label="Email Address"
                        placeholder="james@logistics.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        icon={<Mail size={20} color={Theme.colors.textMuted} />}
                    />

                    <PremiumInput
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon={<Lock size={20} color={Theme.colors.textMuted} />}
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>

                    <PremiumButton
                        title="Sign In"
                        onPress={handleLogin}
                        loading={isLoading}
                        style={styles.loginBtn}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>New to E-Tagmat? </Text>
                        <TouchableOpacity>
                            <Text style={styles.registerText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    hero: {
        height: '40%',
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(10, 10, 12, 0.7)',
    },
    heroContent: {
        padding: Theme.spacing.lg,
        paddingBottom: Theme.spacing.xl,
    },
    brand: {
        fontSize: 48,
        fontWeight: '900',
        color: Theme.colors.primary,
        letterSpacing: -2,
    },
    tagline: {
        fontSize: 14,
        color: Theme.colors.text,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginTop: -5,
    },
    content: {
        flex: 1,
        marginTop: -30,
        backgroundColor: Theme.colors.background,
        borderTopLeftRadius: Theme.borderRadius.xl,
        borderTopRightRadius: Theme.borderRadius.xl,
        padding: Theme.spacing.lg,
    },
    formContainer: {
        flex: 1,
        paddingTop: Theme.spacing.md,
    },
    headerText: {
        marginBottom: Theme.spacing.lg,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Theme.colors.text,
    },
    subtitle: {
        fontSize: 16,
        color: Theme.colors.textMuted,
        marginTop: 4,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: Theme.spacing.lg,
    },
    forgotText: {
        color: Theme.colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    loginBtn: {
        marginTop: Theme.spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Theme.spacing.xl,
    },
    footerText: {
        color: Theme.colors.textMuted,
        fontSize: 14,
    },
    registerText: {
        color: Theme.colors.primary,
        fontWeight: '700',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.error + '10',
        padding: Theme.spacing.md,
        borderRadius: Theme.borderRadius.md,
        marginBottom: Theme.spacing.lg,
        gap: 8,
        borderWidth: 1,
        borderColor: Theme.colors.error + '30',
    },
    errorText: {
        color: Theme.colors.error,
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
});

