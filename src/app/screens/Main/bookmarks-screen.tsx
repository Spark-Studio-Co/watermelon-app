import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/main-layout";
import { ScrollView, View } from "react-native";
import { SavedPointTab } from "@/src/features/bookmarks/ui/saved-point-tab";
import { EnhancedSavedPointTab } from "@/src/features/bookmarks/ui/enhanced-saved-point-tab";
import { BookmarkTab } from "@/src/features/bookmarks/ui/bookmark-tab";

import { useActiveStore } from "@/src/shared/model/use-active-store";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useFavoritesData } from "@/src/entities/markers/api/use-favorites-data";
import { useFavoritesChats } from "@/src/features/chat/api/use-get-favorites";
import { useGetFriends } from "@/src/entities/friends/api/use-friends-data";
import { useIncomingFriendsData } from "@/src/entities/friends/api/use-incoming-friends-data";
import { useGetUsers } from "@/src/entities/users/api/use-get-users";
import { useChatStore } from "@/src/features/chat/model/chat-store";
import { useAddMarkerToFavorites } from "@/src/features/chat/api/use-add-marker-to-favorites";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import {
  useGetPrivateChat,
  useCreatePrivateChat,
} from "@/src/features/chat/api/use-get-private-chat";
import { FriendTab } from "@/src/features/friend-tab/ui/friend-tab";
import Text from "@/src/shared/ui/text/text";

import { IGetUsersRDO } from "@/src/entities/users/api/rdo/get-users.rdo";
import { useSendFriendRequest } from "@/src/entities/friends/api/use-send-friend-request";
import { useActiveFriendsStore } from "@/src/entities/friends/model/use-active-friends-store";
import { useSearchFriends } from "@/src/entities/users/api/use-search-friends";
import { useSearchPoints } from "@/src/entities/markers/api/use-search-points";
import { useSearchChats } from "@/src/features/chat/api/use-search-chats";
import { useBookmarksSearchStore } from "@/src/features/bookmarks/model/use-bookmarks-search-store";
import { useMyMarkersWithNewMessages } from "@/src/entities/markers/api/use-my-markers-with-new-messages";

