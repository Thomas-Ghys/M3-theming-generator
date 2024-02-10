import * as path from 'path';
import { createTemplatesFile } from '../tree-manipulation/createTemplatesFile';

export function addLightThemeTokens(destinationPathName: string, color: string) {
    // Creates a path to the templates directory to use in the code
    const templatesPath: string = path.join(process.cwd(), 'node_modules/@tg/m3-theming-generator/src/generate-theme/base-theme-templates');

    if (color !== 'surface') {
        createTemplatesFile(destinationPathName, color, templatesPath, 'base-light-color-tokens.txt');
        return;
    }
    
    createTemplatesFile(destinationPathName, color, templatesPath, 'base-light-surface-tokens.txt');
}