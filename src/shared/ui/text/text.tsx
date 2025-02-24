import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

type FontWeight =
    | "extraLight"
    | "light"
    | "regular"
    | "medium"
    | "bold"
    | "extraBold"
    | "black";

interface CustomTextProps extends RNTextProps {
    weight?: FontWeight;
}

const fontFamilyMap: Record<FontWeight, string> = {
    extraLight: "Poppins-ExtraLight",
    light: "Poppins-Light",
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    bold: "Poppins-Bold",
    extraBold: "Poppins-ExtraBold",
    black: "Poppins-Black",
};

const Text: React.FC<CustomTextProps> = ({
    style,
    weight = "light",
    ...props
}) => {
    const fontFamily = fontFamilyMap[weight] || "Poppins-Regular";

    return (
        <RNText
            style={[{ fontFamily }, style]}
            className="text-light-dark"
            {...props}
        />
    );
};

export default Text;