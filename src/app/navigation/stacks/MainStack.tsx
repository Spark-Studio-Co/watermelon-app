import React from 'react';
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
