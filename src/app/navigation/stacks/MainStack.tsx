import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// screens

import { DashboardScreen } from '../../screens/Main/dashboard-screen';
import { SuccessSignUpScreen } from '../../screens/Auth/success-sign-up-screen';

export const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SuccessSignUp" component={SuccessSignUpScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
    );
};
