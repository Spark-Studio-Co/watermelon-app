import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const BellIcon = (props: SvgProps) => (
  <Svg width={20} height={24} viewBox="0 0 20 24" fill="none" {...props}>
    <Path
      d="M8.3 21.8944C8.46738 22.2292 8.71345 22.5084 9.01249 22.7029C9.31153 22.8974 9.65258 23 10 23C10.3474 23 10.6885 22.8974 10.9875 22.7029C11.2866 22.5084 11.5326 22.2292 11.7 21.8944M4 7.59824C4 5.84828 4.63214 4.16999 5.75736 2.93258C6.88258 1.69517 8.4087 1 10 1C11.5913 1 13.1174 1.69517 14.2426 2.93258C15.3679 4.16999 16 5.84828 16 7.59824C16 15.2962 19 17.4956 19 17.4956H1C1 17.4956 4 15.2962 4 7.59824Z"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default BellIcon;
