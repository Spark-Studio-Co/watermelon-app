import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const CrossIcon = (props: SvgProps) => (
    <Svg
        width={34}
        height={34}
        viewBox="0 0 34 34"
        fill="none"
        {...props}
    >
        <Path fill="url(#a)" d="M0 0h34v34H0z" />
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
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAUlEQVR4nO3dXW7TQBQF4DwjfrYBLAPClvhbC7SlUB6yBtqH2QHtKqJEeTj3mV40wpVQlbhJas+5njlHmlf/3C+eqWdqezZTFEVRFEVRFEVRFEVRFEVhBcBrAJ/M7NTMFo2103zuAF7N2NlsNi8A/ARwa2becgNwC+BivV4/Z2LcsAthwRqAawpKvjLYJ29BG4DvjDGj+W7K+ruvcmMKgM/sX6EFbwA+FgPp/pqin7TFbl9LgiwCnLAHbwuBGB1BIMYvvECMX2yBGL/AAjF+UQVi/EIKJEDxXCD8grlA+EVygfQUAcAZgJer1eqZmb3NU9elC9ft800+hnws+ZhavVM/ub9dd38C4FdBkLRcLp/eP46BUKYFkn+N27bt/1CuClwZV3lfu5YXmgPJXcSu7fvIKH0YOXnFrzmQPGb07cNHQnkIozu/d82B5MH0ocL4wCj7YHT7vGkOpG9QHWmg33dflwOd2yRBSqGkwhiTBhkbJREwJg8yFkoiYVQB4gOjMDGqAfGBUNgYVYH4I1EiYFQH4keiRMGoEsQPRImEUS2I73t3Xfquv1kQ2/NKCXRlNAHix6KQMJoA8UNRiBjNgPi+KGQMgQRYDm4SJB3RZbFQqgdJjxjUGShVg6QB/uwtjVInCHRjGAokHTAdUnI5uMkrJB0xNxUJpSqQ9IiJwigo1YCkAWZtI6BUAZIGnEJno0weJI2wnsFEmTTImItLiYQyWZASK32JgDJJkJLLrqkwyrRAgv+z9XVzIMEfR5g3B6IHduJ1WVvfuOZ6pI0GchZg2TXteOjzvLku6w4lP2DZPdM3Z7zltBvA5/kYundJfhto29MDqbwtBGJ0BIEYv/ACMX6xBWL8AgvE+EUViPELKZAAxXOB8AvmAuEXyWsFOQlwwh68fSkGos9VWKzPVeSpc33Qxfow/ux6Y96YKBcBugWP2PL0/ax0uunq4m8RteANwG/al9o6lB/qvuyumzqnYWwZUz40/GHJ98XHDEVRFEVRFEVRFEVRFEVRlNl/+QtR+G/iqfhrUAAAAABJRU5ErkJggg=="
            />
        </Defs>
    </Svg>
);
export default CrossIcon;
