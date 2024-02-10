import { ArgSanitizer } from "./ArgSanitizer";

export function requiredArgSanitizer() {
    // Base array of all the expected colors for the base theme generation
    const requiredArgs: string[] = ['primary', 'secondary', 'neutral', 'neutral-variant'];

    // Loop through all the required args and Sanitize them
    requiredArgs.forEach((argument) => {
        ArgSanitizer(argument);
    })
}