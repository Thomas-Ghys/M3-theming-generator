import * as fs from 'fs';
import * as path from 'path';
import { createDirectory } from '../common/tree-manipulation/createDirectory';
import { addColor } from '../common/color-calculations/addColor';
import { createFile } from '../common/tree-manipulation/createFile';
import { PathSanitizer } from '../common/arg-sanitizer/PathSanitizer';
import { requiredArgSanitizer } from '../common/arg-sanitizer/RequiredArgSanitizer';

export function generate() {
    // Creates a path to the templates directory to use in the code
    const templatesPath: string = path.join(process.cwd(), 'node_modules', '@tg', 'm3-theming-generator', 'src','templates');
    // Scans the templates directory for directories and files to implement
    const templateNames: string[] = fs.readdirSync(templatesPath);
    // Gets the sanitized path argument
    const pathArg = PathSanitizer();
    // Creates a path to the destination folder where the theme needs to be generated into
    const destinationPath: string = path.join(process.cwd(), pathArg);

    // Checks if all the necessary and required arguments have been provided
    requiredArgSanitizer();
    
    // Creates the directory from the specified path
    createDirectory(pathArg);

    templateNames.forEach(name => {
        const originPath = path.join(templatesPath, name);
        const destinationPathName = path.join(destinationPath, name);
        const stats = fs.statSync(originPath);

        if (stats.isFile()) {
            const content = fs.readFileSync(originPath, 'utf-8');
            fs.writeFileSync(destinationPathName, content);
        }

        process.argv.forEach((arg, index) => {
            if (index > 2 && process.argv[index].split('=')[0] !== 'path') {
                const colorDirectory: string = path.join(destinationPath, 'color-tokens', process.argv[index].split('=')[0]);
                const colorFile: string = path.join(colorDirectory, `${process.argv[index].split('=')[0]}-color-map.scss`)
                createDirectory(colorDirectory);
                createFile(colorFile);
                addColor(colorFile, arg);
            }
        })
    })
}