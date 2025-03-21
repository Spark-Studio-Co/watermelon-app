import MapView, { Marker } from 'react-native-maps';
import { useState } from "react";
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { MapSwitch } from '@/src/shared/ui/map-switch/map-switch';

import { customMapStyle } from '../config/map-styles';

import { useVisibleStore } from '@/src/shared/model/use-visible-store';
import { useTypePointStore } from '../model/type-point-store';
import { useMarkerPositionStore } from '../model/marker-position-store';
import { useUserLocationStore } from '../model/user-location-store';

// icons
import CenterMeIcon from '@/src/shared/icons/center-me-icon';
import CrosshairIcon from '@/src/shared/icons/crosshair-icon';
import BurgerIcon from '@/src/shared/icons/burger-icon';

import { ModalWrapepr } from '@/src/shared/ui/modal-wrapper/modal-wrapper';
import { PointTypeContent } from './point-type-bottom-sheet';
import { BetBottomContent } from './bet-bottom-sheet';

const { width, height } = Dimensions.get('window');

type MarkerData = {
    latitude: number;
    longitude: number;
    type: string;
};

export const Map = () => {
    const { open } = useVisibleStore('point')
    const { type, setType } = useTypePointStore()
    const { markerPosition, setMarkerPosition } = useMarkerPositionStore()
    const { region, setRegion, centerOnUser, coordinate } = useUserLocationStore()
    const [savedMarkers, setSavedMarkers] = useState<MarkerData[]>([]);

    const getMarkerBorderColor = (pointType: string) => {
        switch (pointType) {
            case 'premium':
                return '#A009CD';
            case 'chat':
                return '#93E0FF';
            case 'standard':
                return '#343434';
            default:
                return '';
        }
    }


    const savePoint = () => {
        if (markerPosition && type) {
            setSavedMarkers([...savedMarkers, {
                ...markerPosition,
                type
            }]);
            setMarkerPosition(null);
        }
    };


    return (
        <View style={{ width: width, height: height }}>
            <MapView
                onLongPress={() => {
                    setType('');
                    setMarkerPosition(coordinate);
                    open();
                }}
                style={{ width: width, height: height }}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={(!markerPosition || !type) && savedMarkers.length === 0}
                showsMyLocationButton={false}
                customMapStyle={customMapStyle}
                mapType="standard"
                showsPointsOfInterest={false}
                showsBuildings={false}
                showsTraffic={false}
                showsIndoors={false}
            >
                {markerPosition && type && (
                    <Marker coordinate={markerPosition}>
                        <View
                            className='bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full'
                            style={{ borderColor: getMarkerBorderColor(type) }}
                        />
                    </Marker>
                )}
                {savedMarkers.map((marker, index) => (
                    <Marker key={index} coordinate={marker}>
                        <View
                            className='bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full'
                            style={{ borderColor: getMarkerBorderColor(marker.type) }}
                        />
                    </Marker>
                ))}
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
                    onPress={() => centerOnUser()}
                >
                    <CenterMeIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-white mt-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                >
                    <CrosshairIcon />
                </TouchableOpacity>
            </View>
            <ModalWrapepr isBottomSheet children={<PointTypeContent />} storeKey='point' />
            <ModalWrapepr isBottomSheet children={<BetBottomContent onSavePoint={savePoint} />} storeKey='bet' />
        </View>
    )
}