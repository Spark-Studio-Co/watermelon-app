import { create } from "zustand";
import * as Location from 'expo-location';
import { Region } from "react-native-maps";
import { APP_CONFIG } from '@/src/app/config';

interface IUserLocationStore {
    loadUserLocation: () => Promise<void>
    userLocation: Location.LocationObject | null
    region: Region
    setRegion: (region: Region) => void
    centerOnUser: () => void
    coordinate: { latitude: number, longitude: number } | null;
}

export const useUserLocationStore = create<IUserLocationStore>(
    (set) => ({
        coordinate: null,
        userLocation: null,
        region: APP_CONFIG.MAP.INITIAL_REGION,
        setRegion: (region: Region) => set({ region: region }),
        loadUserLocation: async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});

                set({
                    userLocation: location,
                    coordinate: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    },
                    region: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }
                });

            } catch (error) {
                console.error('Error getting location:', error);
            }
        },
        centerOnUser: () => set((state) => {
            if (state.userLocation) {
                set({
                    region: {
                        latitude: state.userLocation.coords.latitude,
                        longitude: state.userLocation.coords.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }
                });
            }
            return {}
        }),
    })
);
