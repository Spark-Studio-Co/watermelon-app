import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const FriendsIcon = (props: SvgProps) => (
    <Svg
        width={31}
        height={31}
        viewBox="0 0 31 31"
        fill="none"
        {...props}
    >
        <Rect width={31} height={31} fill="url(#pattern0_644_1573)" />
        <Defs>
            <Pattern
                id="pattern0_644_1573"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_644_1573" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_644_1573"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
export default FriendsIcon;