export const BookmarksScreen = () => {
  const { active } = useActiveStore("bookmarks", "Point");
  const { data: markers } = useFavoritesData();
  const { data: chats, refetch: chatFavRefetch } = useFavoritesChats();
  const navigation = useNavigation();
  const { setActive, active: activeFriends } = useActiveFriendsStore();
  const { mutate: sendFriendRequest } = useSendFriendRequest();
  const { setName, setAvatar } = useChatStore();
  const addToFavorites = useAddMarkerToFavorites();
  const { data: friends } = useGetFriends();
  const {
    data: newFriends,
    isLoading: isLoadingNewFriends,
    error: newFriendsError,
  } = useGetUsers(undefined, true);

  // Debug logging
  const { data: me } = useGetMe();
  const { data: incomingFriends } = useIncomingFriendsData();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { refetch } = useGetUsers(selectedUserId || undefined);
  const getPrivateChat = useGetPrivateChat();
  const createPrivateChat = useCreatePrivateChat();

  const { search } = useBookmarksSearchStore();

  const { data: friendSearchResults } = useSearchFriends(search);
  const { data: pointSearchResults } = useSearchPoints(search);
  const { data: chatSearchResults } = useSearchChats(search);
  const {
    data: myMarkersWithNewMessages,
    refetch: refetchMyMarkersWithNewMessages,
  } = useMyMarkersWithNewMessages(active === "Chats" ? search : undefined);

  useEffect(() => {
    refetchMyMarkersWithNewMessages();
  }, []);

  // Refetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      chatFavRefetch();
      if (active === "Chats") {
        console.log("CHATS SUKA", chats);
        refetchMyMarkersWithNewMessages();
      }
      return () => {};
    }, [active])
  );

  // Refetch when "Chats" tab becomes active
  useEffect(() => {
    if (active === "Chats") {
      console.log("Chats tab activated - refetching markers with new messages");
      refetchMyMarkersWithNewMessages();
    }
  }, [active, refetchMyMarkersWithNewMessages]);

  // Debug logging for myMarkersWithNewMessages
  useEffect(() => {
    if (myMarkersWithNewMessages) {
      console.log("My markers with new messages:", myMarkersWithNewMessages);
    }
  }, [myMarkersWithNewMessages]);

  const handleChatNavigate = async (id: string | null) => {
    if (!id || !me?.id) return;

    setSelectedUserId(id);

    const result = await refetch();
    const userData = result.data;

    if (!userData) return;

    // Ensure userData is a single user object, not an array
    const user = Array.isArray(userData) ? userData[0] : userData;
    if (!user) return;

    // Set user info in chat store
    setName(user.name ?? "User Name");
    setAvatar(user.avatar);

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

        //@ts-ignore
        navigation.navigate(
          "PrivateChat" as never,
          {
            chatId: chatResponse.chatId,
            participants: chatResponse.participants,
            chatType: "private",
          } as never
        );

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

          setTimeout(() => {
            const { connect } = useChatStore.getState();
            connect(chatId, me.id);
          }, 100);
        } else {
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
    <MainLayout>
      <BookmarkTab />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "95%", margin: "auto" }}
      >
        {active === "Point" &&
          (search.length > 0 ? (
            Array.isArray(pointSearchResults) &&
            pointSearchResults.length > 0 ? (
              pointSearchResults.map((marker: any, index: number) => (
                <View key={`search-point-${index}`} className="mb-4">
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
              ))
            ) : (
              <Text
                weight="regular"
                className="text-white text-center text-[18px]"
                style={{ textAlign: "center" }}
              >
                Ничего не найдено
              </Text>
            )
          ) : (
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
            ))
          ))}
        {active === "Chats" && (
          <>
            {search.length > 0 ? (
              // When searching, show results or "nothing found"
              Array.isArray(myMarkersWithNewMessages) &&
              myMarkersWithNewMessages.length > 0 ? (
                myMarkersWithNewMessages.map((marker: any, index: number) => {
                  const totalNewMessages =
                    marker.chats?.reduce(
                      (total: number, chat: any) =>
                        total +
                        (chat.hasNewMessages ? chat.newMessagesCount || 1 : 0),
                      0
                    ) || 0;

                  return (
                    <View
                      key={`search-marker-${marker.id || index}`}
                      className="mb-4"
                    >
                      <EnhancedSavedPointTab
                        //@ts-ignore
                        onPress={() => {
                          const chatWithNewMessages = marker.chats?.find(
                            (chat: any) => chat.hasNewMessages
                          );
                          const targetChat =
                            chatWithNewMessages || marker.chats?.[0];

                          if (!targetChat?.id || !me?.id) return;

                          setName(
                            targetChat.title ||
                              marker.name ||
                              `Point #${marker.id}`
                          );
                          setAvatar(marker.image ?? null);

                          useChatStore
                            .getState()
                            .connect(targetChat.id, me.id, true);

                          //@ts-ignore
                          navigation.navigate("PrivateChat", {
                            chatId: targetChat.id,
                            participants: [me.id, marker.ownerId],
                            chatType: "private",
                          });
                        }}
                        image={marker.image}
                        type={marker.type || "premium"}
                        name={marker.name || `Point #${marker.id}`}
                        newMessagesCount={totalNewMessages}
                        subscribers={marker.favoriteCount}
                        views={marker.views}
                      />
                    </View>
                  );
                })
              ) : (
                <Text
                  weight="regular"
                  className="text-white text-center text-[18px]"
                  style={{ textAlign: "center" }}
                >
                  Ничего не найдено
                </Text>
              )
            ) : (
              // When not searching, show all markers with new messages
              <>
                {Array.isArray(myMarkersWithNewMessages) &&
                  myMarkersWithNewMessages.length > 0 && (
                    <View className="mb-4">
                      <Text
                        weight="medium"
                        className="text-white text-[18px] mb-3"
                      >
                        Point messages
                      </Text>
                    </View>
                  )}
                {Array.isArray(myMarkersWithNewMessages) &&
                  myMarkersWithNewMessages.map((marker: any, index: number) => {
                    const totalNewMessages =
                      marker.chats?.reduce(
                        (total: number, chat: any) =>
                          total +
                          (chat.hasNewMessages
                            ? chat.newMessagesCount || 1
                            : 0),
                        0
                      ) || 0;

                    return (
                      <View
                        key={`my-marker-${marker.id || index}`}
                        className="mb-4"
                      >
                        <EnhancedSavedPointTab
                          //@ts-ignore
                          onPress={() => {
                            const chatWithNewMessages = marker.chats?.find(
                              (chat: any) => chat.hasNewMessages
                            );
                            const targetChat =
                              chatWithNewMessages || marker.chats?.[0];

                            if (!targetChat?.id || !me?.id) return;

                            setName(
                              targetChat.title ||
                                marker.name ||
                                `Point #${marker.id}`
                            );
                            setAvatar(marker.image ?? null);

                            useChatStore
                              .getState()
                              .connect(targetChat.id, me.id, true);

                            //@ts-ignore
                            navigation.navigate("PrivateChat", {
                              chatId: targetChat.id,
                              participants: [me.id, marker.ownerId],
                              chatType: "private",
                            });
                          }}
                          image={marker.image}
                          type={marker.type || "premium"}
                          name={marker.name || `Point #${marker.id}`}
                          newMessagesCount={totalNewMessages}
                          subscribers={marker.favoriteCount}
                          views={marker.views}
                        />
                      </View>
                    );
                  })}
              </>
            )}
          </>
        )}
        {active === "Friends" && (
          <View className="mb-4">
            {search.length > 0 ? (
              Array.isArray(friendSearchResults) &&
              friendSearchResults.length > 0 ? (
                // Sort the search results to show premium users first
                [...friendSearchResults]
                  .sort((a, b) => {
                    // Sort by premium status (premium first)
                    if (a.isPremium && !b.isPremium) return -1;
                    if (!a.isPremium && b.isPremium) return 1;
                    return 0;
                  })
                  .map((friend: any) => (
                    <View key={`search-${friend.id}`} className="mb-4">
                      <FriendTab
                        avatar={friend.avatar}
                        username={friend.name || "User Name"}
                        nickname={
                          friend.username ? `@${friend.username}` : friend.email
                        }
                        onPress={() => {
                          handleSendRequest(friend.id);
                        }}
                        isPremium={friend.isPremium}
                        isAddToFriends
                        isAdded={!!activeFriends[friend.id]}
                      />
                    </View>
                  ))
              ) : (
                <Text
                  weight="regular"
                  className="text-white text-center text-[18px]"
                  style={{ textAlign: "center" }}
                >
                  Ничего не найдено
                </Text>
              )
            ) : (
              <>
                {Array.isArray(incomingFriends) &&
                  incomingFriends.map((friend: any) => (
                    <View key={`incoming-${friend.id}`} className="mb-4">
                      <FriendTab
                        id={friend.id}
                        avatar={friend.requester.avatar}
                        username={friend.name || "User Name"}
                        nickname={`@${friend.requester.username}`}
                        isPremium={friend.isPremium}
                        isIncoming
                      />
                    </View>
                  ))}
                {Array.isArray(friends) &&
                  friends.map((friend: any) => (
                    <View key={`friend-${friend.id}`} className="mb-4">
                      <FriendTab
                        avatar={friend.avatar}
                        username={friend.name || "User Name"}
                        nickname={
                          friend.username ? `@${friend.username}` : "@user_name"
                        }
                        onPress={() => handleChatNavigate(friend.id)}
                        isPremium={friend.isPremium}
                      />
                    </View>
                  ))}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </MainLayout>
  );
};
