import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const CheckMarkIcon = (props: SvgProps) => (
    <Svg
        width={26}
        height={26}
        viewBox="0 0 26 26"
        fill="none"
        {...props}
    >
        <Rect width={26} height={26} fill="url(#pattern0_644_1679)" />
        <Defs>
            <Pattern
                id="pattern0_644_1679"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_644_1679" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_644_1679"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
export default CheckMarkIcon;
