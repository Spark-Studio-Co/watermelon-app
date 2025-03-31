import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const LockIcon = (props: SvgProps) => (
    <Svg
        width={35}
        height={35}
        viewBox="0 0 35 35"
        fill="none"
        {...props}
    >
        <Rect width={35} height={35} fill="url(#pattern0_649_999)" />
        <Defs>
            <Pattern
                id="pattern0_649_999"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_649_999" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_649_999"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
export default LockIcon;
