import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// screens
import { LoginScreen } from '../../screens/login-screen';
import { SuccessSignUpScreen } from '../../screens/success-sign-up-screen';
import { RegistrationScreen } from '../../screens/registration-screen';
import { CodeConfirmationScreen } from '../../screens/code-confirmation-screen';
import { PasswordScreen } from '../../screens/password-screen';
import { SuccessSignInScreen } from '../../screens/success-sign-in-screen';

export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SuccessSignUp" component={SuccessSignUpScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="CodeConfirmation" component={CodeConfirmationScreen} />
            <Stack.Screen name="Password" component={PasswordScreen} />
            <Stack.Screen name="SuccessSignIn" component={SuccessSignInScreen} />
        </Stack.Navigator>
    );
};
