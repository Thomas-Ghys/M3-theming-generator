import * as path from 'path';
import { createFolders } from '../file-manipulation/createDirectory';
import { createFile } from '../file-manipulation/createFile';
import { fillFileFromTemplate } from '../file-manipulation/fillFileFromTemplate';

export function createThemeTokens(basePath: string, colorName: string) {
    // Set the theme types that will be generated for each color
    const themeType = ['light', 'dark'];

    // Create the theme tokens for every theme type
    themeType.forEach((type) => {
        // Create the theme tokens file path
        const themeTokenFilePath: string = path.join(basePath, 'theme-tokens', `${type}-theme-tokens`, colorName);
        const themeTokenFileName: string = `${colorName}-${type}-theme-tokens.scss`;

        // Make sure that all folders in the themeTokenFilePath are created
        createFolders(themeTokenFilePath);
        // Create the file at the correct folder location
        createFile(themeTokenFilePath, themeTokenFileName);

        // Fill the theme token file path with the correct tokens
        if (colorName !== 'neutral') {
            // Set the path to the correct templates file
            const templatePath: string = path.join(process.cwd(), `node_modules/@tg/m3-theming-generator/src/generate-theme/base-theme-templates/token-templates/base-${type}-color-tokens.txt`);
            fillFileFromTemplate(path.join(themeTokenFilePath, themeTokenFileName), templatePath, colorName);
            return;
        }
        // In case of the neutral color change it to Google Materials surface
        const templatePath: string = path.join(process.cwd(), `node_modules/@tg/m3-theming-generator/src/generate-theme/base-theme-templates/token-templates/base-${type}-surface-tokens.txt`);
        fillFileFromTemplate(path.join(themeTokenFilePath, themeTokenFileName), templatePath, 'surface');
    });
}

