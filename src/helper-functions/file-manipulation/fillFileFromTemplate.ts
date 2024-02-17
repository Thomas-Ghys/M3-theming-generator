import * as fs from 'fs';

// Fill the provided file with the provided templates and replace the values with the colorname
export function fillFileFromTemplate(filePath: string, templatePath: string, colorName: string) {
    // Fill the file with the provided data
    fs.readFile(templatePath, 'utf-8', (error, data) => {
        // If there is an error throw it
        if (error) throw new Error(error.toString());

        // Write the actual data to the file and replace the template word with the provided name
        fs.writeFile(filePath, data.replace(/template/g, colorName), 'utf-8', (error) => {
            // If there is an error throw it
            if (error) throw new Error(error.toString());
        });
    })
}