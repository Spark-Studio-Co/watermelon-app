import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const MessageIcon = (props: SvgProps) => (
    <Svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        {...props}
    >
        <Rect width={30} height={30} fill="url(#pattern0_644_1613)" />
        <Defs>
            <Pattern
                id="pattern0_644_1613"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_644_1613" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_644_1613"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
export default MessageIcon;
