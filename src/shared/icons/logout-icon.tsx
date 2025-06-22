import * as React from "react";
import Svg, {
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
} from "react-native-svg";
const LogoutIcon = (props: SvgProps) => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    <Rect width={25} height={25} fill="url(#pattern0_79_654)" />
    <Defs>
      <Pattern
        id="pattern0_79_654"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_79_654" transform="scale(0.0111111)" />
      </Pattern>
      <Image
        id="image0_79_654"
        width={90}
        height={90}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJklEQVR4nO3dvW4TQRTF8ROKABIvQHjD8FGSNwCJhoKKinegQDxBIAWEl0BCogIHRVR/tNJECijYa2dnfXxyf/2O5x6tZm3P1axUSimllFJKKQmA28AT4CNwxu44a3N+BOzLGfAA+MLuOx1qkfGdnBDyhc+Wd3ZbLtI8lBvghDwf5AZYkGchN4SSG0LJDaHkhlByQyi5IZTcEEpuCCU3hJIbQskNoeSGUHJDKLkhlNwQSm4IpXG13wVetw3e78CLYWuvgp4+6CHkf73rEjahtLruvSW7S9OHTSiNq/3nkiGmDZtQGlf7yxXDTBc2oTS+p2UIs3/YhNL4+veBtyuGew/cqaCvsObN1j9sQmn9HPqGTShtlkW/sAmlDXULm1C6hi5hM6/fwFPg4DpBGNU1/qsf8zrqHfAW6nruNqHB/e4Jz1/XN7cJMceSsYW6vrpNKHXpeOY2oYuH4VE9DIPohn+9m41VyBX03+on+Aa0pvpTaUNWIbcPiSSnkG960NRW1mxBv1oxTG3OrjIi5FvAryVDVLvBhEGf/+fyaqCZeOl4c8Wl1RLWIeh7Lezz1h42NNRUk+PUQV8KfE+9EUpuCCU3hJIbQskNoeSGUHJDKLkhlNwQSm4IJTeEkhtCyQ2h5IZQchN6COwPuWnHtqc5lhvgMXkO5ab1Ngxn46f4ZHn0/KWXKZyGhHwgZ601anjFxvGOPSAXbc6HtndyKaWUUkoppWhL/gA8W92XIF47ywAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default LogoutIcon;
