
import { createColorArray } from './createColorArray';
import { ColorMap } from '../../types/colorMap';
import * as fs from 'fs';

// Create the color tokens, and write them to a file
export function addColor(destinationPathName: string, color: string) {
    // Starts a write stream with the append flag so as to not overwrite existing lines
    var logger = fs.createWriteStream(destinationPathName, {
        flags: 'a'
    });

    logger.write(`:root {`);
    createColorArray(color).forEach((color: ColorMap) => {
        logger.write(`\n\t--md-ref-palette-${Object.keys(color)[0]}: ${color[Object.keys(color)[0]]},`);
    });

    logger.write('\n};');
}