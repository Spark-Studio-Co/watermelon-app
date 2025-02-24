import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './stacks/AuthStack';
import { MainStack } from './stacks/MainStack';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isAuthenticated = true;

    return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" />
            <Stack.Navigator
            >
                {!isAuthenticated ? (
                    <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};