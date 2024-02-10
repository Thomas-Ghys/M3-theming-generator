import { ColorMap } from "../../types/colorMap";
import { calculateColor } from "./calculateColor";

export function createColorArray(color: string): ColorMap[] {
    const rootKey = color.split('=')[0];
    const colorInput = color.split('=')[1];
    const colorMap: ColorMap[] = [];
    const blackColor: ColorMap = {
        [`${rootKey}-0`]: 'rgb(0, 0, 0)'
    };
    const whiteColor: ColorMap = {
        [`${rootKey}-100`]: 'rgb(255, 255, 255)'
    };

    colorMap.push(blackColor);

    for (let colorPercentile = 1; colorPercentile < 100; colorPercentile++) {
        const calculatedColor: ColorMap = {
            [`${rootKey}-${colorPercentile}`]: calculateColor(colorInput, (colorPercentile / 100), 'rgb')
        }
        colorMap.push(calculatedColor);
    }

    colorMap.push(whiteColor);
    
    return colorMap;
}