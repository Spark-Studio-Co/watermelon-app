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
import { useRef, useState, useEffect, useMemo } from "react";
import { Button } from "@/src/shared/ui/button/button";
import { useCameraPermissions } from "expo-camera";
import { PointTypeSwitch } from "@/src/shared/ui/point-type-switch/point-type-switch";
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget";
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useCameraStore } from "@/src/widget/camera/model/camera-store";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useCreateMarker } from "@/src/entities/markers/api/use-create-marker";
import { useQueryClient } from "@tanstack/react-query";
import { customMapStyle } from "@/src/features/map/config/map-styles";
import { useChatStore } from "@/src/features/chat/model/chat-store";
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id";

import CameraIcon from "@/src/shared/icons/camera-icon";

type PrivatePointCreationParams = {
  coordinate?: {
    latitude: number;
    longitude: number;
  };
};

type PrivatePointCreationScreenRouteProp = RouteProp<
  {
    PrivatePointCreation: PrivatePointCreationParams;
  },
  "PrivatePointCreation"
>;

export const PrivatePointCreationScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const route = useRoute<PrivatePointCreationScreenRouteProp>();
  const bioInputRef = useRef(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [pointType, setPointType] = useState<string>("standard");
  const [mapRegion, setMapRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const { image, setImage } = useCameraStore("privateCamera");
  const { open } = useVisibleStore("privateCamera");
  const { open: openChoice, close: closeChoice } =
    useVisibleStore("cameraChoice");
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoadingChatCreation, setIsLoadingChatCreation] = useState(false);
  const [createdMarkerId, setCreatedMarkerId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createPoint } = useCreateMarker();

  // Use the marker data query to get the chat ID
  const { data: markerData, isLoading: isLoadingMarkerData } =
    useMarkerDataById(createdMarkerId);

  // Handle navigation when marker data is available
  useEffect(() => {
    if (createdMarkerId && markerData && !isLoadingMarkerData) {
      // Extract the chat ID from the marker data
      const chatId = markerData?.chats?.[0]?.id;
      const participants = [markerData?.ownerId];

      if (chatId) {
        console.log(
          `[PointCreation] Found chat ID in marker data: ${chatId}, markerId: ${createdMarkerId}`
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
                markerId: createdMarkerId,
                isGlobal: true,
              },
            },
          ],
        });

        // Reset the created marker ID
        setCreatedMarkerId(null);
      } else {
        console.error(
          "[PointCreation] Error: No chat ID in marker data!",
          markerData
        );
        setIsLoadingChatCreation(false);
        setIsSubmitting(false);
      }
    }
  }, [markerData, isLoadingMarkerData, createdMarkerId, navigation]);

  const {
    setName,
    setDescription,
    name,
    description,
    latitude,
    longitude,
    isPrivate,
    ownerId,
    setLatitude,
    setLongitude,
  } = useMarkerStore();

  useEffect(() => {
    // Get coordinates from route params if available
    if (route.params?.coordinate) {
      const { latitude: lat, longitude: lng } = route.params.coordinate;
      setLatitude(lat);
      setLongitude(lng);
      setMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [route.params, setLatitude, setLongitude]);

  const openCamera = async () => {
    const { granted } = await requestPermission();
    if (granted) {
      closeChoice();
      open();
    } else {
      console.log("Camera permission not granted");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    closeChoice();

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

    if (name) data.append("name", name);
    if (description) data.append("description", description);
    if (pointType) data.append("type", String(pointType));
    if (latitude) data.append("latitude", String(latitude));
    if (longitude) data.append("longitude", String(longitude));
    if (ownerId) data.append("ownerId", ownerId);
    data.append("startingBid", "0");
    // Force isPrivate to true since this is the private point creation screen
    data.append("isPrivate", "true");

    // Debug logging for private point creation
    console.log("🔒 Creating private point with data:", {
      name,
      description,
      pointType,
      latitude,
      longitude,
      ownerId,
      isPrivate: true, // Always true for private points
    });

    createPoint(data, {
      onSuccess: (data: any) => {
        console.log("✅ Маркер успешно создан!", data);
        queryClient.invalidateQueries({
          queryKey: ["markers"],
        });

        // Clear all fields after successful submission
        setName("");
        setDescription("");
        setPointType("standard");
        setPhotoUri(null);
        setImage(null);

        setTimeout(() => {
          if (pointType === "chat") {
            setIsLoadingChatCreation(true);
            const markerId = data?.id;
            const participants = [data?.ownerId];
            const chatStore = useChatStore.getState();
            const chatName = name || `Point #${markerId}`;

            // Set basic chat info immediately
            chatStore.setName(chatName);
            chatStore.setAvatar(photoToSend ? { uri: photoToSend } : null);
            chatStore.setCurrentChatMarkerId(markerId);

            console.log(
              `[PointCreation] Setting markerId ${markerId} to fetch latest data with chat ID`
            );

            // Set the marker ID to trigger the useMarkerDataById hook
            setCreatedMarkerId(markerId);

            // The rest of the navigation logic will be handled in the useEffect that watches markerData
          } else {
            setIsLoadingChatCreation(false);
            // Reset navigation stack to prevent going back to point creation
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

  const [pointDisplayId] = useState(() => {
    const randomId = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `Point #${randomId}`;
  });

  const markerStyle = useMemo(
    () => ({
      borderColor: pointType === "standard" ? "#FFFFFF" : "#93E0FF",
    }),
    [pointType]
  );

  {
    isLoadingChatCreation && (
      <View className="flex items-center justify-center mt-6">
        <Text className="text-white text-[18px] mb-2">Создаём чат...</Text>
        <ActivityIndicator size="large" color="#E9D66B" />
      </View>
    );
  }

  return (
    <MainLayout>
      <View className="flex flex-col items-end mt-4">
        <Text weight="bold" className="text-white text-[24px]">
          {pointDisplayId}
        </Text>
      </View>
      <View className="w-full h-[182px] rounded-[12px] mt-1 overflow-hidden">
        {mapRegion && latitude && longitude ? (
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
              key={`marker-${latitude}-${longitude}`}
              coordinate={{ latitude, longitude }}
              tracksViewChanges={true}
              rotation={0}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View
                className="bg-[#2E2E2E] w-[25px] h-[25px] border-[2px] rounded-full"
                style={markerStyle}
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
        className="rounded-[12px] "
      >
        <View className="flex flex-col py-2  w-[95%] justify-center mx-auto">
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Point name user"
            maxLength={50}
            className="h-[65px] text-[#5C5A5A] placeholder:text-[#5C5A5A] text-[20px] pl-6 mt-6 border-[1px] border-[#999999] rounded-[15px] w-full"
          />
          <Text weight="bold" className="mt-6 text-white text-[24px]">
            Add bio
          </Text>
          <Input
            value={description}
            onChangeText={setDescription}
            ref={bioInputRef}
            returnKeyType="done"
            multiline
            placeholder="bio information..."
            className="text-[#5C5A5A] placeholder:text-[#5C5A5A] text-[20px] px-6 mt-6 pt-6 border-[1px] h-[156px] border-[#999999] rounded-[15px] w-full"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View className="flex flex-row justify-between w-[90%] mx-auto mt-5">
          <View className="flex flex-col items-center gap-y-5">
            <Text weight="bold" className="text-white text-[24px]">
              Add photo
            </Text>
            <Button
              onPress={openChoice}
              variant="custom"
              className="bg-[#1B1C1E] flex items-center justify-center border border-[#222328] rounded-[15px] w-[100px] h-[100px]"
              style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
            >
              <CameraIcon />
            </Button>
          </View>
          <View className="flex flex-col items-center gap-y-5">
            <Text weight="bold" className="text-white text-[24px]">
              Select type
            </Text>
            <View
              className="bg-[#1B1C1E] flex items-center justify-center border border-[#222328] rounded-[15px] w-[203px] h-[100px]"
              style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
            >
              <PointTypeSwitch value={pointType} onChange={setPointType} />
            </View>
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
      <ModalWrapper storeKey="cameraChoice">
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
      <CameraModalWidget
        storeKey="privateCamera"
        onPhotoTaken={(uri) => setPhotoUri(uri)}
      />
    </MainLayout>
  );
};
