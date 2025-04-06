import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MyPolygonIcon = (props: React.ComponentProps<typeof Svg>) => (
    <Svg
        width={12}
        height={6}
        viewBox="0 0 12 6"
        fill="none"
        {...props}
    >
        <Path d="M11.422 5.9 0 .111l.06 5.895z" fill="#3D5DA1" />
    </Svg>
);
export default MyPolygonIcon;
