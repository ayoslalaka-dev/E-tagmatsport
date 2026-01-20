import api from '../lib/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'tenders_cache';

export const getTenders = async () => {
    try {
        const response = await api.get('/tenders');
        // Save to cache for offline usage
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log('Network error, attempting to load from cache...');
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        throw error;
    }
};

export const createTender = async (tenderData: any) => {
    const response = await api.post('/tenders', tenderData);
    return response.data;
};
