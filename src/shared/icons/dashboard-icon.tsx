import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const DashboardIcon = (props: SvgProps) => (
    <Svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        fill="none"
        {...props}
    >
        <Path
            d="M21 18.807V11.4243C21 10.8294 20.8774 10.2408 20.6396 9.69411C20.4017 9.14745 20.0537 8.65426 19.6167 8.24452L12.5311 1.60307C12.1181 1.21589 11.5702 1 11.0006 1C10.4309 1 9.883 1.21589 9.47 1.60307L2.38333 8.24452C1.94628 8.65426 1.59826 9.14745 1.36045 9.69411C1.12264 10.2408 0.999999 10.8294 1 11.4243V18.807C1 19.3886 1.23413 19.9464 1.65087 20.3577C2.06762 20.769 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.769 20.3491 20.3577C20.7659 19.9464 21 19.3886 21 18.807Z"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default DashboardIcon;
