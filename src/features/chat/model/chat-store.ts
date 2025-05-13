import { create } from "zustand";
import { socket } from "../api/socket";
import user_image from "@/src/images/user_image.png";
import { getChatMessages, getChatMetadata } from "../api/chat-api";

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
    isChatMetadataLoaded: boolean;
    messages: Message[];
    currentChatId: string | null;
    currentUserId: string | null;
    avatar: any;
    status: Status;
    name: string;
    members: number;
    onlineAmount: number;
    connect: (chatId: string, userId: string, isGroup?: boolean) => void;
    disconnect: () => void;
    getStatuses: (userIds: string[]) => void;
    setMetadataLoaded: (val: boolean) => void;
    sendMessage: (
        text: string,
        chatId: string,
        userId: string,
        receiverId?: string
    ) => void;
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
    events.forEach((event) => socket.off(event));
};

export const useChatStore = create<IChatStore>((set, get) => ({
    messages: [],
    currentChatId: null,
    currentUserId: null,
    avatar: user_image,
    status: "Offline",
    name: "Jack Jallenhell",
    members: 0,
    onlineAmount: 0,
    isChatMetadataLoaded: false,

    connect: (chatId, userId, isGroup = false) => {
        unsubscribeSocketEvents();
        console.log("[connect] Joining room:", chatId);

        set({ isChatMetadataLoaded: false });

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
                    date: new Date(msg.sentAt || Date.now()).toLocaleTimeString().slice(0, 5),
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
            if (msg.chatId !== get().currentChatId) return;

            const newMsg: Message = {
                id: msg.id || `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                text: msg.text,
                date: new Date(msg.sentAt || Date.now()).toLocaleTimeString().slice(0, 5),
                isMy: msg.user?.id === userId,
                sentAt: msg.sentAt || Date.now(),
                userId: msg.userId,
                chatId: msg.chatId,
            };

            set((state) => {
                const exists = state.messages.some(
                    (m) =>
                        m.text === newMsg.text &&
                        m.userId === newMsg.userId &&
                        Math.abs((m.sentAt || 0) - (newMsg.sentAt || 0)) < 1000
                );
                if (exists) return state;
                return { messages: [...state.messages, newMsg] };
            });
        });

        socket.on("newGroupMessage", (msg) => {
            if (msg.chatId !== get().currentChatId) return;

            const newMsg: Message = {
                id: msg.id || `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                text: msg.text,
                date: new Date(msg.sentAt || Date.now()).toLocaleTimeString().slice(0, 5),
                isMy: msg.user?.id === userId,
                sentAt: msg.sentAt || Date.now(),
                userId: msg.userId,
                chatId: msg.chatId,
            };

            if (!socket.connected) {
                socket.connect();
                socket.once("connect", () => {
                    socket.emit("joinRoom", chatId);
                });
                return;
            }

            set((state) => {
                const exists = state.messages.some(
                    (m) =>
                        m.text === newMsg.text &&
                        m.userId === newMsg.userId &&
                        Math.abs((m.sentAt || 0) - (newMsg.sentAt || 0)) < 1000
                );
                if (exists) return state;
                return { messages: [...state.messages, newMsg] };
            });
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

                console.log("[chatMetadata] Received from socket:", metadata);
                set({
                    members: metadata.members,
                    onlineAmount: metadata.amount,
                    isChatMetadataLoaded: true,
                });
            });
        }
    },

    disconnect: () => {
        const { currentChatId, currentUserId } = get();

        unsubscribeSocketEvents();

        if (currentChatId && currentUserId) {
            socket.emit("leaveRoom", currentChatId);
            socket.emit("setUserStatus", { userId: currentUserId, status: "online" });
        }

        set({
            status: "Offline",
            messages: [],
            currentChatId: null,
            currentUserId: null,
            isChatMetadataLoaded: false,
        });
    },

    getStatuses: (userIds) => {
        console.log("[getStatuses] Requesting:", userIds);
        socket.emit("getUserStatus", userIds);

        socket.once("userStatuses", (statuses) => {
            const currentUserId = get().currentUserId;
            const selfStatus = statuses.find((u: any) => u.userId === currentUserId);
            if (selfStatus) {
                set({ status: selfStatus.status === "online" ? "Online" : "Offline" });
            }
        });
    },

    sendMessage: (text, chatId, userId, receiverId) => {
        if (!text.trim() || isWaitingToSend) return;
        isWaitingToSend = true;
        setTimeout(() => (isWaitingToSend = false), 500);

        if (!socket.connected) {
            socket.connect();
            socket.once("connect", () => {
                socket.emit("joinRoom", chatId);
                socket.emit("sendMessage", { text, chatId, userId, ownerId: userId, receiverId });
            });
            return;
        }

        socket.emit("sendMessage", { text, chatId, userId, ownerId: userId, receiverId });
    },

    sendGroupMessage: (text, chatId, userId) => {
        if (!text.trim() || isWaitingToSend) return;
        isWaitingToSend = true;
        setTimeout(() => (isWaitingToSend = false), 500);

        if (!socket.connected) {
            socket.connect();
            socket.once("connect", () => {
                socket.emit("joinRoom", chatId);
            });
            return;
        }

        socket.emit("sendGroupMessage", { text, chatId, userId });
    },

    setAvatar: (avatar) => set({ avatar }),
    setName: (name) => set({ name }),
    setStatus: (status) => set({ status }),
    setMetadataLoaded: (val: boolean) => set({ isChatMetadataLoaded: val }),
}));