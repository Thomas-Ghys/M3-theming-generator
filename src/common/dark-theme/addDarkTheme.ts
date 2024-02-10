import * as path from 'path';
import { createTemplatesFile } from '../tree-manipulation/createTemplatesFile';

export function addDarkTheme(destinationPathName: string, color: string) {
    // Creates a path to the templates directory to use in the code
    const templatesPath: string = path.join(process.cwd(), 'node_modules/@tg/m3-theming-generator/src/generate-theme/base-theme-templates');

    if (color !== 'surface') {
        createTemplatesFile(destinationPathName, color, templatesPath, 'base-dark-theme.txt');
        return;
    }
    
    createTemplatesFile(destinationPathName, color, templatesPath, 'base-dark-surface-theme.txt');
}