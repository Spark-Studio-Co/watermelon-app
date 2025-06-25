import Text from "@/src/shared/ui/text/text";
import { View } from "react-native";
import { Button } from "@/src/shared/ui/button/button";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useNavigation } from "@react-navigation/native";
import { useTypePointStore } from "../model/type-point-store";

type PreviewConfirmationSheetProps = {
  isPrivate: boolean;
  coordinate: {
    latitude: number;
    longitude: number;
  } | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export const PreviewConfirmationSheet = ({
  isPrivate,
  coordinate,
  onConfirm,
  onCancel,
}: PreviewConfirmationSheetProps) => {
  const { close } = useVisibleStore("previewConfirmation");
  const { type } = useTypePointStore();

  const handleConfirm = () => {
    close();
    onConfirm();
  };

  const handleCancel = () => {
    close();
    onCancel();
  };

  const getPointTypeText = () => {
    switch (type) {
      case "premium":
        return "Premium";
      case "chat":
        return "Chat";
      case "standard":
        return "Standard";
      default:
        return isPrivate ? "Private" : "";
    }
  };

  return (
    <View className="flex items-center">
      <Text weight="medium" className="text-[#5C5B5B] text-[20px] mt-6 mb-4">
        Create New Point
      </Text>

      <View className="w-[90%] mb-4">
        <Text
          weight="regular"
          className="text-white text-[16px] mb-2 text-center"
        >
          {isPrivate
            ? "Create a private point at this location?"
            : `Create a ${getPointTypeText()} point at this location?`}
        </Text>

        {coordinate && (
          <Text
            weight="regular"
            className="text-[#817E7E] text-[14px] text-center mb-4"
          >
            Latitude: {coordinate.latitude.toFixed(6)}
            {"\n"}
            Longitude: {coordinate.longitude.toFixed(6)}
          </Text>
        )}
      </View>

      <View className="flex w-[90%] gap-y-3">
        <Button variant="blue" onPress={handleConfirm}>
          <Text weight="medium" className="text-white text-[18px]">
            Confirm
          </Text>
        </Button>

        <Button
          variant="custom"
          className="bg-[#343434] w-full flex items-center justify-center rounded-[10px] h-[54px] mb-10"
          onPress={handleCancel}
        >
          <Text weight="medium" className="text-white text-[18px]">
            Cancel
          </Text>
        </Button>
      </View>
    </View>
  );
};
