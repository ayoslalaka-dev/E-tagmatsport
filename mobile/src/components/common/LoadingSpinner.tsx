import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Theme } from '../../theme';

interface LoadingSpinnerProps {
    size?: 'small' | 'large';
    color?: string;
    text?: string;
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'large',
    color = Theme.colors.primary,
    text,
    fullScreen = false
}) => {
    const content = (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    );

    if (fullScreen) {
        return <View style={styles.fullScreen}>{content}</View>;
    }

    return content;
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: Theme.spacing.lg,
    },
    fullScreen: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: Theme.spacing.md,
        color: Theme.colors.textMuted,
        fontSize: 14,
    }
});
