import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const SearchIcon = (props: SvgProps) => (
    <Svg
        width={26}
        height={26}
        viewBox="0 0 26 26"
        fill="none"
        {...props}
    >
        <Rect width={26} height={26} fill="url(#pattern0_644_1601)" />
        <Defs>
            <Pattern
                id="pattern0_644_1601"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_644_1601" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_644_1601"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
export default SearchIcon;
