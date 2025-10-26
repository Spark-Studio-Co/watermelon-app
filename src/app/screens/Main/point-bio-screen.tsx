import { MainLayout } from "../../layouts/main-layout";
import { View, TouchableOpacity, Image, Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper";
import Text from "@/src/shared/ui/text/text";
import { PointBioTab } from "@/src/features/point/ui/point-bio-tab";
import { Button } from "@/src/shared/ui/button/button";
//@ts-ignore
import MasonryList from "react-native-masonry-list";
import { PointSettings } from "@/src/features/point/ui/point-settings";
import { PointRadiusSettings } from "@/src/features/point/ui/point-radius-settings";
import { RadiusColorSettings } from "@/src/features/point/ui/radius-color-settings";
import { PointNameSettings } from "@/src/features/point/ui/point-name-settings";
import { Input } from "@/src/shared/ui/input/input";
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget";
import { PointBioSettings } from "@/src/features/point/ui/point-bio-settings";
import { ChatViolationModal } from "@/src/features/chat/ui/chat-violation-modal";

import MailIcon from "@/src/shared/icons/mail-icon";
import ThreeDotIcon from "@/src/shared/icons/three-dot-icon";
import RightArrowIcon from "@/src/shared/icons/right-arrow-icon";
import CameraIcon from "@/src/shared/icons/camera-icon";

import { useActiveStore } from "@/src/shared/model/use-active-store";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import {
  RouteProp,
  useNavigation,
  NavigationProp,
  useNavigationState,
} from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useCameraPermissions } from "expo-camera";
import { useCameraStore } from "@/src/widget/camera/model/camera-store";
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useSaveMarker } from "@/src/entities/markers/api/use-save-marker";
import { useUnsaveMarker } from "@/src/entities/markers/api/use-unsave-marker";
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useUploadImage } from "@/src/entities/markers/api/use-upload-image";
import { useQueryClient } from "@tanstack/react-query";
import { usePersonalizedPublicationsData } from "@/src/entities/markers/api/use-personalized-publications-data";
import { useGetUsers } from "@/src/entities/users/api/use-get-users";
import { useChatStore } from "@/src/features/chat/model/chat-store";
import {
  useGetPrivateChat,
  useCreatePrivateChat,
  useCreateOrGetMarkerPrivateChat,
} from "@/src/features/chat/api/use-get-private-chat";
import { PointApplicationsModal } from "@/src/features/point/ui/point-applications-modal";

type PointBioRouteProp = {
  route: RouteProp<any, any>;
};

type RouteParams = {
  id: string;
  ownerId?: string; // Make optional since it might come from marker data
  isPrivate: boolean;
};

// Define navigation type
type RootStackParamList = {
  PrivateChat: {
    chatId: string;
    participants: string[];
    chatType: "private" | "group";
  };
  [key: string]: object | undefined;
};

