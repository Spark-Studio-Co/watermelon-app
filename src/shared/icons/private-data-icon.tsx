import * as React from "react";
import Svg, {
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
} from "react-native-svg";

const PrivateDataIcon = (props: SvgProps) => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    <Rect width={25} height={25} fill="url(#pattern0_205_887)" />
    <Defs>
      <Pattern
        id="pattern0_205_887"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_205_887" transform="scale(0.0111111)" />
      </Pattern>
      <Image
        id="image0_205_887"
        width={90}
        height={90}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2klEQVR4nO2cS2tUSRSAj4oTX4i6MMGtj1F3vnUlyGyj8fUvHPwFPkBx5SILBfG587FTIXF0YUDcRIMLBfGRGccIM25kMBFEMXxSdDU0Ys+te2/17ZtT59t0miRVXV9O6p5zbnWLGIZhGIZhGIZhGJ0DmAXsAI4BfwB/AZPANPAeeAbcBg4D6zv4UnQCLPTyxsnHKHAQmNPtNdQeYD/wjnI8BTZ2ey21BJgHXCIeX4HTwGXglX/+xX99BfjNbU2SEsBiYITqeQislYQieYTu8R+wU7RD3O2ijOxfRfmFry48EMUp3DvqxS7RBo08ORRXoFwF+oE+YK5/3A1c89+PwSVRWPGNBy7eVYMbMsbbBLyJIPqFaIJGWR0qeXngmL0RtqJPogkavYssprMiuc0f8FsJ0VOiCRoNoiyuFhzbNZmK8lw0QWNLyKK/4Nh7S4i+KJoAPgUsuq/g2KtLiD4tmiBsH/2lRN+kKK7xtEm0AEzVNKKbLVYd/Ww6u0cv9LIXASuBAeBWzmzkgGgAuBOw2GuR53Sp30Sg6FFJLI/eGHne3hwV5DqZ6QDbAxfrpPRGnntzYG/kd0ms1zHh/u0jz389YN6bkmD37puv+FwxssqncGvcha/g3HsC5nwqGgAW5Lg4tWNVwblXBIz9XrQA7CspelHBeXsCxv4qmgAulBC9soMRPSmaoBFd9wuKHig4pytishgXbdC4uN0rIPpWwfluBIw9JBoBlvsDjOTMRnKlfsCWwDz6iGgDWAqMUYyJ0KImZ2W4TTRBOclN3mS1N30kh0p+repcHnEkN5n2Fd+Azyp6/OOA35PzHEk4JFogruSY/A3MFw1QX8mOPZKw5Emq4ZxoAFgCPMq5+Cc+W7hLZ3FHh3sk0Ugec7/XUtQUrSCzcOMultQlN/GZxPnIks9ZJLfBp2xvI2QXSV/4xn6M5DZjz3e3m3xxkQf384dST+HGQiT/ZK5twFFgGPgT+OjH++hvmQ253gWwVTRB8exiWbdf+4wBk2ySVYBFsklWARbJJlkFFskVYJIrwCRXgEmuAJNcASa53jdSh1U01Gscya24tyLP6/Y6tEtuYrIrkNzEZFcguYnJrvAE0XDyF8gKj2kNSqpElnzCR247plQdie2S5OMtB13ayf4MzJaU8B9XORpTcpP/kX1ZUgM41QnJP8ge9NvFZ//Jt4XeGzijAf6NIPlE4Hu/09uXW7aNGAx2ey21B/gQIPJxxgeZTCUbraEAZ0POwlkWURIv8WUbyaOtBw4ti4jT2zjTso38A5z8WXvTsohIhPaOk84iDMMwDMMwDMOQsnwHvQdxCPRa4ykAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default PrivateDataIcon;
