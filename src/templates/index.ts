#! /usr/bin/env node
import * as fs from 'fs';

export function generate() {
    fs.mkdirSync('/templates');
    const content = fs.readFileSync('./../templates/index.ts', 'utf-8');
}
generate();