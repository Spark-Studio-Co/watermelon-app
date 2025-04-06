import * as React from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

const BigThreeDots = (props: SvgProps) => (
    <Svg
        width={5}
        height={23}
        viewBox="0 0 5 23"
        fill="none"
        {...props}
    >
        <Circle cx={2.5} cy={2.5} r={2.5} fill="#D9D9D9" />
        <Circle cx={2.5} cy={11.5} r={2.5} fill="#D9D9D9" />
        <Circle cx={2.5} cy={20.5} r={2.5} fill="#D9D9D9" />
    </Svg>
);
export default BigThreeDots;
