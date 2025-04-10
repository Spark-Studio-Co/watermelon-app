import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, ActivityIndicator } from 'react-native';

import { useAuthStore } from '@/src/entities/registration/api/use-auth-store';

// stacks
import { AuthStack } from './stacks/AuthStack';
import { MainStack } from './stacks/MainStack';

export const RootNavigator = () => {
    const { token, loadToken, loadId, id } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            await loadToken();
            loadId()
            setIsLoading(false);
        };
        checkToken();
    }, []);

    useEffect(() => {
        console.log("Token updated:", token);
        console.log(id)
    }, [token]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" />
            {token ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
};