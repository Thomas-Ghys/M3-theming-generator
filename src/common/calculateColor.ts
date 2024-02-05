import { RGB } from "../types/RGB";

export function calculateColor(hexInput: string, percentagemodifier: number): string {
    let rgbConvertedInput: RGB = convertHexToRGB(hexInput);

    let percentageModifiedRGB: RGB = {
        red: adjustedColor(rgbConvertedInput.red, percentagemodifier),
        green: adjustedColor(rgbConvertedInput.green, percentagemodifier),
        blue: adjustedColor(rgbConvertedInput.blue, percentagemodifier)
    }

    return convertRGBToHex(percentageModifiedRGB);
}

export function adjustedColor(inputColor: number, percentagemodifier: number): number {
    if (percentagemodifier <= 0.4) {
        return 0 + (((percentagemodifier) / 40) * 100) * (inputColor - 0);
    }
    return inputColor + (((percentagemodifier - 0.4) / 60) * 100) * (255 - inputColor);
}

export function convertRGBToHex(rgb: RGB): string {
    return '#' + (1 << 24 | rgb.red << 16 | rgb.green << 8 | rgb.blue).toString(16).slice(1);
}

export function convertHexToRGB(hexInput: string): RGB {
    let shortedhexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    let filledHex = hexInput.replace(shortedhexRegex, function(hashtag, red, green, blue) {
        return red + red + green + green + blue + blue;
    })

    var calculatedRGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(filledHex);

    return calculatedRGB ? {
        red: parseInt(calculatedRGB[1], 16),
        green: parseInt(calculatedRGB[2], 16),
        blue: parseInt(calculatedRGB[3], 16),
    }: null;
}