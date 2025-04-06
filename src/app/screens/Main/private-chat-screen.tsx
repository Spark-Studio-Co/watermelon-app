import { MainLayout } from '../../layouts/main-layout'
import { View } from 'react-native'
import { ChatMessage } from '@/src/features/chat/ui/chat-message'
import { ChatTab } from '@/src/features/chat/ui/chat-tab'

import { useChatStore } from '@/src/features/chat/model/chat-store'

import user_image from "@/src/images/user_image.png";
import { ScrollView } from 'react-native-gesture-handler'

type Message = {
    text: string,
    date: string
    isMy: boolean
}

export const PrivateChatScreen = () => {
    const { messages } = useChatStore()

    return (
        <MainLayout isChat chatInputType="private">
            {messages.map((message: Message, index: number) => {
                return (
                    <View className='flex flex-col mb-10' key={index}>
                        <ChatMessage avatar={user_image} {...message} />
                    </View>
                )
            })}
        </MainLayout>
    )
}
