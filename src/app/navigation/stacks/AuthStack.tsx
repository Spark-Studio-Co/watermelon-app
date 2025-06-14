import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// screens
import { LoginScreen } from "../../screens/Auth/login-screen";
import { RegistrationScreen } from "../../screens/Auth/registration-screen";
import { CodeConfirmationScreen } from "../../screens/Auth/code-confirmation-screen";
import { PasswordScreen } from "../../screens/Auth/password-screen";
import { SuccessSignInScreen } from "../../screens/Auth/success-sign-in-screen";
import { SuccessSignUpScreen } from "../../screens/Auth/success-sign-up-screen";
import { AccountCreationScreen } from "../../screens/Auth/account-creation-screen";

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen
        name="CodeConfirmation"
        component={CodeConfirmationScreen}
      />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="AccountCreation" component={AccountCreationScreen} />
      <Stack.Screen name="SuccessSignIn" component={SuccessSignInScreen} />
      <Stack.Screen name="SuccessSignUp" component={SuccessSignUpScreen} />
    </Stack.Navigator>
  );
};
