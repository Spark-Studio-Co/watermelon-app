import React, { useRef } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface IBottomSheetProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const BottomSheet = ({ children, onClose }: IBottomSheetProps) => {
  const translateY = useRef(new Animated.Value(0)).current;

  // Gesture Handler
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy > 100) {
          // Close bottom sheet if swiped down enough
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          // Snap back if swipe wasn't enough
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View className="absolute inset-0 flex justify-end">
        <Animated.View
          style={{ transform: [{ translateY }] }}
          {...panResponder.panHandlers}
          className="bg-[#1B1C1E] rounded-t-3xl w-full p-5 absolute bottom-0"
        >
          <View className="bg-[#D9D9D9] w-[85px] h-[3px] rounded-[1px] mx-auto mb-3" />
          {children}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
