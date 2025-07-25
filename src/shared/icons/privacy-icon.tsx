import * as React from "react";
import Svg, {
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
} from "react-native-svg";

const PrivacyIcon = (props: SvgProps) => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    <Rect width={25} height={25} fill="url(#pattern0_205_890)" />
    <Defs>
      <Pattern
        id="pattern0_205_890"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_205_890" transform="scale(0.0111111)" />
      </Pattern>
      <Image
        id="image0_205_890"
        width={90}
        height={90}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD8klEQVR4nO2dO4xNQRjHh8SbgooVEhXinQgaz6BBoRGFKMQ7QYNVoBCChEIUCkJBiKgl4lEQ7yBE4xGFZ8Q7rOdGfjLZSbD2YPd+882ZOfNLbnMze+f3/XPv2XNm5swxJpPJZDKZTCaTyWQyvwN0AAYAE4H5wAZgF3AQOA5cAu4AD4A37tXATxp+ef+Ba3vR/e1B91kb3GdPdH11MCkC9ALGA0uA7cAR4DzwBPiOPt9d39bhsHNa4hx7mbIDdAHGAUuB3cAZ4Dnx8dy573a1jLW1hQ63M7ACuAI0ki6NwFVgla1ZO+S+wC2qxy1bu1bInYCbVJebNgONoO1PqOqs1AjaHq+qzmWNoD+GrrIENGgEnQFy0ErkoJVINeiTwEJgINDNvQYBi4BTIYRSC/ouMOE/nOyg0T1NsZSCPgv0bOUA1jktuVSCvtuakJuFfV9D0E+6vxejweQa/OxhxDuyqbZciG9OCjie9i0pk+bfi/DNwoJ+O7qB+mfAU2Cbfa+g7WLfkikEPbCgXxtsc7YWtLWnfl5JIejuBf3ab3JznhW07e5bMvqgTSv7LZunGKEKQKi9b08xQhWAUHvfnmKEKgCh9r49xQhVAELtfXuKEaoAhNr79hRDcA3HV2AtUKfgXAfUuz4laDQK0r+uf6uFeu+yf7rbsCX4oCH7Wki2zrtsy99sCV5qyIoMQ5pASLjblasaonYlZs2YQEhNSmiIHpMwNYGQcAeOaoi2NIrWakwgJNyBLRqiCyRMTSAk3O1dBBqiYyRMTSAk3IHRWst2v9RqagIhEPLnopkdH7KXKxz0RU3ZTRUOeoum7OgKBz1BU7adu42sakG/Vr9XEdhTwaD3hhCeXsGgp4YQbuduC65K0PeA9qGkV1Yo6OUmoHQP4F1E49F92+j6tmhhj6b8zohmWNa10XWHtmvRt6Qt01tf3dRS2ecMP4T49bUIsJF0WW9Kto3EQ9LjMdDVlAlgHukx15QNd15tb1NLhRO2JlNG3D+dV8TPS6CPKTPAbOJnjokB4ADxst/EgttvyW6nFhvXSneW8S+A3sAj4uGp2n5J0gCjBBdF+sRe/Y0wMWPHcIFPlBfrNsWkADDNTdOXDTv2McOkBDBTYj2IINZlpkkRYFIN49eSvLdTcSZlgCGBz0bsHbgjTRUA+gPXA50n9zNVgqaLmn2KIR+K7mJEEmCZ59M/+9lLQ9dZCoDBwA0PId8Ghoeur1TQtBx4M/BN6Px4k9ry2hgBhrm9+tvKBWBo6DqiAZjlHpLwvzxyD04o56xIBIeTNW7Go4gXwGqVzbNTh6YtMpe5Q8pb90iQ8+6JE91C+2UymUwmk8lkMpmMiZkfoNCjMA37DZQAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default PrivacyIcon;
