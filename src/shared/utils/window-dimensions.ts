import {
    Dimensions,
    PixelRatio,
    Platform,
    NativeModules,
    ScaledSize,
    StatusBar,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

// const { StatusBarManager } = NativeModules;

// Utility function to convert width percentage (string) to DP (Device Pixels)
const widthPercentageToDP = (widthPercent: string): number => {
    const dim: ScaledSize = Dimensions.get("screen");

    let screenWidth: number;
    if (dim.height >= dim.width) {
        screenWidth = Dimensions.get("window").width;
    } else {
        screenWidth = Dimensions.get("window").height;
    }

    // Parse the string input like "50%" -> 50
    const elemWidth = parseFloat(widthPercent.replace("%", ""));
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

// Utility function to convert height percentage (string) to DP (Device Pixels)
const heightPercentageToDP = (heightPercent: string): number => {
    const dim: ScaledSize = Dimensions.get("screen");

    let screenHeight: number;
    if (dim.height >= dim.width) {
        if (Platform.OS === "android") {
            // Use window height and subtract status bar height for Android
            screenHeight = Dimensions.get("window").height - (StatusBar.currentHeight ?? 0);
        } else {
            screenHeight = Dimensions.get("window").height;
        }
    } else {
        screenHeight = Dimensions.get("window").width;
    }

    // Parse the string input like "50%" -> 50
    const elemHeight = parseFloat(heightPercent.replace("%", ""));
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

// Function to get iOS status bar height
const IOSStatusBar = (): number => {
    return getStatusBarHeight();
};

// Export utility functions
export { widthPercentageToDP, heightPercentageToDP, IOSStatusBar };