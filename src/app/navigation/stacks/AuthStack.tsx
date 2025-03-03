import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// screens
import { LoginScreen } from '../../screens/Auth/login-screen';
import { RegistrationScreen } from '../../screens/Auth/registration-screen';
import { CodeConfirmationScreen } from '../../screens/Auth/code-confirmation-screen';
import { PasswordScreen } from '../../screens/Auth/password-screen';
import { SuccessSignInScreen } from '../../screens/Auth/success-sign-in-screen';

export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="CodeConfirmation" component={CodeConfirmationScreen} />
            <Stack.Screen name="Password" component={PasswordScreen} />
            <Stack.Screen name="SuccessSignIn" component={SuccessSignInScreen} />
        </Stack.Navigator>
    );
};