export const PointBioScreen = ({ route }: PointBioRouteProp) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigationState = useNavigationState((state) => state);
  const bioInputRef = useRef(null);
  const queryClient = useQueryClient();
  const { id: markerId, ownerId, isPrivate } = route.params as RouteParams;

  // Debug route params
  console.log("Route params received:", route.params);

  const {
    data: publications,
    isLoading,
    refetch,
  } = usePersonalizedPublicationsData(markerId);

  const { setName, setAvatar } = useChatStore();
  const { refetch: refetchUsersData } = useGetUsers(ownerId);
  const { mutate: uploadImage } = useUploadImage();
  const getPrivateChat = useGetPrivateChat();
  const createPrivateChat = useCreatePrivateChat();
  const createOrGetMarkerPrivateChat = useCreateOrGetMarkerPrivateChat();
  const { setId, setIsPrivate } = useMarkerStore();
  const { data: marker, refetch: markerRefetch } = useMarkerDataById(markerId);
  const { data: me } = useGetMe();

  // Get ownerId from route params or marker data as fallback
  const effectiveOwnerId = ownerId || marker?.ownerId;
  const { open: openPost } = useVisibleStore("post");
  const { open: openChoice, close: closeChoice } =
    useVisibleStore("cameraChoice");
  const { open: openViolationModal } = useVisibleStore("chatViolations");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const { active, setActive } = useActiveStore("pointBio", "bio");
  const saveMarkerMutation = useSaveMarker();
  const unsaveMarkerMutation = useUnsaveMarker();
  const { open, close } = useVisibleStore("pointBio");
  const { open: openSettings } = useVisibleStore("pointSettings");
  const [permission, requestPermission] = useCameraPermissions();
  const { image, setImage: setPostImage, clearImage } = useCameraStore("post");
  const [caption, setCaption] = useState<string | null>();

  const buttons = ["bio", "Публикации"];

  useEffect(() => {
    setId(markerId);
    setIsPrivate(isPrivate);
    console.log("MARKER DATA", marker);
  }, [markerId]);

  const alternatingHeightsImages =
    Array.isArray(publications) &&
    publications?.map((item: any, index: number) => {
      const isEven = index % 2 === 0;

      return {
        uri: item.image,
        id: item.id,
        dimensions: {
          height: isEven ? 219.70872497558594 : 178.95631408691406,
        },
      };
    });

  const handleOpenSection = (label: string) => {
    setActive(label);
  };

  // Handle saving/unsaving markers
  const handleSaveMarker = () => {
    if (marker?.isSaved) {
      // Unsave the marker
      unsaveMarkerMutation.mutate(markerId, {
        onSuccess: () => {
          // Optionally refresh marker data to update isSaved status
          markerRefetch();
        },
        onError: (error) => {
          console.error("Error unsaving marker:", error);
        },
      });
    } else {
      // Save the marker
      saveMarkerMutation.mutate(markerId, {
        onSuccess: () => {
          console.log("Marker saved successfully");
          // Optionally refresh marker data to update isSaved status
          markerRefetch();
        },
        onError: (error) => {
          console.error("Error saving marker:", error);
        },
      });
    }
  };

  const openCamera = async () => {
    const { granted } = await requestPermission();
    if (granted) {
      closeChoice();
      openPost();
    } else {
      console.log("Camera permission not granted");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      base64: false,
      exif: false,
    });
    closeChoice();

    if (!result.canceled && result.assets?.length) {
      setPostImage(result.assets[0].uri);
    } else {
      setPostImage(null);
    }
  };
  const createPost = () => {
    const formData = new FormData();

    const photoToSend = photoUri || image;
    if (photoToSend) {
      const fileName = photoToSend.split("/").pop() || "photo.jpg";
      const fileType = fileName.split(".").pop();
      const mimeType = `image/${fileType}`;

      formData.append("image", {
        uri: photoToSend,
        name: fileName,
        type: mimeType,
      } as any);

      formData.append("caption", caption ?? "");
      formData.append("markerId", markerId);

      uploadImage(formData, {
        onSuccess: () => {
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ["personalized-pub"] });
            refetch();
            clearImage();
            setPhotoUri(null);
            setCaption(null);
            setActive("Публикации");
          }, 1500);
        },
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [publications, active === "Публикации"]);

  const isOwner = effectiveOwnerId === me?.id;

  // Custom back handler for navigation from Auction
  const handleCustomBack = () => {
    console.log("🔙 handleCustomBack called");

    const routes = navigationState?.routes || [];
    const currentIndex = navigationState?.index || 0;

    console.log(
      "PointBioScreen back handler - routes:",
      routes.map((r) => r.name)
    );
    console.log("Current index:", currentIndex);

    if (currentIndex > 0) {
      const previousRoute = routes[currentIndex - 1];
      console.log("Previous route:", previousRoute?.name);

      // If we came from Auction or AuctionInner, navigate to Dashboard instead
      if (
        previousRoute?.name === "Auction" ||
        previousRoute?.name === "AuctionInner"
      ) {
        console.log(
          "✅ Came from Auction/AuctionInner, resetting to Dashboard"
        );
        // Use reset to avoid navigation stack issues
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" as never }],
        });
        return;
      }
    }

    // Default back navigation
    console.log("Using default back navigation");
    if (navigation.canGoBack()) {
      console.log("✅ Can go back, using goBack()");
      navigation.goBack();
    } else {
      console.log("⚠️ Cannot go back, resetting to Dashboard");
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" as never }],
      });
    }
  };

  // Navigation helper function
  const navigateToChat = (chatId: string, participants: string[]) => {
    console.log("Attempting navigation to PrivateChat with:", {
      chatId,
      participants,
    });

    if (!navigation) {
      console.error("Navigation object is not available");
      alert("Навигация недоступна");
      return;
    }

    if (!chatId) {
      console.error("Chat ID is missing");
      alert("Отсутствует ID чата");
      return;
    }

    try {
      navigation.navigate("PrivateChat", {
        chatId,
        participants,
        chatType: "private",
      });
      console.log("Navigation successful");
    } catch (navError) {
      console.error("Navigation error:", navError);
      alert("Ошибка навигации в чат");
    }
  };

  // Debug logs to understand what's happening
  useEffect(() => {
    console.log("DEBUG - Owner check:", {
      routeOwnerId: ownerId,
      markerOwnerId: marker?.ownerId,
      effectiveOwnerId,
      myId: me?.id,
      isOwner,
    });
  }, [ownerId, marker?.ownerId, effectiveOwnerId, me?.id, isOwner]);

  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (marker) {
      // Trigger re-render when marker data changes
      setForceUpdate((prev) => prev + 1);
      console.log("Marker data updated:", {
        id: marker.id,
        isContentRestricted: marker.isContentRestricted,
        forceUpdateCount: forceUpdate + 1,
      });
    }
  }, [marker]);

  // Log complete visibility status for debugging
  useEffect(() => {
    console.log("COMPLETE VISIBILITY STATUS:", {
      isOwner,
      routeOwnerId: ownerId,
      markerOwnerId: marker?.ownerId,
      effectiveOwnerId,
      myId: me?.id,
      markerIsContentRestricted: marker?.isContentRestricted,
      forceUpdateCount: forceUpdate,
    });
  }, [
    isOwner,
    marker?.isContentRestricted,
    forceUpdate,
    ownerId,
    marker?.ownerId,
    effectiveOwnerId,
    me?.id,
  ]);

  return (
    <MainLayout
      isBack
      title={marker?.name ?? `Point #${marker?.map_id}`}
      customBackHandler={handleCustomBack}
    >
      <View className="w-[80%] mx-auto mt-4">
        <PointBioTab
          isSettingsVisible={effectiveOwnerId === me?.id}
          pointname={marker?.name ?? `Point #${marker?.map_id}`}
          // nickname="point_name"
          onPress={openSettings}
        />
      </View>
      <View className="flex flex-row items-center mt-12 w-[90%] mx-auto relative">
        {effectiveOwnerId === me?.id ? (
          <View className="ml-10" />
        ) : (
          <>
            <Button
              variant="follow"
              onPress={handleSaveMarker}
              disabled={
                saveMarkerMutation.isPending || unsaveMarkerMutation.isPending
              }
            >
              <Text weight="bold" className="text-[#5992FF] text-[13.82px]">
                {saveMarkerMutation.isPending || unsaveMarkerMutation.isPending
                  ? "Loading..."
                  : marker?.isSaved
                  ? "Unsave"
                  : "+ Save"}
              </Text>
            </Button>
            <Button
              onPress={async () => {
                console.log(
                  "Mail button pressed - starting marker chat navigation"
                );

                if (!markerId || !me?.id) {
                  console.log("Missing required IDs:", {
                    markerId,
                    myId: me?.id,
                  });
                  return;
                }

                // Use point data for the chat
                const pointName = marker?.name ?? `Point #${marker?.map_id}`;
                const pointAvatar = marker?.avatar || null;

                console.log("Setting chat info:", { pointName, pointAvatar });

                // Set point info in chat store
                setName(pointName);
                setAvatar(pointAvatar);

                try {
                  // Use the marker-specific chat endpoint
                  const chatResponse =
                    await createOrGetMarkerPrivateChat.mutateAsync({
                      markerId: markerId,
                    });

                  // Ensure we have a valid chat ID
                  if (!chatResponse || !chatResponse.id) {
                    throw new Error("Invalid chat response: missing chat ID");
                  }

                  console.log("Got marker chat ID:", chatResponse.id);
                  console.log("Participants:", chatResponse.participants);

                  // Extract participants from the response
                  const participants = chatResponse.participants
                    ? chatResponse.participants.map((p) => p.userId)
                    : [me.id, effectiveOwnerId];

                  const chatId = chatResponse.id;

                  console.log("Navigating to marker PrivateChat:", {
                    chatId,
                    participants,
                  });

                  // Navigate to chat
                  navigateToChat(chatId, participants);

                  // Connect to chat after navigation
                  setTimeout(() => {
                    console.log("Connecting to marker chat store...");
                    const { connect } = useChatStore.getState();
                    connect(chatId, me.id);
                  }, 100);
                } catch (error) {
                  console.error(
                    "Failed to handle marker chat navigation:",
                    error
                  );
                  // Show some user feedback
                  alert("Не удалось открыть чат. Попробуйте снова.");
                }
              }}
              variant="custom"
              className="w-[32.822383880615234px] h-[32.822383880615234px] bg-[#8888882E] rounded-[7.77px] border-[0.86px] border-[#888888] flex items-center justify-center ml-2"
            >
              <MailIcon />
            </Button>
          </>
        )}
        <View className="flex flex-col ml-6">
          <Text weight="medium" className="text-white text-[13.82px]">
            {marker?.totalEngagementCount}
          </Text>
          <Text weight="regular" className="text-[#888888] text-[11.23px]">
            Saved
          </Text>
        </View>
        <Button
          onPress={open}
          variant="custom"
          className="ml-6 w-[32.822383880615234px] h-[32.822383880615234px] bg-[#313034] rounded-[7.77px] flex items-center justify-center"
        >
          <ThreeDotIcon />
        </Button>
        <ModalWrapper
          storeKey="pointBio"
          isMini
          className={`${
            effectiveOwnerId === me?.id ? "-top-44" : "-top-40"
          } w-[80%]`}
        >
          <View
            className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center justify-center relative"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            <Button
              activeOpacity={0.9}
              className="flex flex-row items-center justify-between w-full rounded-[15px] px-6"
            >
              <Text weight="regular" className="text-white text-[18px]">
                Поделиться
              </Text>
              <RightArrowIcon />
            </Button>
            {effectiveOwnerId !== me?.id && (
              <Button
                activeOpacity={0.9}
                onPress={() => {
                  close();
                  openViolationModal();
                }}
                className="flex flex-row items-center justify-between w-full rounded-[15px] px-6 mt-6"
              >
                <Text weight="regular" className="text-white text-[18px]">
                  Сообщить о нарушении
                </Text>
                <RightArrowIcon />
              </Button>
            )}
          </View>
        </ModalWrapper>
      </View>
      <View className="mx-auto flex flex-row gap-x-4 items-center justify-center mt-6">
        {buttons.map((button, index) => (
          <View className="flex flex-row items-center" key={index}>
            <Button
              storeKey="pointBio"
              onPress={() => handleOpenSection(button)}
              variant="settings"
              label={button}
            >
              <Text weight="regular" className="text-white text-[14px]">
                {button}
              </Text>
            </Button>
          </View>
        ))}
        {effectiveOwnerId === me?.id && (
          <TouchableOpacity
            onPress={() => setActive("post")}
            className="bg-[#2A292C] w-[40px] h-[40px] rounded-full flex items-center justify-center"
          >
            <View className="bg-[#313034] w-[30px] h-[30px] rounded-full" />
          </TouchableOpacity>
        )}
      </View>
      <View className="w-[95%] mx-auto flex flex-col mt-6">
        {active === "bio" && (
          <View>
            <Text className="text-[#888888] text-[11.23px]">About</Text>
            <Text className="text-white mt-1 text-[13.82px] w-[80%]">
              {marker?.description}
            </Text>
          </View>
        )}
        {active === "Публикации" &&
          (!publications || publications.length === 0 ? (
            <View className="flex items-center justify-center w-full h-full">
              <Text className="text-white text-[16px]">No publications</Text>
            </View>
          ) : isLoading ? (
            <View className="flex items-center justify-center w-full h-full">
              <Text className="text-white text-[16px]">Loading...</Text>
            </View>
          ) : (
            <MasonryList
              images={alternatingHeightsImages}
              columns={2}
              spacing={2}
              backgroundColor="transparent"
              imageContainerStyle={{ borderRadius: 23.03 }}
              onPressImage={(item: any) => {
                const { id } = item;
                //@ts-ignore
                navigation.navigate("FullPost" as never, {
                  id,
                });
              }}
            />
          ))}
        {active === "post" && (
          <View className="flex items-center justify-center mt-8">
            <Text weight="bold" className=" text-white text-[24px]">
              Add text
            </Text>
            <Input
              ref={bioInputRef}
              returnKeyType="done"
              value={caption ?? ""}
              multiline
              onChangeText={setCaption}
              placeholder="Ваше сообщение..."
              className="text-white text-[20px] px-6 mt-6 pt-6 border-[1px] h-[156px] border-[#999999] rounded-[15px] w-full"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
            {image ? (
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("@/src/images/point_image.png")
                }
                className="w-[100%] h-[300px] mt-7 rounded-[12px]"
              />
            ) : (
              <View className="mt-7 flex flex-col items-center gap-y-5">
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
            )}
            <Button
              onPress={createPost}
              variant="custom"
              className="w-[134px] mt-[55px] py-3.5 rounded-[6px] bg-[#14A278] flex items-center justify-center"
            >
              <Text weight="regular" className="text-white text-[16px]">
                CREATE
              </Text>
            </Button>
          </View>
        )}
      </View>

      <ModalWrapper storeKey="pointSettings" isMini className="w-[90%]">
        <PointSettings markerId={markerId} />
      </ModalWrapper>
      <ModalWrapper storeKey="pointRadius" isMini className="w-[90%]">
        <PointRadiusSettings />
      </ModalWrapper>
      <ModalWrapper storeKey="radiusColor" isMini className="w-[90%] -top-8">
        <RadiusColorSettings />
      </ModalWrapper>
      <ModalWrapper storeKey="pointName" isMini className="w-[90%] -top-8">
        <PointNameSettings />
      </ModalWrapper>
      <ModalWrapper
        storeKey="pointBioSettings"
        isMini
        className="w-[90%] -top-8"
      >
        <PointBioSettings />
      </ModalWrapper>
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
      <ModalWrapper storeKey="pointApplications" isMini className="w-[90%]">
        <PointApplicationsModal markerId={markerId} />
      </ModalWrapper>
      <CameraModalWidget
        storeKey="post"
        onPhotoTaken={(uri) => setPhotoUri(uri)}
      />
      <ModalWrapper storeKey="chatViolations" isMini className="w-[90%]">
        <ChatViolationModal entityType="point" entityId={markerId} />
      </ModalWrapper>
    </MainLayout>
  );
};
