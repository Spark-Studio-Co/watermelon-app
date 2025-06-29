import MapView, { Marker, Callout, Circle } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useMarkersData } from "@/src/entities/markers/api/use-markers-data";
import { useChatStore } from "../../chat/model/chat-store";
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id";
import { useAddMarkerToFavorites } from "@/src/features/chat/api/use-add-marker-to-favorites";
import { useCheckMarkerAccess } from "@/src/entities/markers/api/use-check-marker-access";

// icons
import CenterMeIcon from "@/src/shared/icons/center-me-icon";
import BurgerIcon from "@/src/shared/icons/burger-icon";
import StandardPointIcon from "@/src/shared/icons/standard-point-icon";
import ChatPointIcon from "@/src/shared/icons/chat-point-icon";

import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper";
import { PointTypeContent } from "./point-type-bottom-sheet";
import { BetBottomContent } from "./bet-bottom-sheet";
import { PreviewConfirmationSheet } from "./preview-confirmation-sheet";
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
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const [previewCoordinate, setPreviewCoordinate] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(300); // Estimated height of bottom sheet
  const [isInLowerPart, setIsInLowerPart] = useState(false); // Track if marker is in lower part of screen

  const navigation = useNavigation();
  const { data: me } = useGetMe();
  const addToFavorites = useAddMarkerToFavorites();
  const { data: markerById } = useMarkerDataById(stateMarkerById);
  const { refetch: checkAccess } = useCheckMarkerAccess(stateMarkerById);
  const { setName, setAvatar, setCurrentChatMarkerId, currentChatMarkerId } =
    useChatStore();
  const { open: openPointType } = useVisibleStore("pointType");
  const { open: openCreateApplication } = useVisibleStore("createApplication");
  const {
    open: openPreviewConfirmation,
    isVisible: isPreviewConfirmationVisible,
  } = useVisibleStore("previewConfirmation");
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
  const { data: allMarkers } = useMarkersData(false);

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

  // Clear preview marker when modal is closed or when navigating away
  useEffect(() => {
    if (!isPreviewConfirmationVisible) {
      setPreviewCoordinate(null);
    }
  }, [isPreviewConfirmationVisible]);

  // Clear preview marker when screen loses focus (e.g., after navigation)
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        availableMarkersRefetch();
        setPreviewCoordinate(null);
      };
    }, [])
  );

  // Adjust map view when preview coordinate is set
  useEffect(() => {
    if (previewCoordinate && mapRef.current) {
      // Only shift the map if the marker is in the lower part of the screen
      if (isInLowerPart) {
        // Calculate a new region that shifts the map down to show the marker above the bottom sheet

        // Use a smaller negative adjustment factor to shift the map downward
        // This will move the map down, making the marker appear higher on the screen
        const latitudeAdjustment =
          (bottomSheetHeight / height) * region.latitudeDelta * -0.8;

        // Create a new region with the marker visible above the bottom sheet
        const newRegion = {
          ...region,
          latitude: previewCoordinate.latitude + latitudeAdjustment, // Shift map down moderately
        };

        // Animate to the new region
        mapRef.current.animateToRegion(newRegion, 300);
      }
    }
  }, [previewCoordinate, isInLowerPart]);

  const isPremium = me?.isPremium;

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

  // Refetch markers when screen comes into focus (e.g., after creating a private point)
  useFocusEffect(
    React.useCallback(() => {
      console.log("Map screen focused - refetching markers");
      if (isPrivate) {
        availableMarkersRefetch();
      }

      // Clear any lingering preview markers when returning to map
      setPreviewCoordinate(null);

      return () => {};
    }, [isPrivate, availableMarkersRefetch])
  );

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

          // Check if the coordinate is in the lower part of the screen
          const pointY = e.nativeEvent.position.y;
          const inLowerPart = pointY > height * 0.65; // If in lower 35% of screen

          // Set state to track if marker is in lower part of screen
          setIsInLowerPart(inLowerPart);

          if (inLowerPart) {
            // Adjust bottom sheet height estimation based on screen position
            // Use a more moderate height estimation
            setBottomSheetHeight(Math.min(350, height - pointY + 100));
          } else {
            setBottomSheetHeight(300); // Default height
          }

          // Set preview coordinate for the marker
          setPreviewCoordinate(pressCoordinate);

          // Store coordinates in marker store
          setLatitude(pressCoordinate.latitude);
          setLongitude(pressCoordinate.longitude);
          setMarkerIsPrivate(isPrivate);
          //@ts-ignore
          setOwnerId(me?.id);

          // Open preview confirmation modal
          openPreviewConfirmation();
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
        {/* Preview marker */}
        {previewCoordinate && (
          <Marker coordinate={previewCoordinate}>
            <View
              className="bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full"
              style={{
                borderColor: isPrivate ? "#FFFFFF" : getMarkerBorderColor(type),
              }}
            />
          </Marker>
        )}

        {/* Regular marker during creation */}
        {markerPosition && (type || isPrivate) && (
          <Marker coordinate={markerPosition}>
            <View
              className="bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full"
              style={{
                borderColor: isPrivate ? "#FFFFFF" : getMarkerBorderColor(type),
              }}
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
                  onPress={async () => {
                    // Set marker ID first for access check
                    setStateMarkerById(marker.id);

                    // Check if the marker is owned by the current user
                    const isOwner = marker.ownerId === me?.id;

                    // If it's a private marker and not owned by the user, check access
                    if (marker.isPrivate && !isOwner) {
                      setIsCheckingAccess(true);
                      try {
                        // Check if user has access to this marker
                        const result = await checkAccess();
                        const hasAccess = result.data?.hasContentAccess;

                        console.log("hasAccess", hasAccess);

                        // If no access, open application modal
                        if (!hasAccess) {
                          openCreateApplication();
                          setIsCheckingAccess(false);
                          return;
                        }
                      } catch (error) {
                        console.error("Error checking marker access:", error);
                        // If error occurs, default to opening application
                        openCreateApplication();
                        setIsCheckingAccess(false);
                        return;
                      }
                      setIsCheckingAccess(false);
                    }

                    // Handle chat type markers
                    if (marker.type === "chat") {
                      const chatId = marker.chats?.[0]?.id;
                      if (!chatId || !me?.id) return;

                      setName(marker.name ?? `Point #${marker?.map_id}`);
                      setAvatar(marker.image ?? null);
                      setCurrentChatMarkerId(marker.id);

                      console.log(
                        "setCurrentChatMarkerId",
                        currentChatMarkerId
                      );

                      useChatStore
                        .getState()
                        .connect(chatId, me.id, true, marker.id);

                      if (marker.ownerId !== me.id && marker.id) {
                        console.log("Added to favorite", marker.id);
                        addToFavorites.mutate(marker.id);
                      }

                      //@ts-ignore
                      navigation.navigate("PrivateChat", {
                        chatId,
                        participants: [me.id, marker.ownerId],
                        chatType: "group",
                      });
                    } else {
                      // Navigate to point bio
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
            isPremium={isPremium}
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
        children={
          <CreateApplicationModal
            markerId={stateMarkerById ?? ""}
            isSent={requestSent}
          />
        }
        storeKey="createApplication"
      />
      <ModalWrapper
        isBottomSheet
        children={
          <PreviewConfirmationSheet
            isPrivate={isPrivate}
            coordinate={previewCoordinate}
            onConfirm={() => {
              // Set marker position for creation first
              if (previewCoordinate) {
                setMarkerPosition(previewCoordinate);

                // Store coordinate for navigation before clearing
                const coordinateForNavigation = { ...previewCoordinate };

                // Clear preview marker
                setPreviewCoordinate(null);

                // Handle point creation based on privacy setting
                if (!isPrivate) {
                  openPointType();
                } else {
                  //@ts-ignore
                  navigation.navigate("PrivatePointCreation" as never, {
                    coordinate: coordinateForNavigation,
                  });
                }
              }
            }}
            onCancel={() => {
              // Clear preview marker and reset state
              setPreviewCoordinate(null);
            }}
          />
        }
        storeKey="previewConfirmation"
      />
    </View>
  );
};
