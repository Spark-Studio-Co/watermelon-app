import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthToken } from '@/src/entities/registration/api/use-auth-token';
import { StatusBar, View, ActivityIndicator } from 'react-native';

// stacks
import { AuthStack } from './stacks/AuthStack';
import { MainStack } from './stacks/MainStack';

// Create a simple component that renders the appropriate stack based on authentication state
export const RootNavigator = () => {
    const { isAuthenticated, loadToken } = useAuthToken();
    const [loading, setLoading] = useState(true);

    // Load token on mount
    useEffect(() => {
        const fetchToken = async () => {
            await loadToken();
            setLoading(false);
        };
        fetchToken();
    }, []);

    // Log authentication state changes
    useEffect(() => {
        if (!loading) {
            console.log('Authentication state changed:', isAuthenticated);
        }
    }, [isAuthenticated, loading]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Simply render the appropriate stack based on authentication state
    return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" />
            {isAuthenticated ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
