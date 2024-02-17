import * as path from 'path';
import * as fs from 'fs';
import { createFolders } from './createDirectory';

export function createFile(folderPath: string, fileName: string) {
    const filePath = path.join(folderPath, fileName);
    
    // Make sure all the folders in the given path exist
    createFolders(folderPath);

    // Check if the file exists, if not create it
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
    }
}