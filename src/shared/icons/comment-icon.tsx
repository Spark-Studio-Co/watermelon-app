import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const CommentIcon = (props: SvgProps) => (
    <Svg
        width={37}
        height={37}
        viewBox="0 0 37 37"
        fill="none"
        {...props}
    >
        <Path fill="url(#a)" d="M0 0h37v37H0z" />
        <Defs>
            <Pattern
                id="a"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#b" transform="scale(.01)" />
            </Pattern>
            <Image
                id="b"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
export default CommentIcon;
