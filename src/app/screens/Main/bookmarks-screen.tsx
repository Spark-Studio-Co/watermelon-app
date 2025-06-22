import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/main-layout";
import { ScrollView, View } from "react-native";
import { SavedPointTab } from "@/src/features/bookmarks/ui/saved-point-tab";

import { useActiveStore } from "@/src/shared/model/use-active-store";
import { useNavigation } from "@react-navigation/native";
import { useFavoritesData } from "@/src/entities/markers/api/use-favorites-data";
import { useFavoritesChats } from "@/src/features/chat/api/use-get-favorites";
import { useGetFriends } from "@/src/entities/friends/api/use-friends-data";
import { useIncomingFriendsData } from "@/src/entities/friends/api/use-incoming-friends-data";
import { useGetUsers } from "@/src/entities/users/api/use-get-users";
import { useChatStore } from "@/src/features/chat/model/chat-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import {
  useGetPrivateChat,
  useCreatePrivateChat,
} from "@/src/features/chat/api/use-get-private-chat";
import { FriendTab } from "@/src/features/friend-tab/ui/friend-tab";

import { IGetUsersRDO } from "@/src/entities/users/api/rdo/get-users.rdo";
import { useSendFriendRequest } from "@/src/entities/friends/api/use-send-friend-request";
import { useActiveFriendsStore } from "@/src/entities/friends/model/use-active-friends-store";

export const BookmarksScreen = () => {
  const { active } = useActiveStore("bookmarks", "Point");
  const { data: markers } = useFavoritesData();
  const { data: chats } = useFavoritesChats();
  const navigation = useNavigation();
  const { setActive, active: activeFriends } = useActiveFriendsStore();
  const { mutate: sendFriendRequest } = useSendFriendRequest();
  const { setName, setAvatar } = useChatStore();
  const { data: friends } = useGetFriends();
  const { data: newFriends } = useGetUsers(undefined, true);
  const { data: me } = useGetMe();
  const { data: incomingFriends } = useIncomingFriendsData();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { refetch } = useGetUsers(selectedUserId || undefined);
  const getPrivateChat = useGetPrivateChat();
  const createPrivateChat = useCreatePrivateChat();

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

  const formattedFriends = Array.isArray(newFriends)
    ? newFriends.filter((friend: IGetUsersRDO) => friend.id !== me?.id)
    : [];

  return (
    <MainLayout isBookmarks>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "95%", margin: "auto" }}
      >
        {active === "Point" &&
          markers?.map((marker: any, index: number) => (
            <View key={index} className="mb-4">
              {marker.type !== "chat" && (
                <SavedPointTab
                  //@ts-ignore
                  onPress={() =>
                    navigation.navigate("PointBio" as never, {
                      id: marker?.id,
                      ownerId: marker?.ownerId,
                    })
                  }
                  image={marker.image}
                  type={marker.type}
                  name={marker.name ?? `Point #${marker?.map_id}`}
                  subscribers={marker?.favoriteCount}
                  views={marker.views ?? 0}
                />
              )}
            </View>
          ))}
        {active === "Chats" &&
          chats?.map((marker: any, index: number) => (
            <View key={index} className="mb-4">
              {marker.type === "chat" && (
                <SavedPointTab
                  //@ts-ignore
                  onPress={() =>
                    navigation.navigate("PointBio" as never, {
                      id: marker?.id,
                      ownerId: marker?.ownerId,
                    })
                  }
                  image={marker.image}
                  type={marker.type}
                  name={marker.name ?? `Point #${marker?.map_id}`}
                  subscribers={marker?.followersCount}
                  views={marker.views ?? 0}
                />
              )}
            </View>
          ))}
        {active === "Friends" && (
          <View className="mb-4">
            <View className="mb-4">
              {Array.isArray(friends) &&
                friends.map((friend: any) => (
                  <View key={`friend-${friend.id}`}>
                    <FriendTab
                      avatar={friend.avatar}
                      username={friend.name === "" ? "User Name" : friend.name}
                      nickname={
                        friend.username === ""
                          ? "@user_name"
                          : `@${friend.username}`
                      }
                      onPress={() => handleChatNavigate(friend.id)}
                      isPremium={friend.isPremium}
                    />
                  </View>
                ))}
            </View>

            {Array.isArray(formattedFriends) &&
              formattedFriends.map((friend: IGetUsersRDO) => (
                <View key={`formatted-${friend.id}`} className="mb-4">
                  <FriendTab
                    avatar={friend.avatar}
                    username={friend.name === "" ? "User Name" : friend.name}
                    nickname={
                      friend.username ? `@${friend.username}` : friend.email
                    }
                    isAddToFriends
                    onPress={() => handleSendRequest(friend.id)}
                    isAdded={!!activeFriends[friend.id]}
                    isPremium={friend.isPremium}
                  />
                </View>
              ))}

            {Array.isArray(incomingFriends) &&
              incomingFriends.map((friend: any) => (
                <View key={`incoming-${friend.id}`} className="mb-4">
                  <FriendTab
                    id={friend.id}
                    avatar={friend.requester.avatar}
                    username={friend.name === "" ? "User Name" : friend.name}
                    nickname={`@${friend.requester.username}`}
                    isIncoming
                    isPremium={friend.isPremium}
                  />
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </MainLayout>
  );
};
