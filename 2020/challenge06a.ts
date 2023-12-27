import { readFileSync } from 'fs';

const file = readFileSync('./input06.input', 'utf-8');
const amountsYes = file.split(/\r?\n\r?\n/).map(
    (group) =>
        group
            .split(/\r?\n/)
            .join('')
            .split('')
            .filter((value, index, array) => array.indexOf(value) === index).length
);

console.log(amountsYes.reduce((p, a) => p + a));
