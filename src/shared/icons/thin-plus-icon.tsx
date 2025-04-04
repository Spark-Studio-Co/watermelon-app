import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const ThinPlusIcon = (props: SvgProps) => (
    <Svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        {...props}
    >
        <Path fill="url(#a)" d="M0 0h30v30H0z" />
        <Defs>
            <Pattern
                id="a"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#b" transform="scale(.01)" />
            </Pattern>
            <Image
                id="b"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6ElEQVR4nO3UsQ1CMRAFQVe7/XcAKSGZ34cZ6XLrVudzAAAAAAAAAB6ren3O7ff8vQTZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJkO8W829z1txeSIIIkgvp+iU85su6JYvZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJkC0JAgAAAAAAAJxf8Qal8T8tCvmkUAAAAABJRU5ErkJggg=="
            />
        </Defs>
    </Svg>
);
export default ThinPlusIcon;
