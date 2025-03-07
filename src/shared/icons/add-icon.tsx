import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const AddIcon = (props: SvgProps) => (
    <Svg
        width={26}
        height={26}
        viewBox="0 0 26 26"
        fill="none"
        {...props}
    >
        <Rect width={26} height={26} fill="url(#pattern0_645_1758)" />
        <Defs>
            <Pattern
                id="pattern0_645_1758"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_645_1758" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_645_1758"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
export default AddIcon;
