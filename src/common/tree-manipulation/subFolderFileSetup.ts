import * as path from 'path';
import { createDirectory } from "./createDirectory";
import { createFile } from "./createFile";

export function subFolderFileSetup(destinationPath: string, subFolder: string, directoryName: string, fileName: string): string {
    const subFolderDirectory: string = path.join(destinationPath, subFolder, directoryName);
    const subFolderFile: string = path.join(subFolderDirectory, fileName);
    createDirectory(subFolderDirectory);
    createFile(subFolderFile);

    return subFolderFile;
}