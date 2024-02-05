import * as path from 'path';
import * as fs from 'fs';

export function createDestinationDirectory(destinationPath: string) {
    let directoryList: string[] = [];
    let createdDestinationPath: string = '';

    if (destinationPath.includes('/')) {
        directoryList = destinationPath.split('/');
    } else if (destinationPath.includes('\\')) {
        directoryList = destinationPath.split('\\');
    } else {
        directoryList.push(destinationPath);
    }

    directoryList.forEach((directoryPath: string) => {
        createdDestinationPath = path.join(createdDestinationPath, directoryPath);

        const nextDirectory: string = path.join(process.cwd(), createdDestinationPath);

        if (!fs.existsSync(nextDirectory)) {
            fs.mkdirSync(nextDirectory);
        }
    });
}