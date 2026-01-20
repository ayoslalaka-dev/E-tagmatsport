import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    TextInput,
    SafeAreaView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Mail, Lock, User, Briefcase, AlertCircle, ArrowLeft, Truck } from 'lucide-react-native';
import { useRegisterMutation } from '../../src/services/features/auth';

type UserRole = 'SHIPPER' | 'CARRIER';

export default function RegisterScreen() {
    const router = useRouter();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>('SHIPPER');
    const [validationError, setValidationError] = useState('');

    const registerMutation = useRegisterMutation();

    const handleRegister = async () => {
        setValidationError('');

        if (!nom || !email || !password || !confirmPassword) {
            setValidationError('Veuillez remplir tous les champs');
            return;
        }

        if (password !== confirmPassword) {
            setValidationError('Les mots de passe ne correspondent pas');
            return;
        }

        if (password.length < 6) {
            setValidationError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        registerMutation.mutate({ nom, email, password, role });
    };

    const error = validationError ||
        registerMutation.error?.message ||
        (registerMutation.error as any)?.response?.data?.message;

    const roleColor = role === 'SHIPPER' ? '#3B82F6' : '#F59E0B';

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.content}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <ArrowLeft size={24} color="#1F2937" />
                        </TouchableOpacity>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Créer un compte</Text>
                    <Text style={styles.subtitle}>
                        Rejoignez E-Tagmat et gérez vos{'\n'}opérations logistiques
                    </Text>

                    {/* Error Message */}
                    {error ? (
                        <View style={styles.errorContainer}>
                            <AlertCircle size={16} color="#EF4444" />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nom complet</Text>
                            <View style={styles.inputContainer}>
                                <User size={20} color="#9CA3AF" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="John Doe"
                                    value={nom}
                                    onChangeText={setNom}
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Adresse email</Text>
                            <View style={styles.inputContainer}>
                                <Mail size={20} color="#9CA3AF" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="exemple@email.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mot de passe</Text>
                            <View style={styles.inputContainer}>
                                <Lock size={20} color="#9CA3AF" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirmer le mot de passe</Text>
                            <View style={styles.inputContainer}>
                                <Lock size={20} color="#9CA3AF" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        {/* Role Selection */}
                        <Text style={styles.roleLabel}>Je suis un :</Text>
                        <View style={styles.roleContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.roleButton,
                                    role === 'SHIPPER' && styles.roleButtonActiveBlue
                                ]}
                                onPress={() => setRole('SHIPPER')}
                            >
                                <Briefcase
                                    size={24}
                                    color={role === 'SHIPPER' ? '#FFFFFF' : '#9CA3AF'}
                                />
                                <Text style={[
                                    styles.roleText,
                                    role === 'SHIPPER' && styles.roleTextActive
                                ]}>
                                    Expéditeur
                                </Text>
                                <Text style={[
                                    styles.roleDescription,
                                    role === 'SHIPPER' && styles.roleDescActive
                                ]}>
                                    J'envoie des marchandises
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.roleButton,
                                    role === 'CARRIER' && styles.roleButtonActiveOrange
                                ]}
                                onPress={() => setRole('CARRIER')}
                            >
                                <Truck
                                    size={24}
                                    color={role === 'CARRIER' ? '#FFFFFF' : '#9CA3AF'}
                                />
                                <Text style={[
                                    styles.roleText,
                                    role === 'CARRIER' && styles.roleTextActive
                                ]}>
                                    Prestataire
                                </Text>
                                <Text style={[
                                    styles.roleDescription,
                                    role === 'CARRIER' && styles.roleDescActive
                                ]}>
                                    Je transporte des marchandises
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.registerButton, { backgroundColor: roleColor }]}
                            onPress={handleRegister}
                            disabled={registerMutation.isPending}
                        >
                            <Text style={styles.registerButtonText}>
                                {registerMutation.isPending ? 'Création...' : 'Créer mon compte'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Déjà inscrit ? </Text>
                        <Link href="/(auth)/welcome" asChild>
                            <TouchableOpacity>
                                <Text style={[styles.loginText, { color: roleColor }]}>
                                    Se connecter
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    header: {
        paddingTop: 16,
        paddingBottom: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1F2937',
        marginTop: 24,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        lineHeight: 24,
        marginBottom: 24,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        gap: 8,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    },
    form: {
        gap: 16,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
    },
    roleLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginTop: 8,
    },
    roleContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    roleButton: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    roleButtonActiveBlue: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    roleButtonActiveOrange: {
        backgroundColor: '#F59E0B',
        borderColor: '#F59E0B',
    },
    roleText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6B7280',
        marginTop: 8,
    },
    roleTextActive: {
        color: '#FFFFFF',
    },
    roleDescription: {
        fontSize: 11,
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: 4,
    },
    roleDescActive: {
        color: '#FFFFFF',
        opacity: 0.9,
    },
    registerButton: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        color: '#6B7280',
        fontSize: 14,
    },
    loginText: {
        fontWeight: '600',
        fontSize: 14,
    },
});
