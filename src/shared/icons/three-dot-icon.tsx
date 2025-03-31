import * as React from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

const ThreeDotIcon = (props: SvgProps) => (
    <Svg
        width={13}
        height={4}
        viewBox="0 0 13 4"
        fill="none"
        {...props}
    >
        <Circle
            cx={1.325}
            cy={1.987}
            r={1.296}
            transform="rotate(-90 1.325 1.987)"
            fill="#888"
        />
        <Circle
            cx={6.364}
            cy={1.987}
            r={1.296}
            transform="rotate(-90 6.364 1.987)"
            fill="#888"
        />
        <Circle
            cx={11.402}
            cy={1.987}
            r={1.296}
            transform="rotate(-90 11.402 1.987)"
            fill="#888"
        />
    </Svg>
);
export default ThreeDotIcon;
