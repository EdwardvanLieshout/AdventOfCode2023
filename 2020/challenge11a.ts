import { readFileSync } from 'fs';

const file = readFileSync('./input11.input', 'utf-8');
const input = file.split(/\r?\n/);

console.log(input);
