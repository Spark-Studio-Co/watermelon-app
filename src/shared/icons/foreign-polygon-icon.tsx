import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ForeignPolygonIcon = (props: React.ComponentProps<typeof Svg>) => (
    <Svg
        width={12}
        height={6}
        viewBox="0 0 12 6"
        fill="none"
        {...props}
    >
        <Path d="m.03 6 11.232-6v5.998z" fill="#484848" />
    </Svg>
);
export default ForeignPolygonIcon;
