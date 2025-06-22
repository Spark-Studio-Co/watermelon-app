import * as React from "react";
import Svg, {
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
} from "react-native-svg";
const ChangeLanguageIcon = (props: SvgProps) => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    <Rect width={25} height={25} fill="url(#pattern0_205_889)" />
    <Defs>
      <Pattern
        id="pattern0_205_889"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_205_889" transform="scale(0.0111111)" />
      </Pattern>
      <Image
        id="image0_205_889"
        width={90}
        height={90}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default ChangeLanguageIcon;
