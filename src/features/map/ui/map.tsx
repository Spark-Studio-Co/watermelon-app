import MapView, { Marker, Callout } from 'react-native-maps';
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { MapSwitch } from '@/src/shared/ui/map-switch/map-switch';
import Text from '@/src/shared/ui/text/text';


import { customMapStyle } from '../config/map-styles';

import { useVisibleStore } from '@/src/shared/model/use-visible-store';
import { useTypePointStore } from '../model/type-point-store';
import { useMarkerPositionStore } from '../model/marker-position-store';
import { useUserLocationStore } from '../model/user-location-store';

// icons
import CenterMeIcon from '@/src/shared/icons/center-me-icon';
import CrosshairIcon from '@/src/shared/icons/crosshair-icon';
import BurgerIcon from '@/src/shared/icons/burger-icon';
import StandardPointIcon from '@/src/shared/icons/standard-point-icon';
import ChatPointIcon from '@/src/shared/icons/chat-point-icon';

import { ModalWrapper } from '@/src/shared/ui/modal-wrapper/modal-wrapper';
import { PointTypeContent } from './point-type-bottom-sheet';
import { BetBottomContent } from './bet-bottom-sheet';

const { width, height } = Dimensions.get('window');

type MarkerData = {
    latitude: number;
    longitude: number;
    type: string;
    name?: string;
};

export const Map = () => {
    const { open } = useVisibleStore('point')
    const { type, setType } = useTypePointStore()
    const { markerPosition, setMarkerPosition } = useMarkerPositionStore()
    const { region, setRegion, centerOnUser, coordinate } = useUserLocationStore()
    const [savedMarkers, setSavedMarkers] = useState<MarkerData[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
    const [isCityView, setIsCityView] = useState(true);

    const getMarkerBorderColor = (pointType: string) => {
        switch (pointType) {
            case 'premium':
                return '#A009CD';
            case 'chat':
                return '#93E0FF';
            case 'standard':
                return '#FFFFFF';
            default:
                return '';
        }
    }


    const savePoint = () => {
        if (markerPosition && type) {
            const pointName = `${type.charAt(0).toUpperCase() + type.slice(1)} Point`;

            const newMarker = {
                ...markerPosition,
                type,
                name: pointName
            };

            setSavedMarkers([...savedMarkers, newMarker]);
            setMarkerPosition(null);
            setType('');
        }
    };

    useEffect(() => {
        if (coordinate) {
            setRegion({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                latitudeDelta: isCityView ? 0.01 : 0.2,
                longitudeDelta: isCityView ? 0.01 : 0.2,
            });
        }
    }, [isCityView, coordinate]);

    const renderedMarkerType = (markerType: string) => {
        switch (markerType) {
            case 'premium':
                return 'Premium';
            case 'chat':
                return 'Chat';
            case 'standard':
                return 'Standard';
            default:
                return '';
        }
    }


    return (
        <View style={{ width: width, height: height }}>
            <MapView
                onLongPress={() => {
                    if (!isCityView && coordinate) {
                        setType('');
                        setMarkerPosition(coordinate);
                        open();
                    }
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
                    <Marker
                        key={index}
                        coordinate={marker}
                        onPress={() => setSelectedMarker(marker)}
                    >
                        <View
                            className='bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full'
                            style={{ borderColor: getMarkerBorderColor(marker.type) }}
                        />
                        <Callout tooltip>
                            <View className='bg-[#272836] border-[2px] p-3 rounded-lg shadow-lg w-[200px]' style={{ borderColor: getMarkerBorderColor(marker.type) }}>
                                <View className="absolute bottom-[5px] left-1/2 -translate-x-1/2">
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: 0,
                                            height: 0,
                                            borderLeftWidth: 14,
                                            borderRightWidth: 14,
                                            borderTopWidth: 14,
                                            borderLeftColor: 'transparent',
                                            borderRightColor: 'transparent',
                                            borderTopColor: getMarkerBorderColor(marker.type)
                                        }}
                                    />
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 1.8,
                                            left: 4,
                                            width: 0,
                                            height: 0,
                                            borderLeftWidth: 10,
                                            borderRightWidth: 10,
                                            borderTopWidth: 10,
                                            borderLeftColor: 'transparent',
                                            borderRightColor: 'transparent',
                                            borderTopColor: '#272836',
                                        }}
                                    />
                                </View>
                                <View className='items-start w-full justify-between flex-row'>
                                    <View className='flex flex-col'>
                                        <View className='flex-row items-center mb-1'>
                                            <Text weight="medium" className='text-white text-[20px]'>Point Name</Text>
                                        </View>
                                        <Text weight="regular" className='text-[#817E7E] text-[12px]'>{renderedMarkerType(marker.type)}</Text>
                                    </View>
                                    {marker.type === 'standard' ? <StandardPointIcon /> : marker.type === 'chat' ? <ChatPointIcon /> : null}
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View className="absolute top-14 left-1/2 -translate-x-1/2">
                <MapSwitch switched={isCityView} onSwitch={setIsCityView} />
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
            <ModalWrapper isBottomSheet children={<PointTypeContent />} storeKey='point' />
            <ModalWrapper isBottomSheet children={<BetBottomContent onSavePoint={savePoint} />} storeKey='bet' />
        </View>
    )
}