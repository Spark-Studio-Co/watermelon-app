import { create } from "zustand";
import { socket } from "../api/socket";
import fallback from "@/src/images/fallback.png";
import { getChatMessages, getChatMetadata } from "../api/chat-api";
import uuid from "react-native-uuid";

type Message = {
  id?: string;
  text: string;
  date: string;
  isMy: boolean;
  sentAt?: number;
  userId?: string;
  chatId?: string;
  avatar?: string; // Add avatar field to store user avatar URL
};

type Status = "Online" | "Offline";

interface IChatStore {
  isChatMetadataLoaded: boolean;
  messages: Message[];
  currentChatId: string | null;
  currentUserId: string | null;
  currentChatMarkerId: string | null; // Added for chat applications
  avatar: any;
  status: Status;
  name: string;
  members: number;
  onlineAmount: number;
  participants: string[];
  joinedRooms: Set<string>;
  connect: (
    chatId: string,
    userId: string,
    isGroup?: boolean,
    markerId?: string
  ) => void;
  disconnect: () => void;
  getStatuses: (userIds: string[]) => void;
  setMetadataLoaded: (val: boolean) => void;
  sendMessage: (
    text: string,
    chatId: string,
    userId: string,
    receiverId?: string
  ) => void;
  sendGroupMessage: (text: string, chatId: string, userId: string) => void;
  setStatus: (status: Status) => void;
  setName: (name: string) => void;
  setAvatar: (avatar: any) => void;
  setParticipants: (participants: string[]) => void;
  setCurrentChatMarkerId: (markerId: string | null) => void;
}

const lastEmittedMessages = new Map<string, number>();

// Generate a new messageId for each message instead of reusing one

const canEmit = (key: string): boolean => {
  const now = Date.now();
  const last = lastEmittedMessages.get(key);
  if (last && now - last < 10000) return false;
  lastEmittedMessages.set(key, now);
  return true;
};

const ensureJoinedRoom = (
  chatId: string,
  userId: string,
  isCreator = false
) => {
  const { joinedRooms } = useChatStore.getState();

  if (!joinedRooms.has(chatId)) {
    console.log("[ensureJoinedRoom] Joining socket room:", chatId);
    socket.emit("joinRoom", {
      chatId,
      userId,
      isCreator,
    });
    useChatStore.setState((state) => ({
      joinedRooms: new Set([...state.joinedRooms, chatId]),
    }));
  }
};

const unsubscribeSocketEvents = () => {
  const events = [
    "connect",
    "disconnect",
    "newMessage",
    "newGroupMessage",
    "userStatusChanged",
    "userStatuses",
    "messageHistory",
    "chatMetadata",
  ];
  events.forEach((event) => {
    socket.off(event);
    console.log("[unsubscribeSocketEvents] Off:", event);
  });
  socket.offAny(); // ❗ убираем все debug-подписки тоже
};

// Helper function to log socket events for debugging
const setupDebugListeners = () => {
  socket.onAny((event, ...args) => {
    console.log(`[Socket Debug] Event: ${event}`, args);
  });
};

const handleNewMessage =
  (userId: string, get: () => IChatStore, set: (fn: any) => void) =>
  (msg: any) => {
    console.log("[handleNewMessage] Получено сообщение от сокета:", msg);

    if (msg.chatId !== get().currentChatId) {
      console.log(
        "[handleNewMessage] chatId не совпадает:",
        msg.chatId,
        "!==",
        get().currentChatId
      );
      return;
    }

    const newMsg: Message = {
      id: msg.id,
      text: msg.text,
      date: new Date(msg.sentAt || Date.now()).toLocaleTimeString().slice(0, 5),
      isMy: msg.user?.id === userId,
      sentAt: msg.sentAt || Date.now(),
      userId: msg.userId,
      chatId: msg.chatId,
      avatar: msg.user?.avatar || undefined, // Extract avatar URL if available
    };

    set((state: IChatStore) => {
      const exists = state.messages.some((m) => m.id === newMsg.id);

      if (exists) {
        console.log("[handleNewMessage] Сообщение уже существует, пропущено");
        return state;
      }

      console.log("[handleNewMessage] Добавляем новое сообщение:", newMsg);
      return { messages: [...state.messages, newMsg] };
    });
  };

