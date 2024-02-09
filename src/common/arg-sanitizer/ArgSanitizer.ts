export function ArgSanitizer(argName: string) {
    // Either gets the path argument or sets the string to ''
    let argument = process.argv.find((input) => input.split('=')[0] === argName) ?? '';

    // If pathArg and return the path argument if it exists
    if (argument !== '') {
        return;
    }

    // Throw an error when no path argument exists
    throw new Error(`No ${argName} argument provided`);
}