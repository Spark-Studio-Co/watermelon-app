import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


const MailIcon = (props: SvgProps) => (
    <Svg
        width={13}
        height={9}
        viewBox="0 0 13 9"
        fill="none"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.698.524 1.13.092h11.229l.432.432v7.773l-.432.433H1.13l-.432-.432zm.864.894v6.448h10.365V1.42L7.012 5.19h-.527zm9.527-.462h-8.69l4.345 3.342z"
            fill="#888"
        />
    </Svg>
);
export default MailIcon;
