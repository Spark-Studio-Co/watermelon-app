import React from "react";
import { View } from "react-native";
import { Button } from "@/src/shared/ui/button/button";
import Text from "@/src/shared/ui/text/text";

import CrossIcon from "@/src/shared/icons/cross-icon";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";

export const ChatViolationModel = () => {
  const { close } = useVisibleStore("chatViolations");
  const violations = [
    {
      title: "Комментарии...",
      onPress: () => {},
    },
    {
      title: "Ошибочная каттегория",
      onPress: () => {},
    },
    {
      title: "Нарушение правил",
      onPress: () => {},
    },
    {
      title: "Другое",
      onPress: () => {},
    },
  ];

  return (
    <View
      className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center justify-center relative"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <Text weight="regular" className="text-white text-[20px]">
        Сообщить о нарушении
      </Text>
      <Button className="absolute right-3 top-3" onPress={close}>
        <CrossIcon />
      </Button>
      <View className="flex flex-col w-[90%] gap-y-5 mt-8">
        {violations.map((violation, index) => (
          <Button key={index} onPress={violation.onPress}>
            <Text weight="regular" className="text-white text-[14px]">
              {violation.title}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};
