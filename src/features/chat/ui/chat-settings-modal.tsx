import React from "react";
import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import CrossIcon from "@/src/shared/icons/cross-icon";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { ChatSettingsTab } from "./chat-settings-tab";

export const ChatSettingsModal = () => {
  const { close } = useVisibleStore("globalChatSettings");
  const { open } = useVisibleStore("chatApplications");

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
      onPress: () => {},
    },
  ];

  return (
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
      <Button className="w-[90%] mt-6 flex items-center justify-center">
        <Text weight="regular" className="text-white text-[20px]">
          Удалить чат
        </Text>
      </Button>
    </View>
  );
};
