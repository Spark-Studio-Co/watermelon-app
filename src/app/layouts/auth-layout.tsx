import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <SafeAreaView className="flex-1 bg-[#1B1C1E] px-6">
            <StatusBar style="light" translucent={true} backgroundColor='transparent' />
            {children}
        </SafeAreaView >
    )
}
