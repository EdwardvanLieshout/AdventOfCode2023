import { readFileSync } from 'fs';

const file = readFileSync('./input1', 'utf-8');
const arr = file
    .split(/\r?\n/)
    .map((originalval) =>
        originalval
            .replaceAll('one', 'one1one')
            .replaceAll('two', 'two2two')
            .replaceAll('three', 'three3three')
            .replaceAll('four', 'four4four')
            .replaceAll('five', 'five5five')
            .replaceAll('six', 'six6six')
            .replaceAll('seven', 'seven7seven')
            .replaceAll('eight', 'eight8eight')
            .replaceAll('nine', 'nine9nine')
    )
    .map((val) => val.split('').filter((char) => char.match(/\d/)))
    .map((numvalues) => +(numvalues[0] + numvalues.pop()));

console.log(arr.reduce((p, a) => p + a, 0));
