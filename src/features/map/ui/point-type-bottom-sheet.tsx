import Text from "@/src/shared/ui/text/text";
import { View } from "react-native";
import { Button } from "@/src/shared/ui/button/button";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useNavigation } from "@react-navigation/native";

import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useEffect } from "react";

type PointTypeContentProps = {
  isPrivateView: boolean;
  isPremium?: boolean;
  longPressCoordinate: {
    latitude: number;
    longitude: number;
  } | null;
};

export const PointTypeContent = ({
  isPrivateView,
  isPremium,
  longPressCoordinate,
}: PointTypeContentProps) => {
  const navigation = useNavigation();
  const { open } = useVisibleStore("bet");
  const { close } = useVisibleStore("pointType");

  const { setLatitude, setLongitude, setType } = useMarkerStore();

  useEffect(() => {
    if (longPressCoordinate) {
      setLatitude(longPressCoordinate.latitude);
      setLongitude(longPressCoordinate.longitude);
    }
  }, [longPressCoordinate]);

  const buttons = [
    {
      title: "Создать Premium",
      borderColor: "#A009CD",
      pointType: "premium",
      isPremium: !isPremium,
    },
    {
      title: "Создать Chat",
      borderColor: "#93E0FF",
      pointType: "chat",
    },
    {
      title: "Создать Standard",
      borderColor: "#343434",
      pointType: "standard",
    },
  ];

  const handleSetType = (pointType: string) => {
    setType(pointType);
    setTimeout(() => close(), 500);

    if (!isPrivateView) {
      setTimeout(() => {
        //@ts-ignore
        navigation.navigate("PrivatePointCreation" as never);
      }, 1000);
    } else {
      setTimeout(() => open(), 1000);
    }
  };

  return (
    <View className="flex items-center h-[305px]">
      <Text weight="medium" className="text-[#5C5B5B] text-[20px] mt-6 mb-6">
        Создай новый Point
      </Text>
      <View className="flex w-[90%] gap-y-3">
        {buttons.map(({ title, borderColor, pointType, isPremium }) => (
          <Button
            key={title}
            variant="point-type"
            borderColor={borderColor}
            onPress={() => handleSetType(pointType)}
            disabled={isPremium && pointType === "premium"}
            className={`${
              isPremium && pointType === "premium"
                ? "opacity-50"
                : "opacity-100"
            }`}
          >
            <Text weight="medium" className="text-white text-[20px]">
              {title}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};
