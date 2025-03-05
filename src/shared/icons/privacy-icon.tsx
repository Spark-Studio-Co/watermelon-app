import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const PrivacyIcon = (props: SvgProps) => (
    <Svg
        width={41}
        height={29}
        viewBox="0 0 41 29"
        fill="none"
        {...props}
    >
        <Rect width={41} height={29} fill="url(#pattern0_644_1575)" />
        <Defs>
            <Pattern
                id="pattern0_644_1575"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use
                    xlinkHref="#image0_644_1575"
                    transform="matrix(0.00707317 0 0 0.01 0.146341 0)"
                />
            </Pattern>
            <Image
                id="image0_644_1575"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
export default PrivacyIcon;
