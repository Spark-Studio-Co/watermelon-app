import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const CheckIcon = (props: SvgProps) => (
  <Svg width={12} height={9} viewBox="0 0 12 9" fill="none" {...props}>
    <Path
      d="M1 4.5L4.5 8L11 1"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckIcon;
