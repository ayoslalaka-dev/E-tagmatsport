import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolate, Extrapolation, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Theme } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* 
  AnimatedHeader component that shrinks/fades based on scrollY.
  Customize the 'height' and 'backgroundColor' as needed.
*/

interface AnimatedHeaderProps {
    scrollY: SharedValue<number>;
    title?: string;
    children?: React.ReactNode;
}

const HEADER_HEIGHT = 100;
const COMPACT_HEADER_HEIGHT = 60;

export const AnimatedHeader = ({ scrollY, title, children }: AnimatedHeaderProps) => {
    const insets = useSafeAreaInsets();

    const headerStyle = useAnimatedStyle(() => {
        const height = interpolate(
            scrollY.value,
            [0, 100],
            [HEADER_HEIGHT + insets.top, COMPACT_HEADER_HEIGHT + insets.top],
            Extrapolation.CLAMP
        );

        const elevation = interpolate(
            scrollY.value,
            [0, 50],
            [0, 4],
            Extrapolation.CLAMP
        );

        return {
            height,
            shadowOpacity: elevation * 0.1, // approximates elevation
        };
    });

    const contentStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, 50],
            [1, 0],
            Extrapolation.CLAMP
        );

        // Translate title up as we scroll
        const translateY = interpolate(
            scrollY.value,
            [0, 100],
            [0, -20],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    return (
        <Animated.View style={[styles.header, headerStyle, { paddingTop: insets.top }]}>
            <View style={styles.contentContainer}>
                {/* Always visible or transitioning content */}
                <Animated.View style={[styles.dynamicContent, contentStyle]}>
                    {children}
                </Animated.View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.colors.background,
        zIndex: 100,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
        justifyContent: 'flex-end',
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    dynamicContent: {
        // Content that fades out or transforms
    }
});
