import * as fs from 'fs';
import { ColorArg } from "../../types/colors/ColorArg";
import { ColorMap } from '../../types/colorMap';
import { RGB } from '../../types/colors/RGB';

// Create all the tokens for the provided color and write them into the provided file
export function createColorTokens(colorTokenFilePath: string, color: ColorArg) {
    // Start a writing stream with the append flag enabled
    let writer = fs.createWriteStream(colorTokenFilePath, {flags: 'a'});

    // Add the mixin
    writer.write(`@mixin ${color.name}-tokens() {`)
    // Add the beginning line of the color file
    writer.write('\n\t:root {');

    // Create all the tokens by calculating te linear map from black to white
    calculateLinearColorMap(color).forEach((color: ColorMap) => {
        // Write the calculated color to the provided file in the correct way
        writer.write(`\n\t\t--md-ref-palette-${Object.keys(color)[0]}: ${color[Object.keys(color)[0]]};`);
    });

    // Finish the file by closing the beginning file and mixin
    writer.write('\n\t};');
    writer.write('\n};');
}

// Create a linear map of colors starting from black, to white placing the provided color at the 40% mark
function calculateLinearColorMap(color: ColorArg): ColorMap[] {
    // Initialise the color map and place black as the starting value
    const linearColorMap: ColorMap[] = [{
            [`${color.name}-0`]: 'rgb(0, 0, 0)'
    }];

    // Calculate the colors for every percentage in the linear line
    for (let colorPercentile = 1; colorPercentile < 100; colorPercentile++) {
        linearColorMap.push({
            [`${color.name}-${colorPercentile}`]: calculateColorPercentage(color.hex, colorPercentile)
        });
    }

    // Finis up the linear map with the white value
    linearColorMap.push({
        [`${color.name}-100`]: 'rgb(255, 255, 255)'
    });

    // Return the finalised map
    return linearColorMap;
}

function calculateColorPercentage(hexColor: string, colorPercentage: number): string {
    // Create RGB value from the hex input
    const rgbInput: RGB = convertHexToRGB(hexColor);

    // Call the mapColor function for each individual color shade and return the full rgb color
    return `rgb(${mapColor(rgbInput.red, colorPercentage)}, ${mapColor(rgbInput.green, colorPercentage)}, ${mapColor(rgbInput.blue, colorPercentage)})`;
}

// Map a color value to the linear line of black to white with the provided color at the 40% mark
function mapColor(colorShade: number, colorPercentage: number): number {
    // Check if the color percentage is lower than 40%
    if (colorPercentage <= 40) {
        // return the rounded calculation for values going from 0 to 40%
        // calculation: minValue + colorPercentage converted to a number divided by the target 40% range times the origin 100% range *  the original color - minValue
        return Math.round(0 + (((colorPercentage / 100) / 40) * 100) * (colorShade - 0));
    }

    // return the rounded calculation for values going from 40% to 100%
    // calculation: original color + colorPercentage converted to a number adjusted to put the 40% mark at 0 divided by the target 60% range times the origin 100% range * maxValue - original color
    return Math.round(colorShade + ((((colorPercentage / 100) - 0.4) / 60) * 100) * (255 - colorShade));
}

// Convert a hex value to RGB
function convertHexToRGB(hexColor: string): RGB {
    // Fill the hex value if the input value is a shorted hex
    const filledHexColor = hexColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(hashtag, red, green, blue) {
        return red + red + green + green + blue + blue;
    });

    // Replace the hex with their corresponding rgb number
    const convertedHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(filledHexColor);

    return {
        red: parseInt(convertedHex[1], 16),
        green: parseInt(convertedHex[2], 16),
        blue: parseInt(convertedHex[3], 16)
    }
}

// Convert a RGB value to hex
function convertRGBToHex(rgb: RGB): string {
    // Left shift the bits and convert them to a string
    return '#' + (1 << 24 | rgb.red << 16 | rgb.green << 8 | rgb.blue).toString(16).slice(1);
}