import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    active?: boolean;
};

const HeartLikeIcon: React.FC<Props> = ({ active = false, ...props }) => {
    const fillColor = active ? "#FF5C8A" : "";

    return (
        <Svg
            width={24}
            height={22}
            viewBox="0 0 24 22"
            fill="none"
            {...props}
        >
            <Path
                d="M17.4 1.29836L17.3988 1.29837C16.5479 1.30043 15.7099 1.5067 14.9554 1.89985C14.2009 2.29299 13.552 2.86151 13.0632 3.55757L12.0001 5.06895L10.9367 3.55625C10.4478 2.86043 9.79877 2.29217 9.04428 1.89926C8.28979 1.50635 7.4519 1.30028 6.60113 1.29836H6.6C3.67709 1.29836 1.3 3.67264 1.3 6.59401C1.3 9.58448 3.06923 12.3833 5.2012 14.7032C7.34501 17.036 9.93079 18.9653 11.7123 20.2185L12 20.4209L12.2877 20.2185C14.0692 18.9653 16.655 17.036 18.7988 14.7032C20.9308 12.3833 22.7 9.58448 22.7 6.59401C22.7 3.67264 20.3229 1.29836 17.4 1.29836Z"
                fill={fillColor}
                stroke="white"
            />
        </Svg>
    );
};

export default HeartLikeIcon;