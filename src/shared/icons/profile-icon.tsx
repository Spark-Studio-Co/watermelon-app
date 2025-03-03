import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const ProfileIcon = (props: SvgProps) => (
    <Svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        fill="none"
        {...props}
    >
        <Path
            d="M2 17.75C2 16.5565 2.47411 15.4119 3.31802 14.568C4.16193 13.7241 5.30653 13.25 6.5 13.25H15.5C16.6935 13.25 17.8381 13.7241 18.682 14.568C19.5259 15.4119 20 16.5565 20 17.75C20 18.3467 19.7629 18.919 19.341 19.341C18.919 19.7629 18.3467 20 17.75 20H4.25C3.65326 20 3.08097 19.7629 2.65901 19.341C2.23705 18.919 2 18.3467 2 17.75Z"
            fill="white"
            stroke="white"
            strokeWidth={2.5}
            strokeLinejoin="round"
        />
        <Path
            d="M11 8.75C12.864 8.75 14.375 7.23896 14.375 5.375C14.375 3.51104 12.864 2 11 2C9.13604 2 7.625 3.51104 7.625 5.375C7.625 7.23896 9.13604 8.75 11 8.75Z"
            fill="white"
            stroke="white"
            strokeWidth={2.5}
        />
    </Svg>
);
export default ProfileIcon;
