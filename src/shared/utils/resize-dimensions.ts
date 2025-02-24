import {
    heightPercentageToDP,
    IOSStatusBar,
    widthPercentageToDP,
} from "./window-dimensions";

const Size = (num: number) =>
    Math.sqrt(
        heightPercentageToDP("100%") * heightPercentageToDP("100%") +
        widthPercentageToDP("100%") * widthPercentageToDP("100%")
    ) *
    (num / 100);
const hp = (num: number) => heightPercentageToDP(`${num}%`);
const wp = (num: number) => widthPercentageToDP(`${num}%`);
const IOS = IOSStatusBar() > 20 ? 0 : IOSStatusBar();
export { Size, hp, wp, IOS };