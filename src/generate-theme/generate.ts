import * as fs from 'fs';
import * as path from 'path';
import { addColor } from '../common/color-calculations/addColor';
import { pathSanitizer } from '../helper-functions/sanitizers/pathSanitizer';
import { subFolderFileSetup } from '../common/tree-manipulation/subFolderFileSetup';
import { addLightThemeTokens } from '../common/light-theme/addLightThemeTokens';
import { addDarkThemeTokens } from '../common/dark-theme/addDarkThemeTokens';
import { addDarkTheme } from '../common/dark-theme/addDarkTheme';
import { addLightTheme } from '../common/light-theme/addLightTheme';
import { GenerateArgs } from '../types/arguments/GenerateArgs';
import { generateSanitizer } from '../helper-functions/sanitizers/generateSanitizer';
import { createFolders } from '../helper-functions/file-manipulation/createDirectory';
import { createTheme } from '../helper-functions/theme/createTheme';

export function generate() {
    // Gets the sanitized path argument
    const pathArg = pathSanitizer();
    // Creates a path to the destination folder where the theme needs to be generated into
    const destinationPath: string = path.join(process.cwd(), pathArg.inputPath);

    // Checks if all the necessary and required arguments have been provided
    // requiredArgSanitizer();
    
    // Creates the directory from the specified path
    //createDirectory(pathArg.inputPath);

    process.argv.forEach((arg, index) => {
        if (index > 2 && process.argv[index].split('=')[0] !== 'path') {
            const colorName = process.argv[index].split('=')[0];

            // colorTokensFile = subFolderFileSetup(destinationPath, 'color-tokens', colorName, `${colorName}-color-map.scss`);
            // addColor(colorTokensFile, arg);

            if (!colorName.includes('neutral')) {
                const lightThemeTokensFile = subFolderFileSetup(destinationPath, 'theme-tokens/light-theme-tokens', colorName, `${colorName}-light-theme-tokens.scss`);
                addLightThemeTokens(lightThemeTokensFile, colorName);

                const darkThemeTokensFile = subFolderFileSetup(destinationPath, 'theme-tokens/dark-theme-tokens', colorName, `${colorName}-dark-theme-tokens.scss`);
                addDarkThemeTokens(darkThemeTokensFile, colorName);

                const lightThemeFile = subFolderFileSetup(destinationPath, 'theme/light-theme', colorName, `${colorName}-light-theme.scss`);
                addLightTheme(lightThemeFile, colorName);

                const darkThemeFile = subFolderFileSetup(destinationPath, 'theme/dark-theme', colorName, `${colorName}-dark-theme.scss`);
                addDarkTheme(darkThemeFile, colorName);
            } else {
                const surfaceName = colorName.replace('neutral', 'surface');
                const lightThemeTokensFile = subFolderFileSetup(destinationPath, 'theme-tokens/light-theme-tokens', surfaceName, `${surfaceName}-light-theme-tokens.scss`);
                addLightThemeTokens(lightThemeTokensFile, surfaceName);

                const darkThemeTokensFile = subFolderFileSetup(destinationPath, 'theme-tokens/dark-theme-tokens', surfaceName, `${surfaceName}-dark-theme-tokens.scss`);
                addDarkThemeTokens(darkThemeTokensFile, surfaceName);

                const lightThemeFile = subFolderFileSetup(destinationPath, 'theme/light-theme', surfaceName, `${surfaceName}-light-theme.scss`);
                addLightTheme(lightThemeFile, surfaceName);

                const darkThemeFile = subFolderFileSetup(destinationPath, 'theme/dark-theme', surfaceName, `${surfaceName}-dark-theme.scss`);
                addDarkTheme(darkThemeFile, surfaceName);
            }
        }
    });

    generateV2();
}

export function generateV2() {
    // normalize the input arguments
    const generateArgs: GenerateArgs = generateSanitizer();

    // Create the theme folder at the provided path
    createFolders(generateArgs.path.inputPath);

    // Create the theme
    createTheme(generateArgs);
}