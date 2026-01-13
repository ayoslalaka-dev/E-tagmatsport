import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Mail, Lock, User, Briefcase, AlertCircle } from 'lucide-react-native';
import { Theme } from '../theme';
import { PremiumButton } from '../components/PremiumButton';
import { PremiumInput } from '../components/PremiumInput';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserRole = 'SHIPPER' | 'CARRIER';

export default function RegisterScreen({ navigation }: any) {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>('SHIPPER');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        // Validation
        if (!nom || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/register', {
                nom,
                email,
                password,
                role
            });

            if (response.data.token) {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                navigation.navigate('Main');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.content}
                >
                    <View style={styles.header}>
                        <Text style={styles.brand}>E-TAGMAT</Text>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join the logistics revolution</Text>
                    </View>

                    {error ? (
                        <View style={styles.errorContainer}>
                            <AlertCircle size={16} color={Theme.colors.error} />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}

                    <PremiumInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={nom}
                        onChangeText={setNom}
                        icon={<User size={20} color={Theme.colors.textMuted} />}
                    />

                    <PremiumInput
                        label="Email Address"
                        placeholder="john@logistics.com"
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

                    <PremiumInput
                        label="Confirm Password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        icon={<Lock size={20} color={Theme.colors.textMuted} />}
                    />

                    <Text style={styles.roleLabel}>I am a:</Text>
                    <View style={styles.roleContainer}>
                        <TouchableOpacity
                            style={[styles.roleButton, role === 'SHIPPER' && styles.roleButtonActive]}
                            onPress={() => setRole('SHIPPER')}
                        >
                            <Briefcase size={24} color={role === 'SHIPPER' ? Theme.colors.white : Theme.colors.textMuted} />
                            <Text style={[styles.roleText, role === 'SHIPPER' && styles.roleTextActive]}>Shipper</Text>
                            <Text style={[styles.roleDescription, role === 'SHIPPER' && styles.roleDescActive]}>
                                I need to ship goods
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.roleButton, role === 'CARRIER' && styles.roleButtonActive]}
                            onPress={() => setRole('CARRIER')}
                        >
                            <Briefcase size={24} color={role === 'CARRIER' ? Theme.colors.white : Theme.colors.textMuted} />
                            <Text style={[styles.roleText, role === 'CARRIER' && styles.roleTextActive]}>Carrier</Text>
                            <Text style={[styles.roleDescription, role === 'CARRIER' && styles.roleDescActive]}>
                                I transport goods
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <PremiumButton
                        title="Create Account"
                        onPress={handleRegister}
                        loading={isLoading}
                        style={styles.registerBtn}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: Theme.spacing.lg,
        paddingTop: Theme.spacing.xxl,
    },
    header: {
        marginBottom: Theme.spacing.xl,
    },
    brand: {
        fontSize: 32,
        fontWeight: '900',
        color: Theme.colors.primary,
        letterSpacing: -1,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Theme.colors.text,
        marginTop: Theme.spacing.md,
    },
    subtitle: {
        fontSize: 16,
        color: Theme.colors.textMuted,
        marginTop: 4,
    },
    roleLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
        marginTop: Theme.spacing.md,
    },
    roleContainer: {
        flexDirection: 'row',
        gap: Theme.spacing.md,
        marginBottom: Theme.spacing.lg,
    },
    roleButton: {
        flex: 1,
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.md,
        padding: Theme.spacing.md,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    roleButtonActive: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    roleText: {
        fontSize: 16,
        fontWeight: '700',
        color: Theme.colors.textMuted,
        marginTop: Theme.spacing.sm,
    },
    roleTextActive: {
        color: Theme.colors.white,
    },
    roleDescription: {
        fontSize: 12,
        color: Theme.colors.textMuted,
        textAlign: 'center',
        marginTop: 4,
    },
    roleDescActive: {
        color: Theme.colors.white,
        opacity: 0.8,
    },
    registerBtn: {
        marginTop: Theme.spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Theme.spacing.xl,
        paddingBottom: Theme.spacing.xl,
    },
    footerText: {
        color: Theme.colors.textMuted,
        fontSize: 14,
    },
    loginText: {
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
