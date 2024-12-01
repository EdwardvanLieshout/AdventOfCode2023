import { readFileSync } from 'fs';

const file = readFileSync('./input14.input', 'utf-8');
const input = file.split(/\r?\n/);

console.log(input);
