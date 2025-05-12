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
    messages: Message[];
    currentChatId: string | null;
    currentUserId: string | null;
    avatar: any;
    status: Status;
    name: string;
    members: number;
    onlineAmount: number;
    connect: (chatId: string, userId: string) => void;
    disconnect: () => void;
    getStatuses: (userIds: string[]) => void;
    sendMessage: (
        text: string,
        chatId: string,
        userId: string,
        receiverId?: string
    ) => void;
    /**
     * Send a message to a chat.
     * @param text The message text.
     * @param chatId The chat ID.
     * @param userId The user ID.
     * @param receiverId The receiver ID. If not provided, the message is sent to the current chat.
     */
    _sendMessageImpl: (
        text: string,
        chatId: string,
        userId: string,
        receiverId?: string
    ) => void;
    /**
     * Send a message to a group chat.
     * @param text The message text.
     * @param chatId The group chat ID.
     * @param userId The user ID.
     */
    sendGroupMessage: (
        text: string,
        chatId: string,
        userId: string
    ) => void;
    setStatus: (status: Status) => void;
    setName: (name: string) => void;
    setAvatar: (avatar: any) => void;
}

let isWaitingToSend = false;

export const useChatStore = create<IChatStore>((set, get) => ({
    messages: [],
    currentChatId: null,
    currentUserId: null,
    avatar: user_image,
    status: "Offline",
    name: "Jack Jallenhell",
    members: 0,
    onlineAmount: 0,

    connect: (chatId, userId) => {
        console.log("[connect] Joining room:", chatId);
        socket.off("connect");
        socket.off("disconnect");
        socket.off("newMessage");
        socket.off("userStatusChanged");
        socket.off("userStatuses");
        socket.off("messageHistory");

        const isNewChat = get().currentChatId !== chatId;
        if (isNewChat) {
            set({ messages: [] });
        }

        set({ currentChatId: chatId, currentUserId: userId });

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("joinRoom", chatId);
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
                }));

                formattedMessages.sort((a, b) => (a.sentAt || 0) - (b.sentAt || 0));
                set({ messages: formattedMessages });
            } catch (err) {
                console.error("[fetchMessages] error:", err);
                socket.emit("getMessageHistory", { chatId });
            }
        };

        fetchMessages();


        socket.on("newMessage", (msg) => {
            if (msg.chatId && msg.chatId !== get().currentChatId) return;

            const newMsg: Message = {
                id: msg.id || `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                text: msg.text,
                date: new Date(msg.sentAt || Date.now()).toLocaleTimeString().slice(0, 5),
                isMy: msg.userId === userId,
                sentAt: msg.sentAt || Date.now(),
                userId: msg.userId,
                chatId: msg.chatId || get().currentChatId,
            };

            set((state) => {
                const existingIndex = state.messages.findIndex(
                    (m) =>
                        m.text === newMsg.text &&
                        m.userId === newMsg.userId &&
                        Math.abs((m.sentAt || 0) - (newMsg.sentAt || 0)) < 5000
                );

                if (existingIndex !== -1) {
                    const updated = [...state.messages];
                    updated[existingIndex] = newMsg;
                    return { messages: updated };
                }

                return {
                    messages: [...state.messages, newMsg],
                };
            });
        });

        // Listen for group messages
        socket.on("newGroupMessage", (msg) => {
            if (msg.chatId && msg.chatId !== get().currentChatId) return;

            const newMsg: Message = {
                id: msg.id || `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                text: msg.text,
                date: new Date(msg.sentAt || Date.now()).toLocaleTimeString().slice(0, 5),
                isMy: msg.userId === userId,
                sentAt: msg.sentAt || Date.now(),
                userId: msg.userId,
                chatId: msg.chatId || get().currentChatId,
            };

            set((state) => {
                const existingIndex = state.messages.findIndex(
                    (m) =>
                        m.text === newMsg.text &&
                        m.userId === newMsg.userId &&
                        Math.abs((m.sentAt || 0) - (newMsg.sentAt || 0)) < 5000
                );

                if (existingIndex !== -1) {
                    const updated = [...state.messages];
                    updated[existingIndex] = newMsg;
                    return { messages: updated };
                }

                return {
                    messages: [...state.messages, newMsg],
                };
            });
        });

        // Listen for chat metadata updates
        socket.on("chatMetadata", (metadata) => {
            if (metadata.chatId !== get().currentChatId) return;

            console.log("[chatMetadata] Received:", metadata);
            set({
                members: metadata.members,
                onlineAmount: metadata.amount
            });
        });
    },

    disconnect: () => {
        const { currentChatId, currentUserId } = get();
        if (!currentChatId || !currentUserId) return;

        socket.emit("leaveRoom", currentChatId);
        socket.emit("setUserStatus", { userId: currentUserId, status: "online" });

        socket.off("connect");
        socket.off("disconnect");
        socket.off("newMessage");
        socket.off("userStatusChanged");
        socket.off("userStatuses");
        socket.off("messageHistory");

        set({
            status: "Offline",
            messages: [],
            currentChatId: null,
            currentUserId: null,
        });
    },

    getStatuses: (userIds) => {
        console.log('[getStatuses] Requesting statuses for:', userIds);

        socket.emit("getUserStatus", userIds);

        // Тут добавляем слушателя
        socket.once("userStatuses", (statuses) => {
            console.log("[userStatuses] Received:", statuses);

            const currentUserId = get().currentUserId;

            //@ts-ignore
            const selfStatus = statuses.find((u) => u.userId === currentUserId);
            if (selfStatus) {
                set({
                    status: selfStatus.status === "online" ? "Online" : "Offline"
                });
            }

        });
    },

    _sendMessageImpl: (text, chatId, userId, receiverId) => {


        socket.emit("sendMessage", {
            text,
            chatId,
            userId,
            ownerId: userId,
            receiverId,
        });
    },

    sendMessage: (text, chatId, userId, receiverId) => {
        if (!text.trim()) return;
        if (!socket.connected) {
            if (isWaitingToSend) return;
            isWaitingToSend = true;

            socket.connect();
            socket.once("connect", () => {
                socket.emit("joinRoom", chatId);
                get()._sendMessageImpl(text, chatId, userId, receiverId);
                isWaitingToSend = false;
            });
            return;
        }

        get()._sendMessageImpl(text, chatId, userId, receiverId);
    },

    sendGroupMessage: (text, chatId, userId) => {
        if (!text.trim()) return;
        if (!socket.connected) {
            if (isWaitingToSend) return;
            isWaitingToSend = true;

            socket.connect();
            socket.once("connect", () => {
                socket.emit("joinRoom", chatId);
                socket.emit("sendGroupMessage", {
                    text,
                    chatId,
                    userId
                });
                isWaitingToSend = false;
            });
            return;
        }

        socket.emit("sendGroupMessage", {
            text,
            chatId,
            userId
        });
    },

    setAvatar: (avatar) => set({ avatar }),
    setName: (name) => set({ name }),
    setStatus: (status) => set({ status }),
}));