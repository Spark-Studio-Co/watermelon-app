import { View } from 'react-native'
import Text from '@/src/shared/ui/text/text'

interface ICommentMessageProps {
    nickname: string
    comment: string
    date: string
}

export const CommentMessage = ({ nickname, comment, date }: ICommentMessageProps) => {
    return (
        <View className='flex flex-row items-start gap-x-5'>
            <Text weight="regular" className="text-white text-[14px]">{nickname}</Text>
            <View className='flex flex-col'>
                <View className='bg-[#484848] px-1.5 py-1 rounded-[4px]'>
                    <Text weight="medium" className="text-white text-[14px]">{comment}</Text>
                </View>
                <Text weight="regular" className="text-white text-[8px] text-right mt-1 mr-1">{date}</Text>
            </View>
        </View>
    )
}
