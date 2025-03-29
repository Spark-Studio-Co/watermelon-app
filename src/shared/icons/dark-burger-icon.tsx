import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

const DarkBurgerIcon = (props: SvgProps) => (
    <Svg
        width={19}
        height={17}
        viewBox="0 0 19 17"
        fill="none"
        {...props}
    >
        <Rect width={19} height={3} rx={1.5} fill="#000000" />
        <Rect y={7} width={19} height={3} rx={1.5} fill="#000000" />
        <Rect y={14} width={19} height={3} rx={1.5} fill="#000000" />
    </Svg>
);
export default DarkBurgerIcon;
