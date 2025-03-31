import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const MarkIcon = (props: SvgProps) => (
    <Svg
        width={35}
        height={36}
        viewBox="0 0 35 36"
        fill="none"
        {...props}
    >
        <Path fill="url(#a)" d="M0 0h35v36H0z" />
        <Defs>
            <Pattern
                id="a"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#b" transform="matrix(.01 0 0 .00972 0 .014)" />
            </Pattern>
            <Image
                id="b"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADbElEQVR4nO2dvWsUURTFRws1CGIlaiGCjbXxs/BfsPWzF0UsokbsUloIfmBnr0bsBC3t7W1EsUrWIjA758xsYZErD1YIQZPNJjv3vtnzg9POcu8vb96bSbK3KIQQQgghhBBCCCGEmFLMbHfTNGdIXic5B+Bhl0JyLtXWNM3pVGsRlaZpjgJ4AaBH0qYhAJYBPK/r+kgRBTPbBeARgMa7QfRLnVZP6oW3jBmS7wI0xCIEwGLqiefKeOPdBMbLe5eVkm5TAYq3iEm3r9Y38HTf9C6ccVO3utGn01SAoi1yADxrRUY6e0/T0ZbjC/nVynNKv98/610sM0l6eJy4EJI3vAtlPrk6cSF1Xd8PUKhlknsTF0JyIUChlkkWJITuEiSE/o2XEPo3W0Lo32AJoX9TJYT+jZSQAM0zCfFvmElIJgHwEcDN4ZuJr2NeRw+G3L6IVZJ31z5hm9leAJ8lhK2vilUAt3fwLbdWCCcgI7GysnJAQui/Mv4C4KKEMIYMM9sH4IuEcPIySN7ZRMYekh/G/AztIYwjQ0IYS4aEMJYMCWEsGRLCWDIkhLFkSAhjyZAQxpIhIYwlQ0IYS0Z8IcP3Ri/7/f6JsiwPkry8039Jj9HfTX2asIz4Qki+Wn+9siyPk/zZQRkWXkhd16f+dc3BYHCM5I+O3KbyEQLg5P+uu52VgngrIxsh8xtduxxDSmAZWQhpqqo6t1NSEFtGfCHDVFVVnd/oMwYj7ClB94wshWxbCvKQkZWQsaUgHxnZCdmyFOQlI0shW5HyPTMZ2QpJ6W92+ur1evsDn6Y6J2SklZLRyuiEEBtHSmAZnRBiW5ESXEZnhNgoUjKQ0SkhtpGUTGR0TogNT18X1smYCXiamhohBuA3gCdVVV0CcIvktwCNnl4hzDsSQn8JEkL/xksI/ZstIfRvsITQv6kSQv9G5iNEX4LJcF+CeS3AT55lkisTFzKcnuNdqOWQpmlm2/qq8WXvYhk8AJZaG1uRxvx4F8zgAfC0aAuSh0jCu2jGTZpXcbhok+HEMu/CLWKqqnpQOI08eu1dPOPFZ+TRml8WLQZogkUIgLduQ8HWrZT5KR+BxPTA7D42by1p5lIa8zNNR2IAS+k01foGPsbo1dnhE30aU/q4Y5lLtaV/zwu1IoQQQgghhBBCCCGEKNrlDyvpjp1V+ongAAAAAElFTkSuQmCC"
            />
        </Defs>
    </Svg>
);
export default MarkIcon;
