
import { createColorArray } from '../common/createColorArray';
import { ColorMap } from '../types/colorMap';
import * as fs from 'fs';

export function addColor(destinationPathName: string, color: string) {
    var logger = fs.createWriteStream(destinationPathName, {
        flags: 'a'
    });

    logger.write(`\n$${color.split('=')[0]}: (`);

    createColorArray(color).forEach((color: ColorMap) => {
        logger.write(`\n\t$${Object.keys(color)[0]}: ${color[Object.keys(color)[0]]},`);
    });

    logger.write('\n);');
}