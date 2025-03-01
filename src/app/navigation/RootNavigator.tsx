import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '@/src/entities/registration/api/use-auth-token';
import { StatusBar } from 'react-native';

// stacks
import { AuthStack } from './stacks/AuthStack';
import { MainStack } from './stacks/MainStack';


export const RootNavigator = () => {
    const { token } = useAuthStore();

    return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" />
            {token ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
