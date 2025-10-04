import { MainLayout } from "../../layouts/main-layout";
import {
  View,
  Image,
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Input } from "@/src/shared/ui/input/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/shared/ui/button/button";
import { useCameraPermissions } from "expo-camera";
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import { customMapStyle } from "@/src/features/map/config/map-styles";

import CameraIcon from "@/src/shared/icons/camera-icon";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useNavigation } from "@react-navigation/native";
import { useCameraStore } from "@/src/widget/camera/model/camera-store";
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper";
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id";
import { useUpdateMarker } from "@/src/entities/markers/api/use-update-marker";
import queryClient from "../../config/queryClient";
import { useChatStore } from "@/src/features/chat/model/chat-store";

export const GlobalPointCreationScreen = ({
  route,
}: {
  route: {
    params: { id: any; name: any; type: string };
  };
}) => {
  const { name, id, type } = route.params;
  const { image, setImage } = useCameraStore("globalCamera");
  const { open } = useVisibleStore("globalCamera");
  const { open: openGlobalChoice, close: closeGlobalChoice } =
    useVisibleStore("globalChoice");
  const navigation = useNavigation();
  const bioInputRef = useRef(null);

  // State for tracking the updated marker ID for chat navigation
  const [updatedMarkerId, setUpdatedMarkerId] = useState<string | null>(null);
  const [isLoadingChatCreation, setIsLoadingChatCreation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use marker data by ID for initial data and for fetching updated data with chat ID
  const { data: markerData } = useMarkerDataById(id);
  const { data: updatedMarkerData, isLoading: isLoadingUpdatedMarker } =
    useMarkerDataById(updatedMarkerId);

  // Handle navigation when updated marker data is available
  useEffect(() => {
    if (updatedMarkerId && updatedMarkerData && !isLoadingUpdatedMarker) {
      // Extract the chat ID from the marker data
      const chatId = updatedMarkerData?.chats?.[0]?.id;
      const participants = [updatedMarkerData?.ownerId];

      if (chatId) {
        console.log(
          `[GlobalPointCreation] Found chat ID in marker data: ${chatId}, markerId: ${updatedMarkerId}`
        );

        // Reset navigation stack and navigate to the private chat screen to prevent going back
        setIsLoadingChatCreation(false);
        setIsSubmitting(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "PrivateChat" as never,
              params: {
                chatId,
                participants,
                chatType: "group",
                markerId: updatedMarkerId,
                isGlobal: true,
              },
            },
          ],
        });

        // Reset the updated marker ID
        setUpdatedMarkerId(null);
      } else {
        console.error(
          "[GlobalPointCreation] Error: No chat ID in marker data!",
          updatedMarkerData
        );
        setIsLoadingChatCreation(false);
        setIsSubmitting(false);
      }
    }
  }, [updatedMarkerData, isLoadingUpdatedMarker, updatedMarkerId, navigation]);

  const { mutate: updatePoint } = useUpdateMarker(id);
  const {
    setName,
    setDescription,
    description,
    name: pointName,
  } = useMarkerStore();

  const [mapRegion, setMapRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    console.log(markerData);

    // Set map region when marker data is available
    if (markerData?.latitude && markerData?.longitude) {
      setMapRegion({
        latitude: markerData.latitude,
        longitude: markerData.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [markerData]);

  const openCamera = async () => {
    const { granted } = await requestPermission();
    if (granted) {
      closeGlobalChoice();
      open();
    } else {
      console.log("Camera permission not granted");
    }
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    closeGlobalChoice();

    if (!result.canceled && result.assets?.length) {
      setImage(result.assets[0].uri);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = () => {
    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);
    const data = new FormData();

    const photoToSend = photoUri || image;
    if (photoToSend) {
      const fileName = photoToSend.split("/").pop() || "photo.jpg";
      const fileType = fileName.split(".").pop();
      const mimeType = `image/${fileType}`;

      data.append("image", {
        uri: photoToSend,
        name: fileName,
        type: mimeType,
      } as any);
    }

    if (name) data.append("name", pointName ?? "Point");
    if (description) data.append("description", description);
    if (markerData?.type) data.append("type", String(markerData?.type));
    if (markerData?.latitude)
      data.append("latitude", String(markerData?.latitude));
    if (markerData?.longitude)
      data.append("longitude", String(markerData?.longitude));
    if (markerData?.ownerId) data.append("ownerId", markerData?.ownerId);
    data.append("isPrivate", "false");

    console.log(data);

    updatePoint(data, {
      onSuccess: (data: any) => {
        console.log("✅ Маркер успешно обновлен!", data);
        queryClient.invalidateQueries({
          queryKey: ["markers"],
        });

        // Clear all fields after successful submission
        setName("");
        setDescription("");
        setPhotoUri(null);
        setImage(null);

        setTimeout(() => {
          if (type === "chat") {
            // For chat points, set loading state and fetch updated marker data
            setIsLoadingChatCreation(true);
            const markerId = data?.id;

            // Set chat name and avatar in chat store
            const chatName = pointName || name || `Point #${markerId}`;
            const chatStore = useChatStore.getState();
            chatStore.setName(chatName);
            chatStore.setAvatar(
              photoUri || image ? { uri: photoUri || image } : null
            );
            chatStore.setCurrentChatMarkerId(markerId);

            console.log(
              `[GlobalPointCreation] Setting markerId ${markerId} to fetch latest data with chat ID`
            );

            // Set the marker ID to trigger the useMarkerDataById hook
            setUpdatedMarkerId(markerId);

            // The rest of the navigation logic will be handled in the useEffect that watches updatedMarkerData
          } else {
            // For standard points, reset navigation stack to prevent going back
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "PointBio" as never,
                  params: {
                    id: data?.id,
                    ownerId: data?.ownerId,
                  },
                },
              ],
            });
          }
        }, 500);
      },
      onError: (error) => {
        console.error("❌ Ошибка при создании маркера:", error.response);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <>
      {isLoadingChatCreation && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 10 }}>Creating chat...</Text>
          </View>
        </View>
      )}
      <MainLayout>
        <View className="flex flex-col items-end mt-4">
          <Text weight="bold" className="text-white text-[24px]">
            {name}
          </Text>
        </View>
        <View className="w-full h-[182px] rounded-[12px] mt-1 overflow-hidden">
          {mapRegion && markerData?.latitude && markerData?.longitude ? (
            <MapView
              style={{ width: "100%", height: "100%" }}
              region={mapRegion}
              customMapStyle={customMapStyle}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              mapType="standard"
              showsPointsOfInterest={false}
              showsBuildings={false}
              showsTraffic={false}
              showsIndoors={false}
            >
              <Marker
                coordinate={{
                  latitude: markerData.latitude,
                  longitude: markerData.longitude,
                }}
              >
                <View
                  className="bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full"
                  style={{ borderColor: getMarkerBorderColor(type) }}
                />
              </Marker>
            </MapView>
          ) : (
            <Image
              source={
                image ? { uri: image } : require("@/src/images/point_image.png")
              }
              className="w-full h-[182px]"
            />
          )}
        </View>

        <View
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          className="rounded-[12px]"
        >
          <View className="flex flex-col py-2 w-[95%] justify-center mx-auto">
            <Input
              value={pointName}
              placeholder="Point name user"
              maxLength={50}
              className="h-[65px] text-[#5C5A5A] text-[20px] pl-6 mt-6 border-[1px] border-[#999999] rounded-[15px] w-full"
              onChangeText={setName}
            />
            <Text weight="bold" className="mt-6 text-white text-[24px]">
              Add bio
            </Text>
            <Input
              value={description}
              ref={bioInputRef}
              returnKeyType="done"
              multiline
              placeholder="bio information..."
              className="text-[#5C5A5A] text-[20px] px-6 mt-6 pt-6 border-[1px] h-[156px] border-[#999999] rounded-[15px] w-full"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              onChangeText={setDescription}
            />
          </View>
          <View className="flex items-center justify-center mt-5">
            <View className="flex flex-col items-center gap-y-5">
              <Text weight="bold" className="text-white text-[24px]">
                Add photo
              </Text>
              <Button
                onPress={openGlobalChoice}
                variant="custom"
                className="bg-[#1B1C1E] flex items-center justify-center border border-[#222328] rounded-[15px] w-[100px] h-[100px]"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              >
                <CameraIcon />
              </Button>
            </View>
          </View>
          <View className="mt-10 mb-9 flex items-center justify-center">
            <Button
              onPress={handleSubmit}
              variant="custom"
              className={`w-[134px] py-3.5 rounded-[6px] ${
                isSubmitting ? "bg-[#888888]" : "bg-[#14A278]"
              } flex items-center justify-center`}
              disabled={isSubmitting}
            >
              <Text weight="regular" className="text-white text-[16px]">
                {isSubmitting ? "CREATING..." : "CREATE"}
              </Text>
            </Button>
          </View>
        </View>

        <ModalWrapper storeKey="globalChoice">
          <View className=" bg-[#38373A] w-[90%] px-8 rounded-lg">
            <View className="flex flex-row items-center justify-between w-[100%] h-[200px]">
              <Button
                className="bg-[#27262A] px-4 py-3 rounded-md"
                onPress={openCamera}
              >
                <Text weight="medium" className="text-white">
                  Make a photo
                </Text>
              </Button>
              <Button
                className="bg-[#27262A] px-4 py-3 rounded-md"
                onPress={pickImage}
              >
                <Text weight="medium" className="text-white">
                  Pick from gallery
                </Text>
              </Button>
            </View>
          </View>
        </ModalWrapper>
        <CameraModalWidget storeKey="globalCamera" />
      </MainLayout>
    </>
  );
};
