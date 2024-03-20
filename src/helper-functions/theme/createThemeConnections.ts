import * as path from 'path';
import * as fs from 'fs';
import { GenerateArgs } from "../../types/arguments/GenerateArgs";
import { createFile } from '../file-manipulation/createFile';
import { ColorArg } from '../../types/colors/ColorArg';

export function createThemeConnections(generateArgs: GenerateArgs) {
    // For each theme type create a file that initialises all colors of that theme type
    const themeType: string[] = ['light', 'dark'];

    // Create the color token initialiser
    createcolorTokenInitialisers(path.join(generateArgs.path.fullPath, 'color-tokens'), generateArgs.colors);

    // Create connections for each theme type
    themeType.forEach((type) => {
        createFile(path.join(generateArgs.path.fullPath, 'theme'), `${type}-theme.scss`);
        createThemeTypeInitialisers(path.join(generateArgs.path.fullPath, 'theme', `${type}-theme.scss`), type, generateArgs.colors);
    });

    // Create the theme initialiser
    createThemeInitialiser(generateArgs.path.fullPath, themeType);
}

function createcolorTokenInitialisers(colorTokenPath: string, colors: ColorArg[]) {
    // create color token initialiser file
    createFile(colorTokenPath, `color-tokens.scss`);

    // start a writing stream with the append flag enabled
    let writer = fs.createWriteStream(path.join(colorTokenPath, `color-tokens.scss`), { flags: 'a' });
    
    // For each color add the correct imports
    colors.forEach((color) => {
        writer.write(`@import './${color.name}/${color.name}-color-map.scss';\n`);
    });

    // add the mixin line of the color tokens initialisers file
    writer.write(`\n@mixin color-tokens() {`);

    // For each color connect to the correct color token file
    colors.forEach((color) => {
        writer.write(`\n\t@include ${color.name}-tokens();`);
    });

    // Finish the file by closing the mixin
    writer.write('\n};');
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
        writer.write(`\n\t@include ${color.name}-${type}-theme();`);
    });

    // Finish the file by closing the mixin
    writer.write('\n};');
}

function createThemeInitialiser(fullPath: string, themeTypes: string[]) {
    // Create the theme initialiser file
    createFile(fullPath, 'theme-initialiser.scss');

    // start a writing stream with the append flag enabled
    let writer = fs.createWriteStream(path.join(fullPath, 'theme-initialiser.scss'), { flags: 'a' });
    
    // import the color tokens initialiser
    writer.write(`@import './color-tokens/color-tokens.scss';\n`);

    // For each theme type add an import to the correct theme type initialiser
    themeTypes.forEach((type) => {
        writer.write(`@import './theme/${type}-theme.scss'; \n`);
    });

    // Add the mixin line of the theme initialiser file
    writer.write(`\n@mixin theme-initialiser() {`);

    // include the color tokens
    writer.write('\n\t@include color-tokens();');

    // For each theme type connect to the correct theme initialiser
    themeTypes.forEach((type) => {
        writer.write(`\n\t@include ${type}-theme();`);
    });

    // Finish the file by closing the mixin
    writer.write('\n};');
}