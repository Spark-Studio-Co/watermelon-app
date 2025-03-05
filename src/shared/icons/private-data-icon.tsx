import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";

const PrivateDataIcon = (props: SvgProps) => (
    <Svg
        width={35}
        height={35}
        viewBox="0 0 35 35"
        fill="none"
        {...props}
    >
        <Rect width={35} height={35} fill="url(#pattern0_644_1574)" />
        <Defs>
            <Pattern
                id="pattern0_644_1574"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_644_1574" transform="scale(0.01)" />
            </Pattern>
            <Image
                id="image0_644_1574"
                width={100}
                height={100}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECUlEQVR4nO2dS4sVRxiGyywk6koUN26MN4J4A0kWcaGORv0BgRAycZ2VKIhuJ9GJbr3gBXHjSgIq+gMUFE2QZJGbuIruZiWn+n2rFdFYUlgQA2HsM+d0VV/eBz4Y5kyf6f6eru66dFUbI4QQQgghhBBCCCFEz7DWrnTO7XPOHQJwpA/hnDvknPtmMBh8ZJoCyQmSP5H0PY/7JHdkE+G9/4Dk8QYkwjclALwmOR1yk1yIZHA2OdOpZUzEsyH7WckGRsxNusuX7hmsIuZ+EhmDwWBF7jOQLYkkta9Qtc19oGxPTNYuJNS/G3Cgvg0RclW7EJJTuQ+U7YkpCWF2CRLC/ImXEOZPtoQwJgHAb6E1THJ7URRrZmZmFoUIP4ffhc8A/C4h9Z9xP4degqo3yqIoPiN5RyVkzCIAvCS5fy41Fu/9PJIHAbzSJWs8Mp6R/HzU6qNzbnf8Lt1DRuyk+8qMCQBfJO4U7VY7BMDJce8/gDMSMjchtiiKJTUIWUqyUAkZXsh3piZIHpWQ4S9X62oUskFChhPyd10y3pHyWDf16kKuJRByQ0KqCzmbQMh5CWnQUxskf5CQ6kLOJRByQUKqC7meQMhNCWlQLQvAEwkZruq7vi4ZzrlNaocM31L/vi4hJI9JyPBCQHLZuGWoL2u07pMz4xYS2jiJSkf3ut/5Nr4e475PJt737gkB8Mw5t2fU/XbO7QXwXELGI+VVGBcP4+PDigjbxGl2GlOvobQ8ILmzqgwAW0neTVwqun3J4v+L+SPO4JooimLtO89lrQ3CwmcA/sy9n70RwvaEhDC/BAlh/sRLCPMnW0KYP8ESwvxJlRDmT6SENCB5XkKGn5LwiORVAKfipJywKs+3oQMyRPg5zhKejn9zNWwTt5WQEZPwOD6q82UYPfTez59rYzZsG74jfteFRMO37W8YAviF5AEAH9d9HOF/xIk8v0rIfyW8IPkjyV0mE2VZbokl53lvS0jsDr9YluVy0xDKslxO8hKAf/om5K+yLD8xDcVa+ynJh70QAuCK936haTje+w8BXO60EACnTYvw3s8bcQpco4Vcn8sQbG7itOobXRPy1Fq72LSUoiiWkBx0SUj9O1Yz4UnKLgnZaFqOc25zZ4R47xeYluO9X9gZIaYjUEKaRWeEhIX6Tcux1q7ujBAAt6y1q0xLsdauAnC7M0J6HFMSwuwSJIT5Ey8hzJ/sZgjRUuOsLATA4dqFaDF+Nmsxfr2ugpWFJHtZWHwBVu7rs2943EsiIwrZoVcecbZ7x2sA25IJSbi8kW9p1LYKxftemxce2dTLwfhvyQjLdmQdqo6L3+ueQt5LfpmajVCjCNW82E450YfA22OdDDXP3PkXQgghhBBCCCGEEMIk5g39zl2iUoGwIgAAAABJRU5ErkJggg=="
            />
        </Defs>
    </Svg>
);
export default PrivateDataIcon;
