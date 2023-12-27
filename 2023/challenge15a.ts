import { readFileSync } from 'fs';

const file = readFileSync('./input15', 'utf-8');
const steps = file.split(',').map((str) => str.split(''));

const hashes = steps.map((input) => {
    let val = 0;
    input.forEach((char) => {
        val += char.charCodeAt(0);
        val *= 17;
        val %= 256;
    });
    return val;
});

console.log(hashes.reduce((p, a) => p + a));
