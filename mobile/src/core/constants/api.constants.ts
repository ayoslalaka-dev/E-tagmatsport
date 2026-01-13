import { Platform } from 'react-native';

// For development, use your local IP address
// For production, use your actual API URL
const DEV_API_URL = Platform.select({
    android: 'http://10.0.2.2:5000/api', // Android emulator
    ios: 'http://localhost:5000/api',
    default: 'http://localhost:5000/api'
});

// You can override this with your machine's IP for physical device testing
// Example: 'http://192.168.1.100:5000/api'
const PHYSICAL_DEVICE_API_URL = 'http://192.168.100.6:5000/api';

export const API_CONSTANTS = {
    // Use PHYSICAL_DEVICE_API_URL for testing on real device via Expo Go
    BASE_URL: __DEV__ ? PHYSICAL_DEVICE_API_URL : 'https://api.e-tagmat.com/api',

    // Endpoints
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            PROFILE: '/auth/profile',
            LOGOUT: '/auth/logout'
        },
        TENDERS: {
            BASE: '/tenders',
            MY_TENDERS: '/tenders/my',
            STATS: '/tenders/stats'
        },
        OFFERS: {
            BASE: '/offers',
            MY_OFFERS: '/offers/my',
            BY_TENDER: (tenderId: string) => `/offers/tender/${tenderId}`,
            ACCEPT: (offerId: string) => `/offers/${offerId}/accept`,
            REJECT: (offerId: string) => `/offers/${offerId}/reject`
        }
    },

    // Timeouts
    TIMEOUT: 10000,

    // Headers
    HEADERS: {
        JSON: { 'Content-Type': 'application/json' }
    }
};
