import React, { useState, useEffect } from "react";
import { View, Alert, TextInput, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import CrossIcon from "@/src/shared/icons/cross-icon";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { ChatSettingsTab } from "./chat-settings-tab";
import { useChatStore } from "../model/chat-store";
import { useDeleteChat } from "../api/use-delete-chat";
import { useUpdateChatTitle } from "../api/use-update-chat-title";
import { useUpdateMarker } from "@/src/entities/markers/api/use-update-marker";
import { useDeleteMarker } from "@/src/entities/markers/api/use-delete-marker";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useMarkerApplications } from "@/src/entities/markers/api/use-marker-applications";
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id";
import { apiClient } from "@/src/app/config/apiClient";

export const ChatSettingsModal = () => {
  const { close } = useVisibleStore("globalChatSettings");
  const { open } = useVisibleStore("chatApplications");
  const queryClient = useQueryClient();

  // Get current chat ID and name
  const currentChatId = useChatStore((state) => state.currentChatId);
  const currentChatName = useChatStore((state) => state.name);

  const { currentChatMarkerId } = useChatStore();
  const { data: applications } = useMarkerApplications(
    currentChatMarkerId || ""
  );

  const { data: markerData } = useMarkerDataById(currentChatMarkerId || "");

  const isPrivateMarker = markerData?.chats?.[0].isPrivate;

  useEffect(() => {
    console.log("isPrivateMarker", isPrivateMarker);
  }, []);

  // State for title editing
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [markerId, setMarkerId] = useState<string>("");

  // State for privacy toggle
  const [isPrivate, setIsPrivate] = useState(!isPrivateMarker);
  const [isTogglingPrivacy, setIsTogglingPrivacy] = useState(false);

  useEffect(() => {
    const loadPrivacyState = async () => {
      try {
        if (currentChatId) {
          const storedPrivacy = await AsyncStorage.getItem(
            `chat_privacy_${currentChatId}`
          );

          if (storedPrivacy !== null) {
            setIsPrivate(storedPrivacy === "true");
          } else if (markerData?.chats?.isPrivate !== undefined) {
            setIsPrivate(markerData.chats.isPrivate);
          }
        }
      } catch (error) {
        console.error("Error loading privacy state from AsyncStorage:", error);
        // Fallback to marker data
        if (markerData?.chats?.isPrivate !== undefined) {
          setIsPrivate(markerData.chats.isPrivate);
        }
      }
    };

    loadPrivacyState();
  }, [markerData, currentChatId]);

  // Use the delete chat hook
  const { mutate: deleteChat, isPending: isDeleting } = useDeleteChat();

  // Use the delete marker hook
  const { mutate: deleteMarker } = useDeleteMarker();

  // Navigation
  const navigation = useNavigation();

  // Use the update chat title hook
  const { mutate: updateTitle, isPending: isUpdatingTitle } =
    useUpdateChatTitle();

  // Use the update marker hook
  const { mutate: updateMarker } = useUpdateMarker(markerId);

  // Fetch chat data to get markerId and privacy status when component mounts
  useEffect(() => {
    if (currentChatId) {
      // Try to get chat data from cache first
      const chatData = queryClient.getQueryData([
        "chatMetadata",
        currentChatId,
      ]) as any;
      if (chatData) {
        if (chatData.markerId) {
          setMarkerId(chatData.markerId);
        }
        // Set privacy status if available
        if (chatData.isPrivate !== undefined) {
          setIsPrivate(chatData.isPrivate);
        }
      } else {
        // If not in cache, we could fetch it here if needed
        console.log("No chat data found in cache for chat:", currentChatId);
      }
    }
  }, [currentChatId, queryClient]);

  // Handle opening the title edit modal
  const handleOpenTitleModal = () => {
    setNewTitle(currentChatName || "");
    setShowTitleModal(true);
  };

  // Handle saving the new title
  // Handle privacy toggle
  const handleTogglePrivacy = async () => {
    if (!currentChatId || isTogglingPrivacy) return;

    const newPrivacyStatus = !isPrivate;

    // ✅ Меняем UI сразу
    setIsPrivate(newPrivacyStatus);
    setIsTogglingPrivacy(true);

    try {
      // Save to AsyncStorage first for immediate persistence
      await AsyncStorage.setItem(
        `chat_privacy_${currentChatId}`,
        String(newPrivacyStatus)
      );

      // Then update on the server
      await apiClient.post(`/chat/${currentChatId}/make-private`, {
        isPrivate: newPrivacyStatus,
      });

      // Invalidate chat metadata
      queryClient.invalidateQueries({
        queryKey: ["chatMetadata", currentChatId],
      });

      // Also invalidate marker data if we have a marker ID
      if (currentChatMarkerId) {
        queryClient.invalidateQueries({
          queryKey: ["markerById", currentChatMarkerId],
        });
      }

      console.log(
        `✅ Chat privacy updated to: ${newPrivacyStatus ? "private" : "public"}`
      );
    } catch (error) {
      // Откат UI если ошибка
      setIsPrivate(!newPrivacyStatus);

      // Also revert in AsyncStorage
      try {
        await AsyncStorage.setItem(
          `chat_privacy_${currentChatId}`,
          String(!newPrivacyStatus)
        );
      } catch (storageError) {
        console.error("Error reverting privacy in AsyncStorage:", storageError);
      }

      console.error("❌ Error updating chat privacy:", error);
      Alert.alert(
        "Ошибка",
        "Не удалось обновить настройки приватности. Пожалуйста, попробуйте позже."
      );
    } finally {
      setIsTogglingPrivacy(false);
    }
  };

  const handleSaveTitle = () => {
    if (!currentChatId || !newTitle.trim()) return;

    console.log("Updating chat title for chat ID:", currentChatId);

    // Update chat title
    updateTitle(
      { chatId: currentChatId, title: newTitle.trim() },
      {
        onSuccess: () => {
          setShowTitleModal(false);

          // Update the name in chat store
          useChatStore.getState().setName(newTitle.trim());

          // Also update the associated point name if we have a markerId
          if (markerId) {
            console.log("Also updating point name for marker ID:", markerId);

            const data = new FormData();
            data.append("name", newTitle.trim());

            updateMarker(data, {
              onSuccess: () => {
                console.log("✅ Point name also updated successfully");
                // Invalidate marker queries to refresh data
                queryClient.invalidateQueries({
                  queryKey: ["markerById", markerId],
                });
              },
              onError: (error) => {
                console.error("❌ Error updating point name:", error);
              },
            });
          }
        },
        onError: () => {
          Alert.alert(
            "Ошибка",
            "Не удалось обновить название чата. Пожалуйста, попробуйте позже."
          );
        },
      }
    );
  };

  const settings = [
    {
      title: "Приватность",
      description: "Сделать чат закрытым",
      isRadioButton: true,
      isClicked: isPrivate,
      isLoading: isTogglingPrivacy,
      onPress: handleTogglePrivacy,
    },
    {
      title: "Заявки",
      isRadioButton: false,
      isApplication: true,
      applications: applications?.length || 0,
      onPress: () => {
        close();
        open();
      },
    },
    {
      title: "Название",
      description: "Редактировать название чата",
      isRadioButton: false,
      onPress: handleOpenTitleModal,
    },
  ];

  return (
    <>
      {/* Title Edit Modal */}
      <Modal
        visible={showTitleModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTitleModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-[#313034] w-[90%] p-5 rounded-[15px]">
            <Text
              weight="regular"
              className="text-white text-[20px] mb-4 text-center"
            >
              Редактировать название
            </Text>

            <TextInput
              className="bg-[#3A393C] text-white p-3 rounded-md w-full mb-4"
              placeholder="Введите новое название..."
              placeholderTextColor="#8E8E93"
              value={newTitle}
              onChangeText={setNewTitle}
              maxLength={50}
            />

            <View className="flex flex-row justify-between">
              <Button
                className="py-2 px-4 rounded-md bg-[#3A393C] flex-1 mr-2"
                onPress={() => setShowTitleModal(false)}
              >
                <Text
                  weight="regular"
                  className="text-white text-[14px] text-center"
                >
                  Отмена
                </Text>
              </Button>

              <Button
                className="py-2 px-4 rounded-md bg-[#007AFF] flex-1 ml-2"
                onPress={handleSaveTitle}
                disabled={isUpdatingTitle || !newTitle.trim()}
              >
                <Text
                  weight="regular"
                  className="text-white text-[14px] text-center"
                >
                  {isUpdatingTitle ? "Сохранение..." : "Сохранить"}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Main Settings Modal */}
      <View
        className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center justify-center relative"
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      >
        <Text weight="regular" className="text-white text-[20px]">
          Настройки
        </Text>
        <Button className="absolute right-3 top-3" onPress={close}>
          <CrossIcon />
        </Button>
        <View className="flex flex-col items-center w-[90%] mt-6 gap-y-4">
          {settings.map((setting, index) => (
            <ChatSettingsTab
              key={index}
              title={setting.title}
              description={setting.description}
              isRadioButton={setting.isRadioButton}
              isClicked={setting.isClicked}
              isLoading={setting.isLoading}
              onPress={setting.onPress}
              isApplication={setting.isApplication}
              applications={setting.applications}
            />
          ))}
        </View>
        <Button
          className="w-[90%] mt-6 flex items-center justify-center"
          onPress={() => {
            // Show confirmation dialog before deleting the chat
            Alert.alert(
              "Удаление чата",
              "Вы уверены, что хотите удалить этот чат? Это действие нельзя отменить.",
              [
                {
                  text: "Отмена",
                  style: "cancel",
                },
                {
                  text: "Удалить",
                  onPress: () => {
                    // Close the modal
                    close();

                    // Delete the chat globally
                    if (currentChatId) {
                      deleteChat(currentChatId);

                      // Also delete the associated marker if available
                      if (markerId) {
                        deleteMarker(markerId);
                        // Navigate to Map screen after deletion
                        navigation.navigate("Map" as never);
                      }
                    }
                  },
                  style: "destructive",
                },
              ]
            );
          }}
          disabled={isDeleting}
        >
          <Text weight="regular" className="text-white text-[20px]">
            {isDeleting ? "Удаление..." : "Удалить чат"}
          </Text>
        </Button>
      </View>
    </>
  );
};
