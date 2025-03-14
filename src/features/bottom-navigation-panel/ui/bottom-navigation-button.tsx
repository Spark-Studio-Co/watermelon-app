import React from 'react';
import { Animated, LayoutAnimation } from 'react-native';
import { Button } from "@/src/shared/ui/button/button";
import Text from "@/src/shared/ui/text/text";
import { useNavigation } from "@react-navigation/native";
import { IBottomNavigatonButtonProps } from "./model/bottom-navigation-button.interface";

import { useCurrentScreen } from "@/src/shared/model/use-current-screen";

export const BottomNavigationButton = ({ label, icon }: IBottomNavigatonButtonProps) => {
    const { navigate } = useNavigation();
    const screenName = useCurrentScreen();
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const isActive = screenName === label;

    React.useEffect(() => {
        if (isActive) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 3,
                useNativeDriver: true
            }).start();
        }
    }, [isActive]);

    const handlePressButton = () => {
        if (!isActive) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                })
            ]).start();

            navigate(label as never);
        }
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Button
                variant="custom"
                onPress={handlePressButton}
                className={`flex flex-row h-[48px] items-center gap-x-3 ${isActive ? `h-[48px] bg-[#2A2A2C] px-4 flex items-center justify-center rounded-tl-[15px] rounded-tr-[15px]` : 'w-[48px]'}`}
            >
                {icon}
                {isActive && (
                    <Text weight="bold" className="text-[12px] text-white">{label}</Text>
                )}
            </Button>
        </Animated.View>
    )
}
