import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const CirclePlus = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-plus-icon lucide-circle-plus"
        {...props}
    >
        <Circle cx={12} cy={12} r={10} />
        <Path d="M8 12h8" />
        <Path d="M12 8v8" />
    </Svg>
);
export default CirclePlus;
