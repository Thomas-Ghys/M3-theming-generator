import * as path from 'path';
import * as fs from 'fs';

export function createDirectory(destinationPath: string) {
    // An array of all the folders in the provided path
    let directoryList: string[] = [];
    // The part of the path that has already been created
    let createdDestinationPath: string = '';
    // The sanitized path to create
    const pathToCreate: string = sanitizeDirectoryPath(destinationPath);

    // Creates the array of folders to create no matter which file system is used.
    if (pathToCreate.includes('/')) {
        directoryList = pathToCreate.split('/');
    } else if (pathToCreate.includes('\\')) {
        directoryList = pathToCreate.split('\\');
    } else {
        directoryList.push(pathToCreate);
    }

    // Loops through the directory list and creates the paths one by one if they do not yet exist
    directoryList.forEach((directoryPath: string) => {
        createdDestinationPath = path.join(createdDestinationPath, directoryPath);

        const nextDirectory: string = path.join(process.cwd(), createdDestinationPath);

        if (!fs.existsSync(nextDirectory)) {
            fs.mkdirSync(nextDirectory);
        }
    });
}

// Gets a path and splits off the root file path if it is provided
function sanitizeDirectoryPath(directoryPath: string): string {
    if (directoryPath.includes(process.cwd())) {
        return directoryPath.replace(process.cwd(), '');
    }
    return directoryPath;
}