// Unified Design System for E-Tagmat
// Clean, modern look with white backgrounds and blue/orange accents

export const Theme = {
    colors: {
        // Backgrounds
        background: '#F3F4F6',     // Lighter grey background for the app (common in dashboards)
        surface: '#FFFFFF',        // White surface for cards
        surfaceLight: '#F9FAFB',

        // Primary colors
        primary: '#2563EB',        // Slightly deeper blue for better contrast
        secondary: '#F59E0B',      // Orange - Prestataire
        accent: '#8B5CF6',         // Purple - Special actions

        // Status colors
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',

        // Text colors
        text: '#1F2937',
        textSecondary: '#374151',
        textMuted: '#6B7280',
        textLight: '#9CA3AF',

        // Border colors
        border: '#E5E7EB',
        borderLight: '#F3F4F6',

        // Other
        white: '#FFFFFF',
        black: '#000000',
        overlay: 'rgba(0, 0, 0, 0.5)',
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
        pill: 30,
    },

    fontSize: {
        xs: 11,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        '2xl': 24,
        '3xl': 28,
        '4xl': 32,
    },

    fontWeight: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },

    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
        },
        primary: {
            shadowColor: '#3B82F6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
        },
        secondary: {
            shadowColor: '#F59E0B',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
        },
        card: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
        },
    },
};

// Helper to get role-based color
export const getRoleColor = (role: 'SHIPPER' | 'CARRIER' | string) => {
    return role === 'SHIPPER' ? Theme.colors.primary : Theme.colors.secondary;
};

// Helper to get role-based shadow
export const getRoleShadow = (role: 'SHIPPER' | 'CARRIER' | string) => {
    return role === 'SHIPPER' ? Theme.shadows.primary : Theme.shadows.secondary;
};
