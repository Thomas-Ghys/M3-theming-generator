import * as path from 'path';
import { PathArgs } from "../../types/paths/PathArg";

export function pathSanitizer(): PathArgs {
    // Either gets the path argument or sets the string to ''
    let pathArg = process.argv.find((path) => path.split('=')[0] === 'path') ?? '';

    // If pathArg and return the path argument if it exists
    if (pathArg !== '') {
        return {
            inputPath: pathArg.split('=')[1],
            fullPath: path.join(process.cwd(), pathArg.split('=')[1])
        };
    }

    // Throw an error when no path argument exists
    throw new Error('No path argument provided');
}