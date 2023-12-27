import { readFileSync } from 'fs';

const file = readFileSync('./input03.input', 'utf-8');
const input = file.split(/\r?\n/);

console.log(input);
