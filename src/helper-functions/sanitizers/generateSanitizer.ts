import { pathSanitizer } from "./pathSanitizer";
import { EMPTY_GENERATE_ARGS, GenerateArgs } from "../../types/arguments/GenerateArgs";

export function generateSanitizer(): GenerateArgs {
    const nonColorArguments: string[] = ['path'];
    const requiredGeneratecolors: string[] = ['primary', 'secondary', 'neutral', 'neutral-variant'];
    let generateInputArgs: GenerateArgs = EMPTY_GENERATE_ARGS;

    // The first param in the process.argv is always the node exe location
    generateInputArgs.node = process.argv[0];
    // The second param in the process.argv is always the index.js file location
    generateInputArgs.index = process.argv[1];
    // The third param in the process.argv should be the generate-theme command.
    generateInputArgs.command = process.argv[2];

    // Find the path argument in the provided arguments
    generateInputArgs.path = pathSanitizer();

    // Loop through all the remaining arguments and look for colors
    process.argv.forEach((arg, index) => {
        // Skip non color aarguments
        if (nonColorArguments.includes(process.argv[index].split('=')[0])) {
            return;
        }

        // If the argument contains a hastag we assume it is a hex value and add it to the color array
        if (index > 2 && /^#/.test(process.argv[index].split('=')[1])) {
            generateInputArgs.colors.push({
                name: process.argv[index].split('=')[0],
                hex: process.argv[index].split('=')[1]
            });
        }
    });

    // Finally check if all te required colors are present in the colors array of the generate inputs
    requiredGeneratecolors.forEach((requiredColor) => {
        // Look for each color in the colors array
        if (generateInputArgs.colors.find((color) => color.name === requiredColor)) {
            return;
        }

        // Throw an error if a required color is not provided
        throw new Error(`No ${requiredColor} argument provided`);
    });

    return generateInputArgs;
}