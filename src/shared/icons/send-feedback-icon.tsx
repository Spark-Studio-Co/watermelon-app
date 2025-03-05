import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SendFeedBackIcon = (props: SvgProps) => (
    <Svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        {...props}
    >
        <Path
            d="M12.1886 17.8114L29 1M12.1886 17.8114L17.5377 28.5096C17.6047 28.6559 17.7124 28.7799 17.8478 28.8669C17.9833 28.9538 18.1409 29 18.3018 29C18.4628 29 18.6203 28.9538 18.7558 28.8669C18.8913 28.7799 18.9989 28.6559 19.066 28.5096L29 1M12.1886 17.8114L1.49039 12.4623C1.34407 12.3953 1.22007 12.2876 1.13314 12.1522C1.04621 12.0167 1 11.8591 1 11.6982C1 11.5372 1.04621 11.3797 1.13314 11.2442C1.22007 11.1087 1.34407 11.0011 1.49039 10.934L29 1"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default SendFeedBackIcon;
