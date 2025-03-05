import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const CrownIcon = (props: SvgProps) => (
    <Svg
        width={31}
        height={31}
        viewBox="0 0 31 31"
        fill="none"
        {...props}
    >
        <Rect width={31} height={31} fill="url(#pattern0_644_1612)" />
        <Defs>
            <Pattern
                id="pattern0_644_1612"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_644_1612" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_644_1612"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE/UlEQVR4nO2dS4gcVRSGSyUoovGBCG584AMfG7c+wCBuEnzgImCMiKIbcURQfEJE3PkgIsqooMZEI5hVIMuAEtCtiREhoqBZiGlnmKr7/2UnaJwrZ6iGcWboqVt1z62a6fPBD73ovn3P+atu1TlVXZ1lhmEYhmEYhrGMoiiuLstyi0heL3+HkQQA9wP4gaRfLABHAdxnNiQEwFtLjVhBb5gpCSD5VA0zRnrSTFGkKIqLSRYBhuRFUVxkpigB4PEAMxbknHvUDFGC5PuhhgB4zwxRAsDuBobsNkOUIPlaqCEkXzVD9Ay5s4Ehm8wQJbz3ZwA4ErBcfWdmKAPgepKuhiHCTWZIAgDcBuD4mD3juHPuVjMjISS3jtk7tpoZCfHenwng8Jg95Ki8x0xJBMmHahxDtpshCfDebyD5Sw1DfvXen72uTAFwI4CXSO4SyWsAN3Q5J5JTATXI1LrI39zc3AUAvgAwv8L6PA9g7+zs7MYsMYPB4DwAJwLqkBPymdTzjJq/arBlV+JWOnCmNgXAjga9rB0p5xg9f+JsQLCfJYkyW5jXJTULwqVy8tmE84yXv2rNmw8YcD7VMQXAzgZmjOa5M9Ec4+YPwMsNgn1RO9DhcHg5gFMtDDklY2jPM3r+qrOB0IA/ThDop03NWKRd2vOMnj+SnzQY8APtZiKAf9oaAuC0drOR5IcN5vZR1F2O5LPKQe6PsHeMtF9zrs6556IuWXKACTwonR4Oh1coBnhLRDMWJGNqzTfP8yurPbFu/v6VFWDsoFK0BAw4KMvyZq0ASR6KbYiMqTVfyYXkJCB/e1YdVIoVKVpC9hKS03LPVOTgtiiYsSAZW+F+senAveP72oV1ZcrnIcsXyVkAT3jvz4rUXj+iZYiMHaM9L7FKzBJ74DK1p1GXozqmvFCdzn1T8wsPA7i9TaAkt2uZEas9LzGOuyazRN9WzcXnVz1mBCRpU2DAB5oUY75+e72tGrXny7K8TLbwwJOfO7LYOOeua7A0/CX3RXnvz1G6mdq31FTghvJ0k36ac+7aLDbSxm4R+M/OubvrfAeAPxIa8ufMzMz5q82L5F0kf2z6PWqXAEiiTQIAHBzXTAPwSkIzVm3PF0VxDcl9Lb/DqZhRGfJThAT8DeCdpVtmi/a6bynh0sVz8d6fK0stgJMRxj+mZgiAryNumb+XZfmw3I1Yjf12B2Ysa8875+4B8FvEsb/qxcWXAB2S40ukrdE3TNpJmYNGZ0By1vVv+0z8nyFvqhkinV1LOEM3uGc0DdlmhjDUkAc0DQmt1ide0KjS21Trky6nUaVHqtYnUgPtG/XaVusTJqdqRqxqfYJ0TN2QmNX6ehc0q3Tlan1dCsDeFIZYtc4eVOkjrFpnP6r0RYY82PVSwLWjbSkMsWqdPajSR1i1zn5U6SOsWmdtQ5L9nK667Nn1+ux7LiQxozLEqnX2oEofYdU6+1Glj5AHu1TPGjFx5RzYw28MwzAMwzDWPBHuCJ8E7TND2LkJZgi7T7wZwu6TbYaw+wSbIew+qWvDEABf9iBg32dJjlKeZU13HTB7LgDvJjMEwGNdB8yeyzn3SJ//nGvSlOd5fmGWEvlLuh4E7vsoeSBN1gVyq2TXwbN/ej3rEufcvfLspx4kwncpeTJQnceHJCPP86vKstw8adfZy7LcLLF3nX/DMAzDMAzDMAzDMAzDMAzDMIxsjfAfhZ+cBzJlHrMAAAAASUVORK5CYII="
            />
        </Defs>
    </Svg>
);
export default CrownIcon;
