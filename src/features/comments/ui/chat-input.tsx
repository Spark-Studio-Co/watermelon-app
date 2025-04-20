import React, { useState } from 'react'
import { Keyboard, View } from 'react-native'
import { Input } from '@/src/shared/ui/input/input'
import { Button } from '@/src/shared/ui/button/button'

import ThinPlusIcon from '@/src/shared/icons/thin-plus-icon'
import RightArrowIcon from '@/src/shared/icons/right-arrow-icon'
import MicIcon from '@/src/shared/icons/mic-icon'

import { useCommentsStore } from '../model/comments-store'
import { useChatStore } from '../../chat/model/chat-store'
import { useAddComment } from '@/src/entities/feed/api/use-add-comment'
import { useFeedStore } from '@/src/entities/feed/model/use-feed-store'
import { useCommentsData } from '@/src/entities/feed/api/use-comments-data'
import { useQueryClient } from '@tanstack/react-query'

interface IChatInputProps {
    type: string | "comments" | "private" | "group"
}

export const ChatInput = ({ type }: IChatInputProps) => {
    const { postId } = useFeedStore()
    const { mutate: addNewComment } = useAddComment(postId);
    const { refetch } = useCommentsData(postId)
    const queryClient = useQueryClient()

    const { setMessage } = useChatStore()
    const { addComment } = useCommentsStore()
    const [text, setText] = useState('')

    const handleAddComment = () => {
        if (!text.trim()) return

        const date = new Date()
        const time = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`

        const nickname = `@user1`

        type === "private" ? setMessage(text) : addComment({ comment: text, date: time, nickname })

        if (type === "comments") addNewComment({ content: text }, {
            onSuccess: (data: any) => {
                console.log("Comment added", data)
                refetch()
                queryClient.invalidateQueries({
                    queryKey: "comments"
                })
            }
        })

        setText('')
        Keyboard.dismiss()
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
                        {type === "comments" ? <ThinPlusIcon /> : <MicIcon />}
                    </Button>
                    <Button variant="custom" className="bg-[#656565] w-[40px] h-[40px] flex items-center justify-center rounded-full pl-1" onPress={handleAddComment}>
                        <RightArrowIcon />
                    </Button>
                </View>
            </View>
        </View>
    )
}