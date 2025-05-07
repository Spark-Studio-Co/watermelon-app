import { useEffect } from 'react';
import { MainLayout } from '../../layouts/main-layout';
import { View } from 'react-native';
import { ChatMessage } from '@/src/features/chat/ui/chat-message';
import { useChatStore } from '@/src/features/chat/model/chat-store';
import { useGetMe } from '@/src/entities/users/api/use-get-me';
import { useRoute } from '@react-navigation/native';

export const PrivateChatScreen = () => {
    const { data: me } = useGetMe();
    const userId = me?.id;
    const route = useRoute();

    const { chatId, participants, avatar, name } = route.params as {
        chatId: string;
        participants: string[];
        avatar: string;
        name: string;
    };

    const {
        messages,
        connect,
        disconnect,
        sendMessage,
        getStatuses,
        setAvatar,
        setName,
    } = useChatStore();

    useEffect(() => {
        console.log("messages", messages)
        if (avatar) setAvatar(avatar);
        if (name) setName(name);
    }, [avatar, name]);

    useEffect(() => {
        if (!userId || !chatId || !participants.length) return;

        connect(chatId, userId);
        getStatuses(participants);

        return () => disconnect(userId);
    }, [userId, chatId, participants]);

    if (!me) return null;

    return (
        <MainLayout
            isChat
            chatInputType="private"
            onSend={(text) => sendMessage(text, chatId, userId ?? '')}
        >
            {messages.map((message, index) => (
                <View className="flex flex-col mb-10" key={index}>
                    <ChatMessage
                        avatar={!message.isMy ? avatar : undefined}
                        {...message}
                    />
                </View>
            ))}
        </MainLayout>
    );
};