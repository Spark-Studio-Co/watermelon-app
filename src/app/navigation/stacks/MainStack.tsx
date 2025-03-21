import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// screens
import { DashboardScreen } from '../../screens/Main/dashboard-screen';
import { SettingsScreen } from '../../screens/Main/settings-screen';
import { PointPremiumScreen } from '../../screens/Main/point-premium-screen';
import { PrivateDataScreen } from '../../screens/Main/private-data-screen';
import { PrivacyScreen } from '../../screens/Main/privacy-screen';
import { MyFriendsScreen } from '../../screens/Main/my-friends-screen';
import { SearchFriendsScreen } from '../../screens/Main/search-friends-screen';
import { NotificationsScreen } from '../../screens/Main/notifications-screen';
import { MapScreen } from '../../screens/Main/map-screen';

export const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
                animationDuration: 250,
                gestureEnabled: true,
                fullScreenGestureEnabled: true,
                contentStyle: {
                    backgroundColor: '#1B1C1E'
                },
                gestureDirection: 'horizontal',
                animationTypeForReplace: 'push'
            }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="PointPremium" component={PointPremiumScreen} />
            <Stack.Screen name="PrivateData" component={PrivateDataScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="MyFriends" component={MyFriendsScreen} />
            <Stack.Screen name="SearchFriends" component={SearchFriendsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
    );
};
