import * as fs from 'fs';
import * as path from 'path';
import { createDirectory } from '../common/tree-manipulation/createDirectory';
import { addColor } from '../common/color-calculations/addColor';
import { PathSanitizer } from '../common/arg-sanitizer/PathSanitizer';
import { requiredArgSanitizer } from '../common/arg-sanitizer/RequiredArgSanitizer';
import { subFolderFileSetup } from '../common/tree-manipulation/subFolderFileSetup';
import { addLightThemeTokens } from '../common/light-theme/addLightThemeTokens';
import { addDarkThemeTokens } from '../common/dark-theme/addDarkThemeTokens';

export function generate() {
    // Gets the sanitized path argument
    const pathArg = PathSanitizer();
    // Creates a path to the destination folder where the theme needs to be generated into
    const destinationPath: string = path.join(process.cwd(), pathArg);

    // Checks if all the necessary and required arguments have been provided
    requiredArgSanitizer();
    
    // Creates the directory from the specified path
    createDirectory(pathArg);

    process.argv.forEach((arg, index) => {
        if (index > 2 && process.argv[index].split('=')[0] !== 'path') {
            const colorName = process.argv[index].split('=')[0];

            const colorTokensFile = subFolderFileSetup(destinationPath, 'color-tokens', colorName, `${colorName}-color-map.scss`);
            addColor(colorTokensFile, arg);

            if (!colorName.includes('neutral')) {
                const lightThemeTokensFile = subFolderFileSetup(destinationPath, 'light-theme-tokens', colorName, `${colorName}-light-theme-tokens.scss`);
                addLightThemeTokens(lightThemeTokensFile, colorName);

                const darkThemeTokensFile = subFolderFileSetup(destinationPath, 'dark-theme-tokens', colorName, `${colorName}-dark-theme-tokens.scss`);
                addDarkThemeTokens(darkThemeTokensFile, colorName);
            } else {
                const surfaceName = colorName.replace('neutral', 'surface');
                const lightThemeTokensFile = subFolderFileSetup(destinationPath, 'light-theme-tokens', surfaceName, `${surfaceName}-light-theme-tokens.scss`);
                addLightThemeTokens(lightThemeTokensFile, surfaceName);

                const darkThemeTokensFile = subFolderFileSetup(destinationPath, 'dark-theme-tokens', colorName, `${surfaceName}-dark-theme-tokens.scss`);
                addDarkThemeTokens(darkThemeTokensFile, surfaceName);
            }
        }
    });
}