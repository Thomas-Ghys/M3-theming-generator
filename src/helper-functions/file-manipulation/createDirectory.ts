import * as path from 'path';
import * as fs from 'fs';

export function createFolders(folderPath: string) {
    // An array of all the folders in the provided input
    const folders: string[] = getFolders(removeCWD(folderPath));

    // The part of the folder that already has been created
    let alreadyCreatedFolderPath: string = '';

    // Make sure all the folders in folderPath exist and create them when necessary
    folders.forEach((folder: string) => {
        // Add to the path
        alreadyCreatedFolderPath = path.join(alreadyCreatedFolderPath, folder);

        // Add te CWD again to make sure the folder is created at the correct place in the file system
        const directoryToCreate: string = path.join(process.cwd(), alreadyCreatedFolderPath);

        // check if the folder exists, if not create it
        if (!fs.existsSync(directoryToCreate)) {
            fs.mkdirSync(directoryToCreate);
        }
    });
}

// Take the input path and split it at the path dividers depending on the file system
function getFolders(folderPath: string): string[] {
    if (folderPath.includes('/')) {
        return folderPath.split('/');
    };

    if (folderPath.includes('\\')) {
        return folderPath.split('\\');
    };

    return [folderPath];
}

// Remove the CWD from the path
function removeCWD(folderPath: string): string {
    if (folderPath.includes(process.cwd())) {
        return folderPath.replace(process.cwd(), '');
    }
    return folderPath;
}