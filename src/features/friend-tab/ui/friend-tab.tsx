import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";

import { useFriendRequestAction } from "@/src/entities/friends/api/use-friend-request-action";
import { useQueryClient } from "@tanstack/react-query";

import { RequestAction } from "@/src/entities/friends/api/use-friend-request-action";

import AddIcon from "@/src/shared/icons/add-icon";
import UserMessageIcon from "@/src/shared/icons/user-message-icon";
import CheckMarkIcon from "@/src/shared/icons/check-mark-icon";
import CircleMinus from "@/src/shared/icons/circle-minus";
import CirclePlus from "@/src/shared/icons/circle-plus";
import fallback from "@/src/images/fallback.png";

interface IFriendTabProps {
  avatar: string | null;
  username: string;
  nickname: string;
  isAddToFriends?: boolean;
  onPress?: () => void;
  isAdded?: boolean;
  isIncoming?: boolean;
  id?: string | null | undefined;
  isPremium?: boolean;
}

export const FriendTab = ({
  avatar,
  username,
  nickname,
  onPress,
  isAddToFriends = false,
  isAdded = false,
  isIncoming = false,
  id,
  isPremium = false,
}: IFriendTabProps) => {
  const queryClient = useQueryClient();
  const { mutate: requestAction } = useFriendRequestAction();

  const fullAvatar = avatar
    ? avatar.startsWith("http")
      ? avatar
      : `https://${avatar}`
    : null;

  const handleRequestAction = (id: string, accept: RequestAction) => {
    requestAction(
      { id: id, accept: accept },
      {
        onSuccess: () => {
          const keysToInvalidate = [["myFriends"], ["friendsIncoming"]];

          keysToInvalidate.forEach((key) =>
            queryClient.invalidateQueries({ queryKey: key })
          );

          console.log("friend action is success");
        },
        onError: (error: any) => {
          console.log(error.response.data);
        },
      }
    );
  };

  return (
    <View
      className={`${
        isPremium && "border-[1px] border-[#C393FF]"
      } flex bg-[#262A34] rounded-[15.1px] h-[76.46564483642578px] flex-row justify-between w-full items-center px-6`}
    >
      <View className="flex flex-row items-center gap-x-4">
        <View style={{ height: 50, width: 50 }}>
          {fullAvatar ? (
            <Image
              className="w-full h-full rounded-full"
              source={{ uri: fullAvatar }}
            />
          ) : (
            <Image className="w-full h-full rounded-full" source={fallback} />
          )}
        </View>
        <View className="flex flex-col">
          <Text weight="regular" className="text-white text-[16px]">
            {username}
          </Text>
          <Text weight="regular" className="text-white text-[10px]">
            {nickname}
          </Text>
        </View>
      </View>
      {isIncoming ? (
        <View className="flex flex-row gap-x-2.5">
          <Button
            variant="custom"
            onPress={() => handleRequestAction(id as string, true)}
          >
            <CirclePlus />
          </Button>
          <Button
            variant="custom"
            onPress={() => handleRequestAction(id as string, false)}
          >
            <CircleMinus />
          </Button>
        </View>
      ) : isAdded ? (
        <CheckMarkIcon />
      ) : (
        <Button variant="custom" onPress={onPress}>
          {isAddToFriends ? <AddIcon /> : <UserMessageIcon />}
        </Button>
      )}
    </View>
  );
};
