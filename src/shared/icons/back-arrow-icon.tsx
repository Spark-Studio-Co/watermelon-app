import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const BackArrowIcon = (props: SvgProps) => (
    <Svg
        width={40}
        height={24}
        viewBox="0 0 40 24"
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <Path d="m12 19-7-7 7-7m23 7H5" />
    </Svg>
);
export default BackArrowIcon;
