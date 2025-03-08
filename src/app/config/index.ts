export const APP_CONFIG = {
    API_URL: 'YOUR_API_URL',
    STORAGE_KEYS: {
        AUTH_TOKEN: '@auth_token',
        USER_DATA: '@user_data',
    },
    MAP: {
        INITIAL_REGION: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    },
    LEVEL_SYSTEM: {
        BASE_XP: 100,
        LEVEL_MULTIPLIER: 1.5,
    },
} as const;