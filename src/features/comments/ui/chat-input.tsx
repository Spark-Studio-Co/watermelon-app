import React, { useState } from 'react'
import { Keyboard, View } from 'react-native'
import { Input } from '@/src/shared/ui/input/input'
import { Button } from '@/src/shared/ui/button/button'

import EmojiIcon from '@/src/shared/icons/emoji-icon'
import ThinPlusIcon from '@/src/shared/icons/thin-plus-icon'
import RightArrowIcon from '@/src/shared/icons/right-arrow-icon'

import { useCommentsStore } from '../model/comments-store'

export const ChatInput = () => {
    const { addComment } = useCommentsStore()
    const [text, setText] = useState('')
    const [isEmojiOpen, setIsEmojiOpen] = useState(false)

    const handleAddComment = () => {
        if (!text.trim()) return

        const date = new Date()
        const time = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`

        const nickname = `@user1`

        addComment({ comment: text, date: time, nickname })
        setText('')
        Keyboard.dismiss()
    }

    const toggleEmoji = () => {
        Keyboard.dismiss()
        setIsEmojiOpen(!isEmojiOpen)
    }

    const handleSelectEmoji = (emoji: string) => {
        setText((prev) => prev + emoji)
    }

    return (
        <View className="bg-[#202020] absolute w-full bottom-0 min-h-[90px] rounded-tl-[15px] rounded-tr-[15px] pl-[33px] pt-[21px] pb-[40px] pr-[100px]">
            <View className="flex flex-row items-end justify-between">
                <Input
                    multiline
                    placeholder="Введите сообщение"
                    className="w-[95%] h-full placeholder:text-[#656565] text-[#656565]"
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={handleAddComment}
                />
                <View className="flex flex-row items-center gap-x-6">
                    <Button variant="custom" className="rounded-[15px] w-[20px] h-[20px] -mt-2">
                        <ThinPlusIcon />
                    </Button>
                    <Button variant="custom" className="bg-[#656565] w-[40px] h-[40px] flex items-center justify-center rounded-full pl-1" onPress={handleAddComment}>
                        <RightArrowIcon />
                    </Button>
                </View>
            </View>
        </View>
    )
}