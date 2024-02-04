#!/usr/bin/env node
import {generate} from './generate-theme/generate';

function m3ThemingGenerator() {
    if (process.argv[2] === 'generate') {
        console.log('generating theme');
        generate();
        return;
    }

    if(process.argv[2] === 'append-color') {
        console.log('Appending color to the theme');
        return;
    }

    console.log('Process not found');
}

m3ThemingGenerator();