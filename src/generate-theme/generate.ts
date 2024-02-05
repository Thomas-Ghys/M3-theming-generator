import * as fs from 'fs';
import * as path from 'path';
import { createDestinationDirectory } from '../common/tree-manipulation/createDestinationDirectory';
import { createDirectory } from '../common/tree-manipulation/createDirectory';
import { addColor } from '../common/color-calculations/addColor';
import { createFile } from '../common/tree-manipulation/createFile';

export function generate() {
    // Creates a path to the templates directory to use in the code
    const templatesPath: string = path.join(process.cwd(), 'node_modules', '@tg', 'm3-theming-generator', 'src','templates');
    // Scans the templates directory for directories and files to implement
    const templateNames: string[] = fs.readdirSync(templatesPath);
    // Creates a path to the destination folder where the theme needs to be generated into
    const pathArg = process.argv.find((path) => path .split('=')[0] === 'path').split('=')[1];
    const destinationPath: string = path.join(process.cwd(), pathArg);
    
    createDestinationDirectory(pathArg);

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
                const colorDirectory: string = path.join(destinationPath, process.argv[index].split('=')[0]);
                const colorFile: string = path.join(colorDirectory, `${process.argv[index].split('=')[0]}-color-map.scss`)
                createDirectory(colorDirectory);
                createFile(colorFile);
                addColor(colorFile, arg);
            }
        })
    })
}