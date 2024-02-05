import * as fs from 'fs';

export function createFile(filePath: string) {
    fs.writeFileSync(filePath, '');
}