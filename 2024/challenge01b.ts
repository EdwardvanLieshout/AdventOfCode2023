import { readFileSync } from 'fs';

const file = readFileSync('./input01.input', 'utf-8');
const input = file.split(/\r?\n/);
let parsedInput = input.map((row) => row.split(/\s/).filter((entry) => entry !== ''));
let leftArr = parsedInput.map((row) => row[0]).sort();
let rightArr = parsedInput.map((row) => row[1]).sort();
let amts = leftArr.map((num, i) => +num * rightArr.filter((n) => n === num).length);

console.log(amts.reduce((p, a) => p + a, 0));
