import React, { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Animated,
} from 'react-native';
import { Theme } from '../theme';
import { Ship, Truck, BarChart3, ChevronRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Smart Logistics',
        description: 'Connect with reliable carriers and manage your freight efficiently with our AI-powered platform.',
        icon: <Ship size={120} color={Theme.colors.primary} />,
        image: require('../../assets/cargo-ship.jpg'),
    },
    {
        id: '2',
        title: 'Real-time Tracking',
        description: 'Monitor your shipments in real-time and get instant updates on delivery status.',
        icon: <Truck size={120} color={Theme.colors.accent} />,
    },
    {
        id: '3',
        title: 'Market Insights',
        description: 'Access detailed market data and trends to optimize your logistics strategy.',
        icon: <BarChart3 size={120} color={Theme.colors.secondary} />,
    },
];

export default function OnboardingScreen({ navigation }: any) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            navigation.replace('Login');
        } catch (err) {
            console.log('Error @setItem: ', err);
            navigation.replace('Login');
        }
    };

    const scrollTo = () => {
        if (currentIndex < SLIDES.length - 1) {
            (slidesRef.current as any).scrollToIndex({ index: currentIndex + 1 });
        } else {
            completeOnboarding();
        }
    };

    const skip = () => {
        completeOnboarding();
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.slide}>
            <View style={styles.iconContainer}>
                {item.icon}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.skipBtn} onPress={skip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <View style={{ flex: 3 }}>
                <FlatList
                    data={SLIDES}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.paginator}>
                    {SLIDES.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [10, 20, 10],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                style={[styles.dot, { width: dotWidth, opacity }]}
                                key={i.toString()}
                            />
                        );
                    })}
                </View>

                <TouchableOpacity style={styles.nextBtn} onPress={scrollTo}>
                    <Text style={styles.nextBtnText}>
                        {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                    <ChevronRight size={20} color={Theme.colors.white} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipBtn: {
        position: 'absolute',
        top: 60,
        right: 30,
        zIndex: 10,
    },
    skipText: {
        color: Theme.colors.textMuted,
        fontSize: 16,
        fontWeight: '600',
    },
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    iconContainer: {
        flex: 0.7,
        justifyContent: 'center',
    },
    textContainer: {
        flex: 0.3,
    },
    title: {
        fontWeight: '800',
        fontSize: 32,
        marginBottom: 10,
        color: Theme.colors.primary,
        textAlign: 'center',
    },
    description: {
        fontWeight: '400',
        color: Theme.colors.textMuted,
        textAlign: 'center',
        paddingHorizontal: 20,
        fontSize: 16,
        lineHeight: 24,
    },
    footer: {
        height: 150,
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingBottom: 40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    paginator: {
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: Theme.colors.primary,
        marginHorizontal: 8,
    },
    nextBtn: {
        backgroundColor: Theme.colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        ...Theme.shadows.primary,
    },
    nextBtnText: {
        color: Theme.colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
});
