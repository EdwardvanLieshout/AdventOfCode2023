import { readFileSync } from 'fs';

const file = readFileSync('./input01.input', 'utf-8');
const input = file.split(/\r?\n/);
let parsedInput = input.map((row) => row.split(/\s/).filter((entry) => entry !== ''));
let leftArr = parsedInput.map((row) => row[0]).sort();
let rightArr = parsedInput.map((row) => row[1]).sort();
let diffs = leftArr.map((num, i) => Math.abs(+num - +rightArr[i]));

console.log(diffs.reduce((p, a) => p + a, 0));
