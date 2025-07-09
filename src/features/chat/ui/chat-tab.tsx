import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";

import BigThreeDots from "@/src/shared/icons/bit-three-dot-icon";
import BackArrowIcon from "@/src/shared/icons/back-arrow-icon";

import { useChatStore } from "../model/chat-store";
import { useNavigation } from "@react-navigation/native";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useChatOwnerData } from "../api/use-chat-owner-data";
import { useChatTitle } from "../api/use-chat-title";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";

import user_image from "../../../images/user_image.png";
import chat_image from "../../../images/chat.png";

import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper";

import { ChatSettingsModal } from "./chat-settings-modal";
import { ChatUserSettingsModal } from "./chat-user-settings-modal";
import { ChatViolationModal } from "./chat-violation-modal";
import { ChatApplicationModal } from "./chat-application-modal";
import { useEffect } from "react";

interface IChatTabProps {
  isGlobal?: boolean;
}

export const ChatTab = ({ isGlobal }: IChatTabProps) => {
  const navigation = useNavigation();

  const avatar = useChatStore((state) => state.avatar);
  const name = useChatStore((state) => state.name);
  const members = useChatStore((state) => state.members);
  const onlineAmount = useChatStore((state) => state.onlineAmount);
  const status = useChatStore((state) => state.status);
  const currentChatId = useChatStore((state) => state.currentChatId);

  const { id: currentUserId } = useAuthStore();

  const { data: ownerData } = useChatOwnerData(currentChatId || undefined);
  const { data: chatTitleData } = useChatTitle(
    isGlobal ? currentChatId || undefined : undefined
  );

  const isOwner = ownerData?.owner?.id === currentUserId;

  const { open } = useVisibleStore("globalChatSettings");
  const { open: openUserSettings } = useVisibleStore("userChatSettings");

  useEffect(() => {
    console.log(chatTitleData);
  }, [chatTitleData]);

  return (
    <View
      className={`${
        isGlobal ? "w-[95%]" : "w-[90%]"
      } flex flex-row justify-between relative ml-auto pr-8 items-center h-[54px] mb-8 mt-10`}
    >
      <View className="flex flex-row h-full items-center">
        {isGlobal && (
          <Button className="mr-3" onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Button>
        )}
        <Image
          source={avatar === null ? user_image : avatar}
          className="w-[54px] h-full rounded-full"
        />
        <View className="flex flex-col justify-between ml-7">
          <Text weight="regular" className="text-white text-[17.4px]">
            {isGlobal && chatTitleData?.title
              ? chatTitleData.title
              : name === ""
              ? "User Name"
              : name}
          </Text>
          {isGlobal ? (
            <Text weight="regular" className="text-[#8E8E8E] text-[14px]">
              {members} members, {onlineAmount} messages
            </Text>
          ) : (
            <Text
              weight="regular"
              className={`${
                status === "Online" ? "text-[#31A6FF]" : "text-[#656565]"
              } text-[14px]`}
            >
              {status}
            </Text>
          )}
        </View>
      </View>
      <Button
        onPress={() => {
          if (isOwner) {
            open();
          } else {
            openUserSettings();
          }
        }}
      >
        <BigThreeDots />
      </Button>
      <ModalWrapper
        storeKey="globalChatSettings"
        isMini
        className="w-[90%] absolute top-48"
      >
        <ChatSettingsModal />
      </ModalWrapper>
      <ModalWrapper
        storeKey="userChatSettings"
        isMini
        className="w-[347px] absolute top-48 right-4"
      >
        <ChatUserSettingsModal />
      </ModalWrapper>
      <ModalWrapper
        storeKey="chatViolations"
        isMini
        className="w-[90%] absolute top-48"
      >
        <ChatViolationModal />
      </ModalWrapper>
      <ModalWrapper
        storeKey="chatApplications"
        isMini
        className="w-[90%] absolute top-48"
      >
        <ChatApplicationModal />
      </ModalWrapper>
    </View>
  );
};
