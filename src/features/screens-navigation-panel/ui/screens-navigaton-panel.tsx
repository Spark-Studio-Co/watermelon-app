import React from 'react';
import { View } from 'react-native';
import { ScreenNavigationTab } from './screen-navigation-tab';

import { hp } from '@/src/shared/utils/resize-dimensions';

import { useNavigation } from '@react-navigation/native';

// background images
import AuctionImage from '../../../images/navigation-panels/auction.png'
import FeedImage from '../../../images/navigation-panels/feed.png'
import BookMarkImage from '../../../images/navigation-panels/bookmarks.png'
import TaskImage from '../../../images/navigation-panels/task.png'
import ActivityImage from '../../../images/navigation-panels/activity.png'


export const ScreensNavigationPanel = () => {
    const navigation = useNavigation();

    const navigationItems = [
        { uri: AuctionImage, navigation: 'Auction' },
        { uri: FeedImage, width: 223, margin: hp(0.25) },
        { uri: BookMarkImage, navigation: 'Bookmarks' },
        { uri: TaskImage, navigation: 'Tasks' },
        { uri: ActivityImage, width: 223, margin: hp(0.25), navigation: 'Activity' }
    ];

    return (
        <View className="bg-[#252626] mt-8 pt-5 rounded-[20px] flex flex-row flex-wrap justify-center">
            {navigationItems.map((item, index) => (
                <View key={index} className="w-[48%] flex items-center" >
                    <ScreenNavigationTab uri={item.uri} width={item.width} margin={item.margin} onPress={async () => navigation.navigate(item.navigation as never)} />
                </View>
            ))}
        </View>
    );
};