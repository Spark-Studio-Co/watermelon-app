import React, { useState } from "react";
import { View, Alert, TextInput, Modal } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import CrossIcon from "@/src/shared/icons/cross-icon";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { ChatSettingsTab } from "./chat-settings-tab";
import { useChatStore } from "../model/chat-store";
import { useDeleteChat } from "../api/use-delete-chat";
import { useUpdateChatTitle } from "../api/use-update-chat-title";

export const ChatSettingsModal = () => {
  const { close } = useVisibleStore("globalChatSettings");
  const { open } = useVisibleStore("chatApplications");
  
  // Get current chat ID and name
  const currentChatId = useChatStore((state) => state.currentChatId);
  const currentChatName = useChatStore((state) => state.name);
  
  // State for title editing
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  
  // Use the delete chat hook
  const { mutate: deleteChat, isPending: isDeleting } = useDeleteChat();
  
  // Use the update chat title hook
  const { mutate: updateTitle, isPending: isUpdatingTitle } = useUpdateChatTitle();
  
  // Handle opening the title edit modal
  const handleOpenTitleModal = () => {
    setNewTitle(currentChatName || "");
    setShowTitleModal(true);
  };
  
  // Handle saving the new title
  const handleSaveTitle = () => {
    if (!currentChatId || !newTitle.trim()) return;
    
    updateTitle(
      { chatId: currentChatId, title: newTitle.trim() },
      {
        onSuccess: () => {
          setShowTitleModal(false);
        },
        onError: () => {
          Alert.alert(
            "Ошибка",
            "Не удалось обновить название чата. Пожалуйста, попробуйте позже."
          );
        }
      }
    );
  };

  const settings = [
    {
      title: "Приватность",
      description: "Сделать чат закрытым",
      isRadioButton: true,
      onPress: () => {},
    },
    {
      title: "Заявки",
      isRadioButton: false,
      isApplication: true,
      applications: 123,
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
            <Text weight="regular" className="text-white text-[20px] mb-4 text-center">
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
                <Text weight="regular" className="text-white text-[14px] text-center">
                  Отмена
                </Text>
              </Button>
              
              <Button 
                className="py-2 px-4 rounded-md bg-[#007AFF] flex-1 ml-2"
                onPress={handleSaveTitle}
                disabled={isUpdatingTitle || !newTitle.trim()}
              >
                <Text weight="regular" className="text-white text-[14px] text-center">
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
                style: "cancel"
              },
              { 
                text: "Удалить", 
                onPress: () => {
                  // Close the modal
                  close();
                  
                  // Delete the chat globally
                  if (currentChatId) {
                    deleteChat(currentChatId);
                  }
                },
                style: "destructive"
              }
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
