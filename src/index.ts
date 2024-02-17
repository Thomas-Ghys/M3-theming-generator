#!/usr/bin/env node
import {generate} from './generate-theme/generate';

function m3ThemingGenerator() {
    if (process.argv[2] === 'generate-theme') {
        console.log('generating theme');
        generate();
        return;
    }

    if(process.argv[2] === 'append-color') {
        console.log('Appending color to the theme');
        return;
    }

    throw new Error('Requested command not found.')
}

m3ThemingGenerator();