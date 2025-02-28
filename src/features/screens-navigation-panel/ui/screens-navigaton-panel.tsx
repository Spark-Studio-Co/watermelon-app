import React from 'react';
import { View } from 'react-native';
import { ScreenNavigationTab } from './screen-navigation-tab';

import { hp } from '@/src/shared/utils/resize-dimensions';


// background images
import AuctionImage from '../../../images/navigation-panels/auction.png'
import FeedImage from '../../../images/navigation-panels/feed.png'
import BookMarkImage from '../../../images/navigation-panels/bookmarks.png'
import MarketImage from '../../../images/navigation-panels/market.png'
import TaskImage from '../../../images/navigation-panels/task.png'
import ActivityImage from '../../../images/navigation-panels/activity.png'


const navigationItems = [
    { uri: AuctionImage, },
    { uri: FeedImage, width: 223, margin: hp(0.25) },
    { uri: BookMarkImage, },
    { uri: MarketImage, width: 223, margin: hp(0.25) },
    { uri: TaskImage, },
    { uri: ActivityImage, width: 223, margin: hp(0.25) }
];

export const ScreensNavigationPanel = () => {
    return (
        <View className="bg-[#252626] mt-8 pt-5 rounded-[20px] flex flex-row flex-wrap justify-center">
            {navigationItems.map((item, index) => (
                <View key={index} className="w-[48%] flex items-center">
                    <ScreenNavigationTab uri={item.uri} width={item.width} margin={item.margin} />
                </View>
            ))}
        </View>
    );
};