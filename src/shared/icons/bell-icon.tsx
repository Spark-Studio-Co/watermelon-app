import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const BellIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={29}
        viewBox="0 0 25 29"
        fill="none"
        {...props}
    >
        <Path
            d="M10.3278 26.6432C10.5417 27.054 10.8561 27.3967 11.2382 27.6354C11.6203 27.8741 12.0561 28 12.5 28C12.9439 28 13.3797 27.8741 13.7618 27.6354C14.1439 27.3967 14.4583 27.054 14.6722 26.6432M4.83333 9.09784C4.83333 6.95016 5.64107 4.89044 7.07885 3.3718C8.51663 1.85316 10.4667 1 12.5 1C14.5333 1 16.4834 1.85316 17.9212 3.3718C19.3589 4.89044 20.1667 6.95016 20.1667 9.09784C20.1667 18.5453 24 21.2446 24 21.2446H1C1 21.2446 4.83333 18.5453 4.83333 9.09784Z"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default BellIcon;
