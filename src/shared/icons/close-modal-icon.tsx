import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const CloseModalIcon = (props: SvgProps) => (
    <Svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        {...props}
    >
        <Path
            d="M4.58 25.79A15 15 0 1 1 25.42 4.21 15 15 0 0 1 4.58 25.79m12.704-10.606 4.245-4.245-2.115-2.115-4.23 4.245-4.245-4.245-2.115 2.115 4.245 4.245-4.245 4.245 2.115 2.115 4.245-4.245 4.245 4.245 2.115-2.115-4.245-4.245z"
            fill="#fff"
        />
    </Svg>
);
export default CloseModalIcon;
