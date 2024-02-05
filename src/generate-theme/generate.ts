import * as fs from 'fs';
import * as path from 'path';
import { createDestinationDirectory } from '../common/createDestinationDirectory';
import { createColorArray } from '../common/createColorArray';
import { ColorMap } from '../types/colorMap';

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
            
            process.argv.forEach((arg, index) => {
                if (index > 3) {
                    addColor(destinationPathName, arg);
                }
            })
        }
    })

    console.log(process.argv);
}

function addColor(destinationPathName: string, color: string) {
    var logger = fs.createWriteStream(destinationPathName, {
        flags: 'a'
    });

    logger.write(`\n$${color.split('=')[0]}: (`);

    createColorArray(color).forEach((color: ColorMap) => {
        logger.write(`\n\t$${Object.keys(color)[0]}: ${color[Object.keys(color)[0]]},`);
    });

    logger.write('\n);');
}