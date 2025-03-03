import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationPanel } from '@/src/features/bottom-navigation-panel/ui/bottom-panel';

import { hp } from '@/src/shared/utils/resize-dimensions';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <View className="flex-1 bg-[#1B1C1E]">
            <SafeAreaView>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(12), paddingHorizontal: 16 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <StatusBar style="light" translucent={true} backgroundColor='transparent' />
                    {children}
                </ScrollView>
                <BottomNavigationPanel />
            </SafeAreaView>
        </View>
    );
};