import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <SafeAreaView className="flex-1 bg-[#1B1C1E] px-6">
            <StatusBar style="light" translucent={true} backgroundColor='transparent' />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};