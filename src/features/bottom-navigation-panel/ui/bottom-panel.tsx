import React from 'react';
import { View, Animated } from "react-native";
import { useNavigationState } from '@react-navigation/native';

import { BottomNavigationButton } from "./bottom-navigation-button";
import { links } from "./model/links";

export const BottomNavigationPanel = () => {
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    const navigationState = useNavigationState(state => state);

    React.useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0.7,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 80,
                useNativeDriver: true,
            })
        ]).start();
    }, [navigationState?.index]);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
            }}
            className="bg-[#202020] absolute w-full bottom-0 h-[70px] rounded-tl-[18px] rounded-tr-[18px]"
        >
            <View className="flex flex-row justify-between items-center w-[70%] m-auto">
                {links.map((link) => (
                    <BottomNavigationButton
                        key={link.label}
                        icon={link.icon}
                        label={link.label}
                    />
                ))}
            </View>
        </Animated.View>
    );
};