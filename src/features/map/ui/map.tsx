import MapView, { Marker, Callout, Circle } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import { MapSwitch } from "@/src/shared/ui/map-switch/map-switch";
import Text from "@/src/shared/ui/text/text";
//@ts-ignore
import _ from "lodash";

import { customMapStyle } from "../config/map-styles";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useTypePointStore } from "../model/type-point-store";
import { useMarkerPositionStore } from "../model/marker-position-store";
import { useUserLocationStore } from "../model/user-location-store";
import { useNavigation } from "@react-navigation/native";
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useMarkersData } from "@/src/entities/markers/api/use-markers-data";
import { useChatStore } from "../../chat/model/chat-store";
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id";

// icons
import CenterMeIcon from "@/src/shared/icons/center-me-icon";
import BurgerIcon from "@/src/shared/icons/burger-icon";
import StandardPointIcon from "@/src/shared/icons/standard-point-icon";
import ChatPointIcon from "@/src/shared/icons/chat-point-icon";

import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper";
import { PointTypeContent } from "./point-type-bottom-sheet";
import { BetBottomContent } from "./bet-bottom-sheet";
import { CreateApplicationModal } from "./create-application-modal";

const { width, height } = Dimensions.get("window");

type MarkerData = {
  latitude: number;
  longitude: number;
  type: string;
  name?: string;
};

