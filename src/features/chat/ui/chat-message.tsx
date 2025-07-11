import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";

import MyPolygonIcon from "@/src/shared/icons/my-polygon-icon";
import ForeignPolygonIcon from "@/src/shared/icons/foreign-polygon-icon";
import fallback from "@/src/images/fallback.png";

interface IChatMessageProps {
  avatar?: string | any; // Can be a string URL or an imported image
  text: string;
  date: string;
  isMy?: boolean;
}

export const ChatMessage = ({
  avatar,
  text,
  date,
  isMy,
}: IChatMessageProps) => {
  // Handle different avatar types (URL string or imported image)
  const avatarSource =
    typeof avatar === "string" ? { uri: avatar } : avatar || fallback;

  return (
    <View
      className={`flex flex-row items-end gap-x-2 w-full ${
        isMy ? "justify-end" : "justify-start"
      }`}
    >
      {isMy ? (
        ""
      ) : (
        <Image
          source={avatarSource}
          className="w-[39px] h-[39px] rounded-full"
        />
      )}
      <View className="max-w-[70%]">
        <View
          className={`${
            isMy ? "bg-[#3D5DA1]" : "bg-[#484848]"
          } pl-[6px] pr-[8px] pt-[3px] pb-1 rounded-[4px] w-full`}
        >
          <Text weight="medium" className="text-white text-[14px]">
            {text}
          </Text>
          <View
            className={`${isMy ? "-right-2" : "-left-2"} absolute bottom-0`}
          >
            {isMy ? <MyPolygonIcon /> : <ForeignPolygonIcon />}
          </View>
        </View>
        <Text
          weight="regular"
          className={`text-[8px] text-white text-right absolute -bottom-5 ${
            isMy ? "left-1" : "right-1"
          }`}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};
