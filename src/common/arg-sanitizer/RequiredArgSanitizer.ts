import { ArgSanitizer } from "./ArgSanitizer";

export function requiredArgSanitizer() {
    const requiredArgs: string[] = ['primary', 'secondary', 'neutral', 'neutral-variant'];

    requiredArgs.forEach((argument) => {
        ArgSanitizer(argument);
    })
}