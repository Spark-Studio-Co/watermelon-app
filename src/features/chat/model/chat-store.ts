import { create } from "zustand";
import { socket } from "../api/socket";
import user_image from "@/src/images/user_image.png";
import { getChatMessages } from "../api/chat-api";

type Message = {
  id?: string;
  text: string;
  date: string;
  isMy: boolean;
  sentAt?: number;
  userId?: string;
  chatId?: string;
};

type Status = "Online" | "Offline";

interface IChatStore {
  // Chat state
  messages: Message[];
  currentChatId: string | null;
  currentUserId: string | null;

  // User info
  avatar: any;
  status: Status;
  name: string;
  members: number;
  onlineAmount: number;

  // Actions
  connect: (chatId: string, userId: string) => void;
  disconnect: () => void;
  getStatuses: (userIds: string[]) => void;
  sendMessage: (text: string, chatId: string, userId: string) => void;
  _sendMessageImpl: (text: string, chatId: string, userId: string) => void;

  // Setters
  setStatus: (status: Status) => void;
  setName: (name: string) => void;
  setAvatar: (avatar: any) => void;
  setMembers: (members: number) => void;
  setOnlineAmount: (amount: number) => void;
}

let isWaitingToSend = false;

export const useChatStore = create<IChatStore>((set, get) => ({
  // State
  messages: [],
  currentChatId: null,
  currentUserId: null,
  avatar: user_image,
  status: "Offline",
  name: "Jack Jallenhell",
  members: 0,
  onlineAmount: 0,

  // Connect to chat room
  connect: (chatId: string, userId: string) => {
    console.log("[connect] Joining room:", chatId);

    // Remove any existing listeners to prevent duplicates
    socket.off("connect");
    socket.off("disconnect");
    socket.off("newMessage");
    socket.off("userStatusChanged");
    socket.off("userStatuses");
    socket.off("messageHistory");

    // Clear messages only if connecting to a different chat
    const isNewChat = get().currentChatId !== chatId;
    if (isNewChat) {
      set({ messages: [] });
    }

    // Update store state
    set({
      currentChatId: chatId,
      currentUserId: userId,
    });

    // Connect socket if needed
    if (!socket.connected) {
      socket.connect();
    }

    // Join room and set status
    socket.emit("joinRoom", chatId);
    socket.emit("setUserStatus", { userId, status: "online" });
    console.log("[connect] Sent user status: online");

    // Fetch message history using REST API
    const fetchMessages = async () => {
      try {
        console.log("[fetchMessages] Requesting messages for chat:", chatId);
        const apiMessages = await getChatMessages(chatId);

        if (apiMessages.length > 0) {
          console.log(
            "[fetchMessages] Received:",
            apiMessages.length,
            "messages"
          );

          // Format messages
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
          }));

          // Sort by timestamp
          formattedMessages.sort((a, b) => (a.sentAt || 0) - (b.sentAt || 0));

          // Update messages in store, avoiding duplicates
          set((state) => {
            // If we're loading a new chat, replace all messages
            if (state.messages.length === 0) {
              return { messages: formattedMessages };
            }

            // Otherwise, merge with existing messages, avoiding duplicates
            const existingIds = new Set(state.messages.map((m) => m.id));
            const newMessages = formattedMessages.filter(
              (msg) => !existingIds.has(msg.id)
            );

            if (newMessages.length === 0) {
              return state; // No new messages to add
            }

            // Combine and sort all messages
            const allMessages = [...state.messages, ...newMessages];
            allMessages.sort((a, b) => (a.sentAt || 0) - (b.sentAt || 0));

            return { messages: allMessages };
          });
        } else {
          console.log("[fetchMessages] No messages found");
          // Fallback to socket if REST API returns no messages
          socket.emit("getMessageHistory", { chatId });
        }
      } catch (error) {
        console.error("[fetchMessages] Error:", error);
        // Fallback to socket if REST API fails
        socket.emit("getMessageHistory", { chatId });
      }
    };

    fetchMessages();

    // Handle reconnection
    socket.on("connect", () => {
      console.log("[socket.io] Connected:", socket.id);

      // Rejoin room and set status
      socket.emit("joinRoom", chatId);
      socket.emit("setUserStatus", { userId, status: "online" });

      // Fetch message history again on reconnect
      fetchMessages();
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("[socket.io] Disconnected");
    });

    // Handle new messages
    socket.on("newMessage", (msg) => {
      console.log("[newMessage received]", msg);

      // Ignore messages for other chats
      if (msg.chatId && msg.chatId !== get().currentChatId) {
        console.log("[newMessage] Message is for a different chat, ignoring");
        return;
      }

      // Ensure we have all required fields
      if (!msg.text) {
        console.warn("[newMessage] Received message without text, ignoring");
        return;
      }

      const newMsg: Message = {
        id:
          msg.id ||
          `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        text: msg.text,
        date: new Date(msg.sentAt || Date.now())
          .toLocaleTimeString()
          .slice(0, 5),
        isMy: msg.userId === userId,
        sentAt: msg.sentAt || Date.now(),
        userId: msg.userId,
        chatId: msg.chatId || get().currentChatId,
      };

      console.log("[newMessage] Processing message:", newMsg);

      // Add message to store, avoiding duplicates
      set((state) => {
        // Check for duplicates by ID
        if (newMsg.id && state.messages.some((m) => m.id === newMsg.id)) {
          console.log("[newMessage] Duplicate message ID detected, skipping");
          return state;
        }

        // Also check for potential duplicates by content and timestamp
        // This helps with messages that might have been added locally and then received from server
        const potentialDuplicates = state.messages.filter(
          (m) =>
            m.text === newMsg.text &&
            m.userId === newMsg.userId &&
            Math.abs((m.sentAt || 0) - (newMsg.sentAt || 0)) < 5000 // Within 5 seconds
        );

        if (potentialDuplicates.length > 0) {
          console.log(
            "[newMessage] Potential duplicate content detected, skipping"
          );
          return state;
        }

        console.log("[newMessage] Adding new message to state");
        return {
          messages: [...state.messages, newMsg],
        };
      });
    });

    // Handle status updates
    socket.on("userStatusChanged", ({ userId: updatedUser, status }) => {
      if (updatedUser === userId) {
        set({ status: status === "online" ? "Online" : "Offline" });
        console.log(`[userStatusChanged] Self status updated: ${status}`);
      } else {
        console.log(`[userStatusChanged] ${updatedUser} is now ${status}`);
      }
    });

    // Handle multiple user statuses
    socket.on("userStatuses", (statuses) => {
      console.log("[userStatuses]", statuses);

      // Count online users
      const onlineCount = statuses.filter(
        (s: any) => s.status === "online"
      ).length;
      set({ onlineAmount: onlineCount });

      // Update own status if present
      const selfStatus = statuses.find((s: any) => s.userId === userId);
      if (selfStatus) {
        set({ status: selfStatus.status === "online" ? "Online" : "Offline" });
      }
    });

    // Handle message history from socket
    socket.on("messageHistory", (history) => {
      console.log("[messageHistory] Received history via socket:", history);

      if (!Array.isArray(history) || history.length === 0) {
        console.log("[messageHistory] Empty or invalid history received");
        return;
      }

      // Format messages
      const formattedMessages = history.map((msg: any) => ({
        id:
          msg.id ||
          `hist-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        text: msg.text || "",
        date: new Date(msg.sentAt || Date.now())
          .toLocaleTimeString()
          .slice(0, 5),
        isMy: msg.userId === userId,
        sentAt: msg.sentAt || Date.now(),
        userId: msg.userId,
        chatId: msg.chatId || get().currentChatId,
      }));

      // Sort by timestamp
      formattedMessages.sort((a, b) => (a.sentAt || 0) - (b.sentAt || 0));

      // Update messages in store, avoiding duplicates
      set((state) => {
        const existingIds = new Set(state.messages.map((m) => m.id));
        const newMessages = formattedMessages.filter(
          (msg) => !existingIds.has(msg.id)
        );

        if (newMessages.length === 0) {
          console.log("[messageHistory] No new messages to add");
          return state;
        }

        console.log(
          "[messageHistory] Adding",
          newMessages.length,
          "new messages"
        );
        return {
          messages: [...state.messages, ...newMessages],
        };
      });
    });

    // Set initial status
    set({ status: "Online" });
  },

  // Disconnect from chat
  disconnect: () => {
    const { currentChatId, currentUserId } = get();

    if (!currentChatId || !currentUserId) {
      console.log("[disconnect] No active chat or user");
      return;
    }

    console.log("[disconnect] Leaving room:", currentChatId);

    // Leave room
    socket.emit("leaveRoom", currentChatId);
    socket.emit("setUserStatus", { userId: currentUserId, status: "offline" });

    // Remove all listeners
    socket.off("connect");
    socket.off("disconnect");
    socket.off("newMessage");
    socket.off("userStatusChanged");
    socket.off("userStatuses");
    socket.off("messageHistory");

    // Update store state
    set({
      status: "Offline",
      messages: [],
      currentChatId: null,
      currentUserId: null,
    });
  },

  // Get user statuses
  getStatuses: (userIds: string[]) => {
    console.log("[getStatuses] Requesting statuses for:", userIds);
    socket.emit("getUserStatus", userIds);
  },

  // Helper function to implement message sending
  _sendMessageImpl: (text: string, chatId: string, userId: string) => {
    // Create a temporary message object with a unique ID
    const tempId = `temp-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    const tempMessage: Message = {
      id: tempId,
      text,
      date: new Date().toLocaleTimeString().slice(0, 5),
      isMy: true,
      sentAt: Date.now(),
      userId,
      chatId,
    };

    // Add to local messages immediately for UI feedback
    set((state) => ({
      messages: [...state.messages, tempMessage],
    }));

    // Send via socket
    socket.emit(
      "sendMessage",
      {
        text,
        chatId,
        userId,
        tempId, // Include the temp ID to help with deduplication
      },
      (acknowledgement: any) => {
        // Handle acknowledgement if the server supports it
        if (acknowledgement && acknowledgement.success) {
          console.log(
            "[sendMessage] Message sent successfully:",
            acknowledgement
          );
        }
      }
    );
  },

  // Send message

  sendMessage: (text: string, chatId: string, userId: string) => {
    if (!text.trim()) return;

    console.log("[sendMessage] Sending message:", text);

    // Prevent multiple 'connect' handlers
    if (!socket.connected) {
      if (isWaitingToSend) return;
      isWaitingToSend = true;

      console.warn("[sendMessage] Socket is not connected! Reconnecting...");
      socket.connect();

      socket.once("connect", () => {
        console.log("[sendMessage] Socket reconnected, now sending message");
        socket.emit("joinRoom", chatId); // Rejoin room
        get()._sendMessageImpl(text, chatId, userId);
        isWaitingToSend = false;
      });

      return;
    }

    get()._sendMessageImpl(text, chatId, userId);
  },

  // Setters
  setAvatar: (avatar: any) => set({ avatar }),
  setName: (name: string) => set({ name }),
  setStatus: (status: Status) => set({ status }),
  setMembers: (members: number) => set({ members }),
  setOnlineAmount: (amount: number) => set({ onlineAmount: amount }),
}));
