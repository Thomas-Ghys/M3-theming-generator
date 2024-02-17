import * as path from 'path';
import { createFile } from "./createFile";
import { createFolders } from '../../helper-functions/file-manipulation/createDirectory';

export function subFolderFileSetup(destinationPath: string, subFolder: string, directoryName: string, fileName: string): string {
    const subFolderDirectory: string = path.join(destinationPath, subFolder, directoryName);
    const subFolderFile: string = path.join(subFolderDirectory, fileName);
    createFolders(subFolderDirectory);
    createFile(subFolderFile);

    return subFolderFile;
}