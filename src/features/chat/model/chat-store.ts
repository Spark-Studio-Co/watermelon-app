import { create } from 'zustand';
import { socket } from '../api/socket';
import user_image from '@/src/images/user_image.png';

type Message = {
    text: string;
    date: string;
    isMy: boolean;
};

type Status = 'Online' | 'Offline';

interface IChatStore {
    messages: Message[];
    avatar: any;
    status: Status;
    name: string;
    members: number;
    onlineAmount: number;
    connect: (chatId: string, userId: string) => void;
    disconnect: (userId: string) => void;
    getStatuses: (userIds: string[]) => void;
    setStatus: (status: Status) => void;
    sendMessage: (text: string, chatId: string, userId: string) => void;
    setName: (name: string) => void;
    setAvatar: (avatar: any) => void;
    setMembers: (members: number) => void;
    setOnlineAmount: (amount: number) => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
    avatar: user_image,
    status: 'Offline',
    name: 'Jack Jallenhell',
    members: 0,
    onlineAmount: 0,
    messages: [],

    connect: (chatId, userId) => {
        console.log('[connect] Joining room:', chatId);
        socket.emit('joinRoom', chatId);
        socket.emit('setUserStatus', { userId, status: 'online' });
        console.log('[connect] Sent user status: online');

        socket.on('connect', () => {
            console.log('[socket.io] Connected:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('[socket.io] Disconnected');
        });

        socket.on('newMessage', (msg) => {
            console.log('[newMessage received]', msg);
            const date = new Date(msg.sentAt || Date.now()).toLocaleTimeString().slice(0, 5);
            const newMsg: Message = {
                text: msg.text,
                date,
                isMy: msg.userId === userId,
            };
            set((state) => ({
                messages: [...state.messages, newMsg],
            }));
        });

        socket.on('userStatusChanged', ({ userId: updatedUser, status }) => {
            if (updatedUser !== userId) {
                console.log(`[userStatusChanged] ${updatedUser} is now ${status}`);
            }
        });

        socket.on('userStatuses', (statuses) => {
            console.log('[userStatuses]', statuses);
            const onlineCount = statuses.filter((s: any) => s.status === 'online').length;
            set({ onlineAmount: onlineCount });
        });

        set({ status: 'Online' });
    },

    disconnect: (userId) => {
        console.log('[disconnect] Disconnecting user:', userId);
        socket.emit('setUserStatus', { userId, status: 'offline' });
        socket.disconnect();
        set({ status: 'Offline' });
    },

    getStatuses: (userIds) => {
        console.log('[getStatuses] Requesting statuses for:', userIds);
        socket.emit('getUserStatus', userIds);
    },

    sendMessage: (text, chatId, userId) => {
        console.log('[sendMessage] Sending:', { text, chatId, userId });
        socket.emit('sendMessage', {
            chatId,
            userId,
            text,
        });
    },

    setAvatar: (avatar) => set({ avatar }),
    setName: (name) => set({ name }),
    setStatus: (status) => set({ status }),
    setMembers: (members) => set({ members }),
    setOnlineAmount: (amount) => set({ onlineAmount: amount }),
}));