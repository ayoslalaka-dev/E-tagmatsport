import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Theme } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export const PremiumButton: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style
}) => {
    const isOutline = variant === 'outline';
    const isSecondary = variant === 'secondary';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isOutline && styles.outlineButton,
                isSecondary && styles.secondaryButton,
                (disabled || loading) && styles.disabled,
                Theme.shadows.primary,
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={isOutline ? Theme.colors.primary : Theme.colors.white} />
            ) : (
                <Text style={[
                    styles.text,
                    isOutline && styles.outlineText,
                    isSecondary && styles.secondaryText
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Theme.colors.primary,
        height: 56,
        borderRadius: Theme.borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
    },
    secondaryButton: {
        backgroundColor: Theme.colors.surfaceLight,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Theme.colors.primary,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        color: Theme.colors.white,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    outlineText: {
        color: Theme.colors.primary,
    },
    secondaryText: {
        color: Theme.colors.textMuted,
    }
});
