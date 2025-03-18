import MapView, { Region, MapStyleElement, Marker } from 'react-native-maps';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { MapSwitch } from '@/src/shared/ui/map-switch/map-switch';

import { APP_CONFIG } from '@/src/app/config';
import { customMapStyle } from '../config/map-styles';

import { useVisibleStore } from '@/src/shared/model/use-visible-store';
import { useTypePointStore } from '../model/type-point-store';

// icons
import CenterMeIcon from '@/src/shared/icons/center-me-icon';
import CrosshairIcon from '@/src/shared/icons/crosshair-icon';
import BurgerIcon from '@/src/shared/icons/burger-icon';
import { ModalWrapepr } from '@/src/shared/ui/modal-wrapper/modal-wrapper';
import { PointTypeContent } from './point-type-bottom-sheet';

const { width, height } = Dimensions.get('window');


export const Map = () => {
    const { open } = useVisibleStore('map')
    const { type } = useTypePointStore()

    const [region, setRegion] = useState<Region>(APP_CONFIG.MAP.INITIAL_REGION);
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [markerPosition, setMarkerPosition] = useState<{ latitude: number, longitude: number } | null>(null);

    const getMarkerBorderColor = () => {
        switch (type) {
            case 'premium':
                return '#A009CD';
            case 'chat':
                return '#93E0FF';
            case 'standard':
                return '#343434';
            default:
                return '#2E2E2E';
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            });
        })();
    }, []);

    const centerOnUser = () => {
        if (userLocation) {
            setRegion({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        }
    };

    const createPointAtUserLocation = () => {
        if (userLocation) {
            const userCoordinate = {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude
            };
            setMarkerPosition(userCoordinate);
            open();
        }
    };


    return (
        <View style={{ width: width, height: height }}>
            <MapView
                style={{ width: width, height: height }}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={!markerPosition}
                showsMyLocationButton={false}
                customMapStyle={customMapStyle}
                mapType="standard"
                showsPointsOfInterest={false}
                showsBuildings={false}
                showsTraffic={false}
                showsIndoors={false}
            >
                {markerPosition && (
                    <Marker coordinate={markerPosition}>
                        <View className='bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full' style={{ borderColor: getMarkerBorderColor() }} />
                    </Marker>
                )}
            </MapView>
            <View className="absolute top-14 left-1/2 -translate-x-1/2">
                <MapSwitch />
            </View>
            <View className='absolute left-4 top-14'>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-[#2C2C2C] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                >
                    <BurgerIcon />
                </TouchableOpacity>
            </View>
            <View className="absolute right-4 bottom-52">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    onPress={centerOnUser}
                >
                    <CenterMeIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-white mt-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    onPress={createPointAtUserLocation}
                >
                    <CrosshairIcon />
                </TouchableOpacity>
            </View>
            <ModalWrapepr isBottomSheet children={<PointTypeContent />} storeKey='map' />
        </View>
    )
}