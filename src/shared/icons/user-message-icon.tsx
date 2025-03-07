import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const UserMessageIcon = (props: SvgProps) => (
    <Svg
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
        {...props}
    >
        <Rect width={28} height={28} fill="url(#pattern0_644_1728)" />
        <Defs>
            <Pattern
                id="pattern0_644_1728"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_644_1728" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_644_1728"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD10lEQVR4nO2dT6gVVRzHR1ODBBFyFVhki3ZmEAkliC3CTaXE27Z060qElJAIimjTUhAXLv0TwVsUCLVu8SjqLaydlD4XD+6c7/fc0UV54tioo/XImXNmzpm53w/84G3u3Dnfz73zvfOYe6cohBBCCCGEEEIIIYQQQgghxH+ytra23RjzBoAjJJc0XPJZ+Ex8NoO9bKy1r5L8CsAdkk7Df2UA4DbJK9bafb2JcM5tAnAawJ+SwCd6IfqsAHzYixCSn0oEux4RPokqw1p7WDIYdHi21r4d81C1KiEMEgLg5yhC/KcGyWCUDy/GmP3BQgCclBDGEnIiWMh8Pn+O5CVJYaiQ5aqqXihiYYx5B8B1iWHb7rhprf2g6APn3DMkP9O5CJ9ExF8kz66vr+8o+safgZL8Qe8WbiTjpygF3gbn3GYAx0hCYnhfxNx/CHLOPVWkQqXPfko7lEUtffRZ2qEsUuljyNJuAuD92Wy2s81j5vP5awBWJixjxa+xTSY+Q59lEQrJiwButX1bTrH00bG068P57z7LIhS/kcYOfWeMeblD6T/YxiKV9mw2exHAN41txBVSS6lInnHObVuE0gdwo8PRYQvJ4/wH16uQxvxK8tBUSx8dS7u+zuCXDbbbqxC/03cBXDDGPDulM30AP5Zl+XqH0v6yFumSCGksIKT0TWoBjFfa//ccwwhpLOj7EZf+clVVzweWdl5Cxlj6iFva+QkZS+mjn9LOWki2pY/+SjtvIbmVPsJK+48I+5CHkNDSB3AhRWmXZbmnZWmPS8hjpf/0EKUP4Ia/EHyg0h6fkKFKH2lKe9RCeit9pCvtcQuJXfpIX9rTENII9NuyLF9qs39VVe0m+bUf/3ebx/rn8s851PpGJ4QBpd+xtO2QaxulED5a+m8VkQHwZo+lPWkh7n7pA9gVuo6BSnvaQhhQ+olKezGEsOOZfg9n2hLCDqXvnNuaqLQX6x3CR8Ws+oLeoLRz/QredIXwYelf9V89rsf/fTf1fi2sEI5vJITpJUgI0wcvIUwftoQwfcASwvShSgjTBykhTB+ehDB9YBKSQUhOQtIH4yQkfRgug9G/TphegoQwffASwvRhSwjTBywhTB9qciHnM1iIm8iciyHk4wwW4iYyZ4KFADiYwULcFAbAgWAh/kpykr+lXgzHP9ei/dIcgKMZLMiNeYwx70aR0ZDyRepFcbzzeRGb+jfgP0p8sbIb0/isAJzy2RV9Ya19pb6hS5XDopnh1NlcJrm3GPiWR/sBvKfbHfHeLZ98Fj4T/+XUwUQIIYQQQgghhBBCCCGEEEIU4+JvopwfgO1qBI0AAAAASUVORK5CYII="
            />
        </Defs>
    </Svg>
);
export default UserMessageIcon;
