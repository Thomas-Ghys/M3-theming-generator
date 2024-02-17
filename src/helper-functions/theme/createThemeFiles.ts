import * as path from 'path';
import { createFolders } from '../file-manipulation/createDirectory';
import { createFile } from '../file-manipulation/createFile';
import { fillFileFromTemplate } from '../file-manipulation/fillFileFromTemplate';

export function createThemeFiles(basePath: string, colorName: string) {
    // Set the theme types that will be generated for each color
    const themeType = ['light', 'dark'];

    // Create the theme tokens for every theme type
    themeType.forEach((type) => {
        // Create the theme tokens file path
        const themeFilePath: string = path.join(basePath, 'theme', `${type}-theme`, colorName);
        const themeFileName: string = `${colorName}-${type}-theme.scss`;

        // Make sure that all folders in the themeTokenFilePath are created
        createFolders(themeFilePath);
        // Create the file at the correct folder location
        createFile(themeFilePath, themeFileName);

        // Fill the theme token file path with the correct tokens
        if (colorName !== 'neutral') {
            // Set the path to the correct templates file
            const templatePath: string = path.join(process.cwd(), `node_modules/@tg/m3-theming-generator/src/generate-theme/base-theme-templates/base-${type}-theme.txt`);
            fillFileFromTemplate(path.join(themeFilePath, themeFileName), templatePath, colorName);
            return;
        }
        // In case of the neutral color change it to Google Materials surface
        const templatePath: string = path.join(process.cwd(), `node_modules/@tg/m3-theming-generator/src/generate-theme/base-theme-templates/base-${type}-surface-theme.txt`);
        fillFileFromTemplate(path.join(themeFilePath, themeFileName), templatePath, 'surface');
    });
}