export const Map = () => {
  const mapRef = useRef<MapView>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [stateMarkerById, setStateMarkerById] = useState<string | null>(null);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);

  const navigation = useNavigation();
  const { data: me } = useGetMe();
  const { data: markerById } = useMarkerDataById(stateMarkerById);
  const { setName, setAvatar } = useChatStore();
  const { open: openPointType } = useVisibleStore("pointType");
  const { open: openCreateApplication } = useVisibleStore("createApplication");
  const { type } = useTypePointStore();
  const { markerPosition, setMarkerPosition } = useMarkerPositionStore();
  const { region, setRegion, centerOnUser, coordinate } =
    useUserLocationStore();
  const {
    ownerId,
    setLatitude,
    setLongitude,
    setIsPrivate: setMarkerIsPrivate,
    setOwnerId,
  } = useMarkerStore();
  const { data: availableMarkers, refetch: availableMarkersRefetch } =
    useMarkersData(true);
  const { data: allMarkers, refetch: allMarkersRefetch } =
    useMarkersData(false);

  const markersList = isPrivate ? availableMarkers : allMarkers;

  useEffect(() => {
    if (isLoadingChat && markerById?.chats?.[0]?.id && me?.id) {
      const chatId = markerById.chats[0].id;
      const participants = [me.id, markerById.ownerId];

      setName(markerById.name ?? "Chat");
      setAvatar(markerById.image);

      //@ts-ignore
      navigation.navigate("PrivateChat", {
        chatId,
        participants,
        chatType: "group",
      });

      setTimeout(() => {
        useChatStore.getState().connect(chatId, me.id);
        setIsLoadingChat(false);
      }, 100);
    }
  }, [markerById, isLoadingChat]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    // Haversine formula to calculate distance between two points on Earth
    const R = 6371000; // Earth radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  };

  const getMarkerBorderColor = (pointType: string) => {
    switch (pointType) {
      case "premium":
        return "#A009CD";
      case "chat":
        return "#93E0FF";
      case "standard":
        return "#FFFFFF";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (coordinate) {
      setRegion({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: isPrivate ? 0.01 : 0.2,
        longitudeDelta: isPrivate ? 0.01 : 0.2,
      });
    }
    availableMarkersRefetch();
  }, [isPrivate, coordinate]);

  const renderedMarkerType = (markerType: string) => {
    switch (markerType) {
      case "premium":
        return "Premium";
      case "chat":
        return "Chat";
      case "standard":
        return "Standard";
      default:
        return "";
    }
  };

  const throttledSetRegion = useRef(_.throttle(setRegion, 200)).current;

  useEffect(() => {
    if (markerById) {
      setName(markerById.name);
      setAvatar(markerById.image);
    }
  }, [markerById]);

  useEffect(() => {
    console.log("MARKERS available:", markersList);
  }, []);

  return (
    <View style={{ width: width, height: height }}>
      <MapView
        ref={mapRef}
        onLongPress={(e) => {
          const pressCoordinate = e.nativeEvent.coordinate;

          const isWithinRadius =
            Array.isArray(markersList) &&
            markersList.some((marker: any) => {
              if (!marker.radius) return false;

              const distance = calculateDistance(
                pressCoordinate.latitude,
                pressCoordinate.longitude,
                marker.latitude,
                marker.longitude
              );

              return distance < marker.radius.value;
            });

          if (isWithinRadius) {
            alert(
              "Cannot place a point within the radius of an existing point"
            );
            return;
          }

          setMarkerPosition(pressCoordinate);
          setLatitude(pressCoordinate.latitude);
          setLongitude(pressCoordinate.longitude);
          setMarkerIsPrivate(isPrivate);
          //@ts-ignore
          setOwnerId(me?.id); // Now we're sure me.id exists

          console.log(ownerId);

          if (!isPrivate) {
            openPointType();
          } else {
            //@ts-ignore
            navigation.navigate("PrivatePointCreation" as never, {
              coordinate: pressCoordinate,
            });
          }
        }}
        initialRegion={region}
        style={{ width: width, height: height }}
        region={region}
        onRegionChangeComplete={(r) => {
          throttledSetRegion(r);
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        customMapStyle={customMapStyle}
        mapType="standard"
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
      >
        {Array.isArray(markersList) &&
          markersList?.map((marker: any, index: number) =>
            marker.radius ? (
              <Circle
                key={`circle-${marker.id ?? index}`}
                center={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                radius={marker.radius.value}
                strokeColor="#FFFFFF"
                fillColor={
                  marker?.owner?.color?.color || "rgba(255,255,255,0.2)"
                }
                strokeWidth={2}
              />
            ) : null
          )}
        {markerPosition && type && (
          <Marker coordinate={markerPosition}>
            <View
              className="bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full"
              style={{ borderColor: getMarkerBorderColor(type) }}
            />
          </Marker>
        )}
        {Array.isArray(markersList) &&
          markersList?.map((marker: any, index: number) => (
            <Marker
              key={`marker-${marker.id ?? index}`}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => setSelectedMarker(marker)}
            >
              <View
                className="bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full"
                style={{
                  borderColor:
                    !marker.isWon && !isPrivate
                      ? "gray"
                      : getMarkerBorderColor(marker.type),
                }}
              />
              {!marker.isWon && !isPrivate ? null : (
                <Callout
                  tooltip
                  onPress={() => {
                    if (marker.type === "chat") {
                      const chatId = marker.chats?.[0]?.id;
                      if (!chatId || !me?.id) return;

                      setName(marker.name ?? `Point #${marker?.map_id}`);
                      setAvatar(marker.image ?? null);

                      useChatStore.getState().connect(chatId, me.id, true);

                      //@ts-ignore
                      navigation.navigate("PrivateChat", {
                        chatId,
                        participants: [me.id, marker.ownerId],
                        chatType: "group",
                      });
                    } else {
                      //@ts-ignore
                      navigation.navigate("PointBio" as never, {
                        id: marker?.id,
                        ownerId: marker?.ownerId,
                        isPrivate: marker?.isPrivate,
                      });
                    }
                  }}
                >
                  <View
                    className="bg-[#272836] border-[2px] p-3 rounded-lg shadow-lg min-w-[220px] min-h-24"
                    style={{ borderColor: getMarkerBorderColor(marker.type) }}
                  >
                    <View className="absolute bottom-[5px] left-1/2 -translate-x-1/2"></View>
                    <View className="items-start w-full justify-between flex-row">
                      <View className="flex flex-col">
                        <View className="flex-row items-center mb-1">
                          <Text
                            weight="medium"
                            className="text-white text-[20px] whitespace-pre-wrap"
                          >
                            {marker.name ?? "Point"} #{marker?.map_id}
                          </Text>
                        </View>
                        <Text
                          weight="regular"
                          className="text-[#817E7E] text-[12px]"
                        >
                          {renderedMarkerType(marker.type)}
                        </Text>
                      </View>
                      {marker.type === "standard" ? (
                        <StandardPointIcon />
                      ) : marker.type === "chat" ? (
                        <ChatPointIcon />
                      ) : null}
                    </View>
                  </View>
                </Callout>
              )}
            </Marker>
          ))}
      </MapView>
      <View className="absolute top-14 left-1/2 -translate-x-1/2">
        <MapSwitch switched={isPrivate} onSwitch={setIsPrivate} />
      </View>
      <View className="absolute left-4 top-14">
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
      </View>
      <ModalWrapper
        isBottomSheet
        children={
          <PointTypeContent
            isPrivateView={!isPrivate}
            longPressCoordinate={markerPosition}
          />
        }
        storeKey="pointType"
      />
      <ModalWrapper
        isBottomSheet
        children={<BetBottomContent />}
        storeKey="bet"
      />
      <ModalWrapper
        isBottomSheet
        children={<CreateApplicationModal />}
        storeKey="createApplication"
      />
    </View>
  );
};