export const useChatStore = create<IChatStore>((set, get) => ({
  messages: [],
  currentChatId: null,
  currentUserId: null,
  currentChatMarkerId: null,
  avatar: fallback,
  status: "Offline",
  name: "Jack Jallenhell",
  members: 0,
  onlineAmount: 0,
  participants: [],
  joinedRooms: new Set<string>(),
  isChatMetadataLoaded: false,

  connect: (chatId, userId, isGroup = false, markerId = "") => {
    const { joinedRooms } = get();

    if (get().currentChatId === chatId && joinedRooms.has(chatId)) {
      console.log("[connect] Already connected to room:", chatId);
      return;
    }

    unsubscribeSocketEvents();
    setupDebugListeners();
    console.log("[connect] Joining room:", chatId);

    set({ isChatMetadataLoaded: false });

    const isNewChat = get().currentChatId !== chatId;
    if (isNewChat) set({ messages: [] });

    const currentParticipants =
      get().participants.length > 0
        ? get().participants
        : isGroup
        ? []
        : [userId];

    set({
      currentChatId: chatId,
      currentUserId: userId,
      currentChatMarkerId: markerId,
      participants: currentParticipants,
    });

    if (!socket.connected) {
      socket.connect();
    }

    if (!joinedRooms.has(chatId)) {
      socket.emit("joinRoom", {
        chatId,
        userId, // 👈 обязательно!
        isCreator: false, // или true при создании
      });
      joinedRooms.add(chatId);
      set({ joinedRooms });
    }

    socket.emit("setUserStatus", { userId, status: "online" });

    const fetchMessages = async () => {
      try {
        const apiMessages = await getChatMessages(chatId);
        const formattedMessages = apiMessages.map((msg) => ({
          id: msg.id,
          text: msg.text,
          date: new Date(msg.sentAt || Date.now())
            .toLocaleTimeString()
            .slice(0, 5),
          isMy: msg.user.id === userId,
          sentAt: msg.sentAt,
          userId: msg.user.id,
          chatId: msg.chatId,
          avatar: msg.user.avatar || undefined, // Extract avatar URL from API response
        }));

        formattedMessages.sort((a, b) => (a.sentAt || 0) - (b.sentAt || 0));
        set({ messages: formattedMessages });
      } catch (err) {
        console.error("[fetchMessages] error:", err);
      }
    };

    fetchMessages();

    const messageHandler = handleNewMessage(userId, get, set);

    socket.off("newMessage");
    socket.on("newMessage", messageHandler);

    socket.off("newGroupMessage");
    socket.on("newGroupMessage", messageHandler);

    socket.on("userStatusChanged", (data) => {
      const participants = get().participants;
      const currentUserId = get().currentUserId;
      if (data.userId !== currentUserId && participants.includes(data.userId)) {
        set({ status: data.status === "online" ? "Online" : "Offline" });
      }
    });

    if (isGroup) {
      const fetchChatMetadata = async () => {
        try {
          const metadata = await getChatMetadata(chatId);
          console.log("[fetchChatMetadata] API metadata:", metadata);
          set({
            members: metadata.members,
            onlineAmount: metadata.amount,
            isChatMetadataLoaded: true,
          });
        } catch (error) {
          console.error("[fetchChatMetadata] Error:", error);
        }
      };

      fetchChatMetadata();

      socket.on("chatMetadata", (metadata) => {
        if (metadata.chatId !== get().currentChatId) return;
        set({
          members: metadata.members,
          onlineAmount: metadata.amount,
          isChatMetadataLoaded: true,
        });
      });
    }
  },

  disconnect: () => {
    const { currentChatId, currentUserId, joinedRooms } = get();

    unsubscribeSocketEvents();

    if (currentChatId && currentUserId) {
      socket.emit("leaveRoom", currentChatId);
      socket.emit("setUserStatus", {
        userId: currentUserId,
        status: "offline",
      });
      joinedRooms.delete(currentChatId);
      set({ joinedRooms });
    }

    set({
      status: "Offline",
      messages: [],
      currentChatId: null,
      currentUserId: null,
      currentChatMarkerId: null,
      isChatMetadataLoaded: false,
    });
  },

  getStatuses: (userIds) => {
    console.log("[getStatuses] Requesting:", userIds);

    // Store participants for later reference
    set({ participants: userIds });

    // Remove any existing listeners to avoid duplicates
    socket.off("userStatuses");
    socket.off("userStatusChanged");

    // Send the user IDs as an array as expected by the server
    socket.emit("getUserStatus", userIds);

    // Listen for initial statuses
    socket.on("userStatuses", (statuses) => {
      console.log("[getStatuses] Received statuses:", statuses);
      const currentUserId = get().currentUserId;

      if (!currentUserId) {
        console.warn("[getStatuses] No current user ID");
        return;
      }

      // Find all participants who are not the current user
      const partners = statuses.filter((u: any) => u.userId !== currentUserId);

      if (partners.length > 0) {
        // Check if any partner is online
        const anyPartnerOnline = partners.some(
          (p: any) => p.status === "online"
        );
        console.log("[getStatuses] Any partner online:", anyPartnerOnline);
        set({ status: anyPartnerOnline ? "Online" : "Offline" });
      } else {
        console.warn("[getStatuses] No partners found in statuses:", statuses);
        set({ status: "Offline" });
      }
    });

    // Listen for status changes
    socket.on("userStatusChanged", (data) => {
      console.log("[userStatusChanged] Received update:", data);
      const currentUserId = get().currentUserId;
      const currentChatId = get().currentChatId;
      const participants = get().participants;

      // Only update if we're in a chat and the status is for a user we care about
      if (
        currentChatId &&
        participants.includes(data.userId) &&
        data.userId !== currentUserId
      ) {
        console.log(
          "[userStatusChanged] Updating partner status to:",
          data.status
        );
        set({ status: data.status === "online" ? "Online" : "Offline" });
      }
    });
  },

  setParticipants: (participants) => set({ participants }),

  sendMessage: (text, chatId, userId, receiverId) => {
    if (!text.trim()) return;

    ensureJoinedRoom(chatId, userId, false); // 👈 ВАЖНО

    const uniqueMessageId = uuid.v4() as string;
    const key = `${chatId}-${userId}-${text}-${uniqueMessageId}`;
    if (!canEmit(key)) return;

    const payload = {
      text,
      chatId,
      userId,
      ownerId: userId,
      receiverId,
      messageId: uniqueMessageId,
    };

    if (!socket.connected) {
      socket.connect();
      socket.once("connect", () => {
        ensureJoinedRoom(chatId, userId, false); // на всякий случай и здесь
        socket.emit("sendMessage", payload);
      });
      return;
    }

    socket.emit("sendMessage", payload);
  },

  sendGroupMessage: (text, chatId, userId) => {
    if (!text.trim()) return;

    ensureJoinedRoom(chatId, userId, false); // 👈 ДОБАВЛЕНО

    const uniqueMessageId = uuid.v4() as string;
    const key = `${chatId}-${userId}-${text}-${uniqueMessageId}`;
    if (!canEmit(key)) return;

    const payload = {
      text,
      chatId,
      userId,
      ownerId: userId,
      messageId: uniqueMessageId,
    };

    if (!socket.connected) {
      socket.connect();
      socket.once("connect", () => {
        ensureJoinedRoom(chatId, userId, false); // на всякий случай
        socket.emit("sendGroupMessage", payload);
      });
      return;
    }

    socket.emit("sendGroupMessage", payload);
  },

  setAvatar: (avatar) => set({ avatar }),
  setName: (name) => set({ name }),
  setStatus: (status) => set({ status }),
  setMetadataLoaded: (val: boolean) => set({ isChatMetadataLoaded: val }),
  setCurrentChatMarkerId: (markerId: string | null) =>
    set({ currentChatMarkerId: markerId }),
}));
