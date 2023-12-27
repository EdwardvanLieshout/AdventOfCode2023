import { readFileSync } from 'fs';

const file = readFileSync('./input01', 'utf-8');
const arr = file
    .split(/\r?\n/)
    .map((val) => val.split('').filter((char) => char.match(/\d/)))
    .map((numvalues) => +(numvalues[0] + numvalues.pop()));

console.log(arr.reduce((p, a) => p + a, 0));
