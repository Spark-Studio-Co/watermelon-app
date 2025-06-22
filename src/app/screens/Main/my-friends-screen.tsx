import { Input } from "@/src/shared/ui/input/input";
import { MainLayout } from "../../layouts/main-layout";
import { View } from "react-native";
import { useState } from "react";
import { FriendTab } from "@/src/features/friend-tab/ui/friend-tab";

import { useIncomingFriendsData } from "@/src/entities/friends/api/use-incoming-friends-data";
import { useGetUsers } from "@/src/entities/users/api/use-get-users";
import { useNavigation } from "@react-navigation/native";
import { useChatStore } from "@/src/features/chat/model/chat-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import {
  useGetPrivateChat,
  useCreatePrivateChat,
} from "@/src/features/chat/api/use-get-private-chat";
import { useSendFriendRequest } from "@/src/entities/friends/api/use-send-friend-request";
import { useActiveFriendsStore } from "@/src/entities/friends/model/use-active-friends-store";

export const MyFriendsScreen = () => {
  const navigation = useNavigation();
  const { setName, setAvatar } = useChatStore();
  const { data: me } = useGetMe();
  const { data: incomingFriends } = useIncomingFriendsData();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { refetch, data: friends } = useGetUsers(selectedUserId || undefined);
  const getPrivateChat = useGetPrivateChat();
  const createPrivateChat = useCreatePrivateChat();
  const { setActive, active } = useActiveFriendsStore();
  const { mutate: sendFriendRequest } = useSendFriendRequest();

  const handleChatNavigate = async (id: string | null) => {
    if (!id || !me?.id) return;

    setSelectedUserId(id);

    const result = await refetch();
    const userData = result.data;

    if (!userData) return;

    // Set user info in chat store
    setName(userData.name ?? "User Name");
    setAvatar(userData.avatar);

    try {
      // First try to get an existing chat
      try {
        // Try to get or create the chat
        const chatResponse = await getPrivateChat.mutateAsync({
          userId: me.id,
          targetUserId: id,
        });

        // Ensure we have a valid chat ID
        if (!chatResponse || !chatResponse.chatId) {
          throw new Error("Invalid chat response: missing chat ID");
        }

        console.log("Got chat ID:", chatResponse.chatId);
        console.log("Participants:", chatResponse.participants);

        // Navigate to chat screen
        //@ts-ignore
        navigation.navigate(
          "PrivateChat" as never,
          {
            chatId: chatResponse.chatId,
            participants: chatResponse.participants,
            chatType: "private",
          } as never
        );

        // Connect to chat room after navigation has started
        setTimeout(() => {
          const { connect } = useChatStore.getState();
          connect(chatResponse.chatId, me.id);
        }, 100);
      } catch (getError: any) {
        // If we get a 500 error, the chat doesn't exist yet, so create it
        if (getError?.response?.status === 500) {
          console.log("Chat does not exist, creating new chat...");

          // Create a new chat
          const newChatResponse = await createPrivateChat.mutateAsync({
            userA: me.id,
            userB: id,
          });

          // Ensure we have a valid chat ID
          if (!newChatResponse || !newChatResponse.id) {
            throw new Error("Invalid chat creation response: missing chat ID");
          }

          console.log("Created new chat:", newChatResponse.id);

          // Extract participants from the response or use default
          const participants = newChatResponse.participants
            ? newChatResponse.participants.map((p) => p.userId)
            : [me.id, id];

          // Get the chat ID, ensuring it's a string
          const chatId = newChatResponse.id || newChatResponse.chatId || "";

          if (!chatId) {
            throw new Error("Missing chat ID in response");
          }

          // Navigate to chat screen
          //@ts-ignore
          navigation.navigate(
            "PrivateChat" as never,
            {
              chatId: chatId,
              participants: participants,
              chatType: "private",
            } as never
          );

          // Connect to chat room after navigation has started
          setTimeout(() => {
            const { connect } = useChatStore.getState();
            connect(chatId, me.id);
          }, 100);
        } else {
          // If it's another error, rethrow it
          throw getError;
        }
      }
    } catch (error) {
      console.error("Failed to handle chat navigation:", error);
    }
  };

  const handleSendRequest = (receiverId: string) => {
    setActive(receiverId, true);
    sendFriendRequest(receiverId);
  };

  const formattedFriends = Array.isArray(friends)
    ? friends.filter((friend: IGetUsersRDO) => friend.id !== me?.id)
    : [];

  return (
    <MainLayout isBack title="Мои друзья">
      <Input variant="search" className="mt-6" placeholder="Искать друзей..." />
      <View className="px-6 py-6 rounded-[15px] w-full mt-4">
        {Array.isArray(formattedFriends) &&
          formattedFriends?.map((friend: IGetUsersRDO, index: number) => (
            <View key={friend.id}>
              <FriendTab
                avatar={friend.avatar}
                username={friend.name === "" ? "User Name" : friend.name}
                nickname={
                  friend.username ? `@${friend.username}` : friend.email
                }
                isAddToFriends
                onPress={() => handleSendRequest(friend.id)}
                isAdded={!!active[friend.id]}
              />
              <View
                className={`bg-white w-full h-0.5 mt-6 mb-4 ${
                  index === formattedFriends.length - 1 && "hidden"
                }`}
              />
            </View>
          ))}
        {Array.isArray(incomingFriends) &&
          incomingFriends?.map((friend: any, index: number) => {
            return (
              <View key={index}>
                <FriendTab
                  id={friend.id}
                  avatar={friend.requester.avatar}
                  username={friend.name === "" ? "User Name" : friend.name}
                  nickname={`@${friend.requester.username}`}
                  isIncoming
                />
                <View
                  className={`bg-white w-full h-0.5 mt-6 mb-4 ${
                    index === friends?.length - 1 && "hidden"
                  }`}
                />
              </View>
            );
          })}
        {Array.isArray(friends) &&
          friends?.map((friend: any, index: number) => {
            return (
              <View key={index}>
                <FriendTab
                  avatar={friend.avatar}
                  username={friend.name === "" ? "User Name" : friend.name}
                  nickname={
                    friend.username === ""
                      ? "@user_name"
                      : `@${friend.username}`
                  }
                  onPress={() => handleChatNavigate(friend.id)}
                />
                <View
                  className={`bg-white w-full h-0.5 mt-6 mb-4 ${
                    index === friends.length - 1 && "hidden"
                  }`}
                />
              </View>
            );
          })}
      </View>
    </MainLayout>
  );
};
