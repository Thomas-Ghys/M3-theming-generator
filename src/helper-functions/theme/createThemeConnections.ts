import * as path from 'path';
import * as fs from 'fs';
import { GenerateArgs } from "../../types/arguments/GenerateArgs";
import { createFile } from '../file-manipulation/createFile';
import { ColorArg } from '../../types/colors/ColorArg';

export function createThemeConnections(generateArgs: GenerateArgs) {
    // For each theme type create a file that initialises all colors of that theme type
    const themeType: string[] = ['light', 'dark'];

    themeType.forEach((type) => {
        createFile(path.join(generateArgs.path.fullPath, 'theme'), `${type}-theme.scss`);
        createThemeTypeInitialisers(path.join(generateArgs.path.fullPath, 'theme', `${type}-theme.scss`), type, generateArgs.colors);
    });

    // Create the theme initialiser
    createThemeInitialiser(generateArgs.path.fullPath, themeType);
}

function createThemeTypeInitialisers(themeTypePath: string, type: string, colors: ColorArg[]) {
    // start a writing stream with the append flag enabled
    let writer = fs.createWriteStream(themeTypePath, {flags: 'a'});

    // For each color add the correct imports
    colors.forEach((color) => {
        writer.write(`@import './${type}-theme/${color.name}/${color.name}-${type}-theme.scss';\n`);
    });

    // Add the mixin line of the theme type initialiser file
    writer.write(`\n@mixin ${type}-theme() {`);

    // For each color connect to the correct theme file
    colors.forEach((color) => {
        writer.write(`\n\t@include ${(color.name !== 'neutral') ? color.name : 'surface' }-${type}-theme();`);
    });

    // Finish the file by closing the mixin
    writer.write('\n};');
}

function createThemeInitialiser(fullPath: string, themeTypes: string[]) {
    // Create the theme initialiser file
    createFile(fullPath, 'theme-initialiser.scss');

    // start a writing stream with the append flag enabled
    let writer = fs.createWriteStream(path.join(fullPath, 'theme-initialiser.scss'), {flags: 'a'});

    // For each theme type add an import to the correct theme type initialiser
    themeTypes.forEach((type) => {
        writer.write(`@import './theme/${type}-theme.scss'; \n`);
    });

    // Add the mixin line of the theme initialiser file
    writer.write(`\n@mixin theme-initialiser() {`);

    // For each theme type connect to the correct theme initialiser
    themeTypes.forEach((type) => {
        writer.write(`\n\t@include ${type}-theme();`);
    });

    // Finish the file by closing the mixin
    writer.write('\n};');
}