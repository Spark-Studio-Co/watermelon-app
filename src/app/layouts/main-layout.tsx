import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationPanel } from '@/src/features/bottom-navigation-panel/ui/bottom-panel';
import { UserTab } from '@/src/features/user/ui/user-tab';
import Text from '@/src/shared/ui/text/text';
import { Button } from '@/src/shared/ui/button/button';

import { hp } from '@/src/shared/utils/resize-dimensions';

import RightArrowIcon from '@/src/shared/icons/right-arrow-icon';
import { useNavigation } from '@react-navigation/native';

interface MainLayoutProps {
    children: React.ReactNode;
    isUserTab?: boolean
    isBack?: boolean
    title?: string
    isMap?: boolean
}

export const MainLayout = ({ children, isUserTab, isBack, title, isMap }: MainLayoutProps) => {

    const navigation = useNavigation()

    return (
        <View className="flex-1 bg-[#1B1C1E]">
            <StatusBar style="light" translucent={true} backgroundColor='transparent' />
            <SafeAreaView style={{ flex: 1 }}>
                {isMap ?
                    <>
                        <View>
                            {children}
                        </View>
                        {!isBack && <BottomNavigationPanel />}
                    </>
                    :
                    <>
                        {isBack && <View className='flex flex-row items-center gap-x-3 mx-4 my-4'><Button variant='custom' className='rotate-180' onPress={() => navigation.goBack()}><RightArrowIcon /></Button><Text weight='regular' className='text-white text-[16px]'>{title}</Text></View>}
                        {isUserTab && <UserTab />}
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: hp(12), paddingHorizontal: 16,
                            }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            {children}
                        </ScrollView>
                        {!isBack && <BottomNavigationPanel />}
                    </>
                }
            </SafeAreaView>
        </View >
    );
};