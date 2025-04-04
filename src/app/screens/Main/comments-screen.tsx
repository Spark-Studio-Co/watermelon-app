import { MainLayout } from '../../layouts/main-layout'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { CommentMessage } from '@/src/features/comments/ui/comment-message'

import { useCommentsStore } from '@/src/features/comments/model/comments-store'


export const CommentsScreen = () => {
    const { comments } = useCommentsStore()

    return (
        <MainLayout isBack title='Комментарии' isChat>
            <View className="flex flex-col w-full bg-[#2C2B2F] rounded-[15px] min-h-[77vh]">
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-1 h-full w-full items-start mt-9 ml-10">
                        {comments.map((comment, index) => (
                            <View key={index} className="mb-6 w-[70%]">
                                <CommentMessage {...comment} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </MainLayout>
    )
}
