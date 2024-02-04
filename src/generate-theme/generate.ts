import * as fs from 'fs';
import * as path from 'path';
import { createDestinationDirectory } from '../common/common-variables';

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
                    let key: string = arg.split('=')[0];
                    let color: string = arg.split('=')[1];


                    addColor(destinationPathName, key, color);
                }
            })
        }
    })

    console.log(process.argv);
}

function addColor(destinationPathName: string, key: string, color: string) {
    var logger = fs.createWriteStream(destinationPathName, {
        flags: 'a'
    });

    logger.write(`\n$${key}: ('1': #123456, '2':#000000);`);
}