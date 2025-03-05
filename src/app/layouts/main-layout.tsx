import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationPanel } from '@/src/features/bottom-navigation-panel/ui/bottom-panel';
import { UserTab } from '@/src/features/user/ui/user-tab';
import { hp } from '@/src/shared/utils/resize-dimensions';

interface MainLayoutProps {
    children: React.ReactNode;
    isUserTab?: boolean
}

export const MainLayout = ({ children, isUserTab }: MainLayoutProps) => {
    return (
        <View className="flex-1 bg-[#1B1C1E]">
            <StatusBar style="light" translucent={true} backgroundColor='transparent' />
            <SafeAreaView style={{ flex: 1 }}>
                {isUserTab && <UserTab />}
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(4), paddingHorizontal: 16 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
                <BottomNavigationPanel />
            </SafeAreaView>
        </View>
    );
};