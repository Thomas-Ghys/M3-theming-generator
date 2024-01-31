#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

export function generate() {
    const templatePath = path.join(process.cwd(), 'node_modules', '@tg', 'm3-theming-generator', 'dist','templates');
    const templatePathNames = fs.readdirSync(templatePath);

    const projectPath = path.join(process.cwd(), 'projectbs');
    console.log(templatePathNames);

    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
    }

    templatePathNames.forEach(name => {
        const originPath = path.join(templatePath, name);
        const destinationPath = path.join(projectPath, name);
        const stats = fs.statSync(originPath);

        if (stats.isFile()) {
            const content = fs.readFileSync(originPath, 'utf-8');
            fs.writeFileSync(destinationPath, content);
        }
    })
}
generate();