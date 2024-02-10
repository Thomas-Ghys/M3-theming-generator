import * as fs from 'fs';
import * as path from 'path';

export function createTemplatesFile(destinationPathName: string, color: string, templatesPath: string, templateName: string) {
    fs.readFile(path.join(templatesPath, templateName), 'utf8', (error, data) => {
        if (error) {
            return console.log(error);
        }

        const tokenData = data.replace(/template/g, color);

        fs.writeFile(destinationPathName, tokenData, 'utf-8', (error) => {
            if (error) return console.log(error);
        })
    });
}