import * as path from 'path';
import * as fs from 'fs';

export function createDirectory(destinationPath: string) {
    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }
}