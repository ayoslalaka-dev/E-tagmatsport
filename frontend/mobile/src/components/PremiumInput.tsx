import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../theme';

interface InputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    icon?: React.ReactNode;
    error?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric';
    style?: ViewStyle;
}

export const PremiumInput: React.FC<InputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    icon,
    error,
    keyboardType = 'default',
    style
}) => {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputWrapper, error && styles.inputError]}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Theme.colors.textMuted}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Theme.spacing.md,
    },
    label: {
        color: Theme.colors.textMuted,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: Theme.spacing.sm,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.md,
        borderWidth: 1,
        borderColor: Theme.colors.surfaceLight,
        height: 56,
        paddingHorizontal: Theme.spacing.md,
    },
    inputError: {
        borderColor: Theme.colors.error,
    },
    iconContainer: {
        marginRight: Theme.spacing.sm,
    },
    input: {
        flex: 1,
        color: Theme.colors.text,
        fontSize: 16,
    },
    errorText: {
        color: Theme.colors.error,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
});
