import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const AddPcIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            d="M12 8V16"
            stroke="#929393"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M8 12H16"
            stroke="#929393"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default AddPcIcon;
