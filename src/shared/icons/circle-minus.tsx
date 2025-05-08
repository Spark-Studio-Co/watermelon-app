import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const CircleMinus = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-minus-icon lucide-circle-minus"
        {...props}
    >
        <Circle cx={12} cy={12} r={10} />
        <Path d="M8 12h8" />
    </Svg>
);
export default CircleMinus;
