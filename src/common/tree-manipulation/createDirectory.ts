import * as path from 'path';
import * as fs from 'fs';

export function createDirectory(destinationPath: string) {
    let directoryList: string[] = [];
    let createdDestinationPath: string = '';
    const pathToCreate: string = sanitizeDirectoryPath(destinationPath);

    

    if (pathToCreate.includes('/')) {
        directoryList = pathToCreate.split('/');
    } else if (pathToCreate.includes('\\')) {
        directoryList = pathToCreate.split('\\');
    } else {
        directoryList.push(pathToCreate);
    }

    directoryList.forEach((directoryPath: string) => {
        createdDestinationPath = path.join(createdDestinationPath, directoryPath);

        const nextDirectory: string = path.join(process.cwd(), createdDestinationPath);

        if (!fs.existsSync(nextDirectory)) {
            fs.mkdirSync(nextDirectory);
        }
    });
}

function sanitizeDirectoryPath(directoryPath: string): string {
    if (directoryPath.includes(process.cwd())) {
        return directoryPath.replace(process.cwd(), '');
    }
    return directoryPath;
}