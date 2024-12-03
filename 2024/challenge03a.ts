import { readFileSync } from 'fs';

const file = readFileSync('./input03.input', 'utf-8');
const input = file;
let matches = [...input.matchAll(/mul\(\d+\,\d+\)/g)].map((match) => match[0]);
let amtPairs = matches.map((match) => match.substring(4).slice(0, -1).split(','));
let amts = amtPairs.map((amt) => +amt[0] * +amt[1]);

console.log(amts.reduce((p, a) => p + a, 0));
