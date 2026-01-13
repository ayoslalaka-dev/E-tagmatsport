import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../theme';
import { PremiumButton } from '../PremiumButton';
import { Package, AlertCircle, Search } from 'lucide-react-native';

interface EmptyStateProps {
    title: string;
    message: string;
    icon?: 'package' | 'alert' | 'search';
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    icon = 'package',
    actionLabel,
    onAction
}) => {
    const IconComponent = {
        package: Package,
        alert: AlertCircle,
        search: Search
    }[icon];

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <IconComponent size={64} color={Theme.colors.textMuted} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {actionLabel && onAction && (
                <PremiumButton
                    title={actionLabel}
                    onPress={onAction}
                    variant="outline"
                    style={styles.button}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Theme.spacing.xl,
    },
    iconContainer: {
        marginBottom: Theme.spacing.lg,
        opacity: 0.5,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        color: Theme.colors.textMuted,
        textAlign: 'center',
        marginBottom: Theme.spacing.lg,
    },
    button: {
        marginTop: Theme.spacing.md,
    }
});
