import { GenerateArgs } from '../types/arguments/GenerateArgs';
import { generateSanitizer } from '../helper-functions/sanitizers/generateSanitizer';
import { createFolders } from '../helper-functions/file-manipulation/createDirectory';
import { createTheme } from '../helper-functions/theme/createTheme';

export function generate() {
    // normalize the input arguments
    const generateArgs: GenerateArgs = generateSanitizer();

    // Create the theme folder at the provided path
    createFolders(generateArgs.path.inputPath);

    // Create the theme
    createTheme(generateArgs);
}