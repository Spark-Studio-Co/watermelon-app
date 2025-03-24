import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

const ChatPointIcon = (props: SvgProps) => (
    <Svg
        width={48}
        height={42}
        viewBox="0 0 48 42"
        fill="none"
        {...props}
    >
        <Rect y={5.47803} width={10.9565} height={31.0435} rx={3.5} fill="white" />
        <Rect x={18.2607} width={10.9565} height={42} rx={3.5} fill="white" />
        <Rect
            x={36.522}
            y={1.82617}
            width={10.9565}
            height={36.5217}
            rx={3.5}
            fill="white"
        />
    </Svg>
);
export default ChatPointIcon;
