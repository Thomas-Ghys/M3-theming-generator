import * as path from 'path';
import { createFile } from "../file-manipulation/createFile";
import { GenerateArgs } from '../../types/arguments/GenerateArgs';
import { createColorTokens } from '../colors/createColorTokens';
import { createThemeTokens } from './createThemeTokens';
import { createThemeFiles } from './createThemeFiles';

// Create the theme according to the templates and provided colors
export function createTheme(generateArgs: GenerateArgs) {
    // Loop through all the colors that were provided in the generate command
    generateArgs.colors.forEach((color) => {
        // Create the file path for the color file
        const colorFilePath = path.join(generateArgs.path.fullPath, 'color-tokens', color.name);
        // Create the color file at the correct path
        createFile(colorFilePath, `${color.name}-color-map.scss`);
        // Fill the file with corrresponding tokens
        createColorTokens(path.join(colorFilePath, `${color.name}-color-map.scss`), color);

        // Create the theme tokens for each color
        createThemeTokens(generateArgs.path.fullPath, color.name);

        // Create the theme for each color
        createThemeFiles(generateArgs.path.fullPath, color.name);
    });

    // Create theme connections
}