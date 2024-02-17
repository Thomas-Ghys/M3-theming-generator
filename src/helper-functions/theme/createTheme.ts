import * as path from 'path';
import { createFile } from "../file-manipulation/createFile";
import { GenerateArgs } from '../../types/arguments/GenerateArgs';
import { createColorTokens } from '../colors/createColorTokens';

// Create the theme according to the templates and provided colors
export function createTheme(generateArgs: GenerateArgs) {
    // Loop through all the colors that were provided in the generate command
    generateArgs.colors.forEach((color) => {
        // Create the theme color tokens for each color
        const colorFilePath = path.join(generateArgs.path.fullPath, 'color-tokens', color.name);

        // Create the color file at the correct path
        createFile(colorFilePath, `${color.name}-color-map.scss`);

        // Fill the file with corrresponding tokens
        createColorTokens(path.join(colorFilePath, `${color.name}-color-map.scss`), color);

        // Create the theme tokens for each color


        // Create the theme for each color
    })

    // Create theme connections
}