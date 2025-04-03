import { MainLayout } from '../../layouts/main-layout'
import { View } from 'react-native'
import Text from '@/src/shared/ui/text/text'
import { ScrollView } from 'react-native-gesture-handler'

export const CommentsScreen = () => {
    return (
        <MainLayout isBack title='Комментарии' >
            <View className="flex flex-col w-full bg-[#2C2B2F] rounded-[15px] min-h-[70vh]">
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-1 h-full w-full justify-center items-center">
                        <Text className="text-white">Тут точно видно</Text>
                    </View>
                </ScrollView>
            </View>
        </MainLayout>
    )
}
