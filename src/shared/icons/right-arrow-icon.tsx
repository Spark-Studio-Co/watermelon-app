import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const RightArrowIcon = (props: SvgProps) => (
    <Svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        {...props}
    >
        <Rect width={18} height={18} fill="url(#pattern0_644_1591)" />
        <Defs>
            <Pattern
                id="pattern0_644_1591"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_644_1591" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_644_1591"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6UlEQVR4nO3du4oUURRA0Xb0TwQ1ExRpv9nEYBBD/RnBRO17Hs4ME1ypwER89Ah2bbv2gsoPvalbVHCqdztJkqS/Nee8568HUFVPI+JtRFxFxE1mXkbEk7Xn2myMzIzMnD9cX8YY+7Xn25zlzvhJjO/XwSgnNOe8WI6p3wQxyqlFxNc/BJneKSeUma+PCDKNciKHw+Hh8gA3CkhVPcvMT3eI8nLtmc+eUYCMAmQUIKMAGQXIKEBGASrfU3jKKDxlFJ4yCk8ZhaeMwlNG4Smj8JRReMooPGUUnjIKTxmFp4zCU0bhKaPwlFF4yig8ZRSeMgpPGYWnjMJTRuEpo/CUUXjKKDxjjP2yoXXkJteyR/9o7ZnP3rhblFdrz7sJdeTxFREf1551E7r7eWZ+PiLIh7VnPXvDI4tj+FD//46p9KsSxtiU9s7gaGNwtDE42hgcbQyONgZHG4OjjcHRxuBoY3C0MTjaGBxtDI42Bkcbg6ONwdHG4GhjcLQxONoYHG0MjjYGRxuDo43BYQwQY4AYA8QYIMYAMQaIMUCMATLGeOxfr4JExBvXyCDmnPcj4sadPog554OIuHXBEiQz37vtCtLdLyLi6hcfd9mvPd+Wo7xbjq+IuM7MS7+0A3nIzzkv1p5DkiRp9698A8LB7+SgT7o+AAAAAElFTkSuQmCC"
            />
        </Defs>
    </Svg>
);
export default RightArrowIcon;
