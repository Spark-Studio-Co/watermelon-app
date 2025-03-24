import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const StandardPointIcon = (props: SvgProps) => (
    <Svg
        width={57}
        height={57}
        viewBox="0 0 57 57"
        fill="none"
        {...props}
    >
        <Rect width={57} height={57} fill="url(#pattern0_22_1585)" />
        <Defs>
            <Pattern
                id="pattern0_22_1585"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_22_1585" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_22_1585"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGF0lEQVR4nO2dW4gcRRSGy/v9hon3SxSVGBTvGp+CkhdFjYooiIpK0IiIGtSoBEHRaDAJRkHyICg+5EFj8EmJ6IsR3VwUJQYVryHGdd1lZ+r/q2ejm6Tk7DQoEiczOz2nqqfrgwPLTs/uqfNPT3VXnXPamEQikUgkEolEYgLv/cEAzs6y7CKSswHMEZOf5XcApnvvD2oenSiUWq12pLX2OgDLAHwA4BcAu0j6VibH5MeuAbDUWnvt6OjoEUmeSdBoNE4G8ASADQB27Cn47Zr8LQDrATyeZdlJSZwWeO/3IXkLgI8A7CxKhBbi7ATwIcmbvfd7J3H+EWI/59wdJL/ttQgt7EeSD3rvD6i0MNbaa0j+FFAI/x/7wTl3lakajUbjVJLvRiCA/x9bLfOYqQIAbiBZiyDofg9mZU4z/Yp8PwNYHkGgfScG4M2+u6ep1+tHkfwkdHA5eRuw1h5t+gHn3PEAvoogqL5L21z6eaVWq00DsCWCYPoiTO785YLElBEAU0h+EzqILN6+J3msKRPDw8OHAdgYQfB8j86U9UNDQ4easkByVeigsff2likDJB+IIFhe6UyZZ2LGOXchgO0VEmTMOXeeiXW1FsAXoYNEfVE2ythNbMhqaejgMJwo95mYcM4dl6/9+IraKMljTCwAeCmCoPjAZ8mLJgZkjYdNfMXNAZgaw9yxKIJg+EjsmaBieO/3JzkSQSB8JDYsMQkmCIAbIwiCj8kkZSmYIJFvw/pA9nYQMSTpDMCfEQTAx2SyUiGLq+qCSCZg4ME7ku8AWGitvVNMfpYEhfy1YL45565WF0RSOwMNeITkw632ueU1OSbUBQeAJSEE+TLAYD/u5Fpf7p5Jrg0gyOcmQAbJDuVBvjeZS0p5D4D3lX0dl4xMowWAGcqfuu+6yVyXDPp861VTlOmmX+8/XAHpnXnaqqYgc4wWAB5THNxAgX6vV/wQPWK0IPm8oiDzi/LbWvuoot/PGS0AvKL4SbugKL/zEjgVvwG8bLQA8IbiwKYU5Xd+Gax1hrxutACwUmtgvsAiGvlbih+klUYLkiu0BtYoMJ9WUlsVz5BXjRYkFysO7MoC/Z6t6PcLRgupkNUaGIBlBfqtVp8CYEFRfrczsHmKA9smjQK69XlwcPAQAIOKft9jtCB5hdbA2Bzck936nC/Na/o8y2gha0PtdFMocHBj1tqZk/XXWnu5ZoqrxEZiZDTRLsQB8BvJczv1U96j+VWV28+9iXp8++nCrd77vfbknxxD8raJd+j7udpoQ/L+AAP1uQ1IS4zd7V3L7+Q1kusqVaYgzVs05xHufuDbAWySzavcNoUuh5AeKlmWnWBCIN16Qg6ecdqnQcTQvkFkSUyW+EMKMhVAI3QQGIlJLIpcnZ4UJF8LHQjGYyuCipELck7oyZ3xWMf3ST0hzxb0FbdVJhbq9frpoS83GdAkx7ler59hYkJKukIHhuFskYmNPBv+1wqeHVtGRkYONzGSNzWuzASPZvfUwnY0e0KVKnIRS+VtK6QUoAodHQBsKE1bWVlck63XPhZjsHSdsbV36ai7e3mZKSMAbtKuI2FvxRgHcL0pM8652zV6ubP3Yuyy1t5t+gEA95ZZFDQb9+ul9Wgge+EA/iqhGONS4Wv6ESmlBpCFDjLbNxekxFkT59z5ZejlC2BblmUXmyqQZdmJmuVl7NwGpCO3qRLe+30lQzymtS80n1u1PGhHn9BI95xIWjyNSKVu6HhEQaPROCXw0xPWlm4pRKnN7ALlpOgx+Z9RtnmNBQAzlCb8dfJwytDjLc2ED+ApuSnr0XrUQvkfocdZOqy1MwFsLVCMrd3UmSTMhChnAfi9ADEGrbVnpqAWAIBZ3Szjl2Lvu2wAWNLFGbI4tP99x3DzqT0dl6YBGIo2TafsYBLl2ADmhva7358ovbkDMb5ON309BsDcdgWx1t7Va38qj2824BxqQ5A/vPcHVj5gGpB8tg1Bnk5iKFGr1U5rtY+Sd1KYlgRRhK3r0D9LYihDcn4LQR5KgoSpAM5283WVRfHooareKOJfc0m+J95fCW1lo16vXwpgqViWZZeE9ieRSCRMdfgbXNAvLwLyMbwAAAAASUVORK5CYII="
            />
        </Defs>
    </Svg>
);
export default StandardPointIcon;
