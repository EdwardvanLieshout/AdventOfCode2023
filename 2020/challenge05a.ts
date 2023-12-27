import { readFileSync } from 'fs';

const file = readFileSync('./input05.input', 'utf-8');
const input = file.split(/\r?\n/);
const binary = input.map((input) =>
    input.replaceAll('F', '0').replaceAll('B', '1').replaceAll('L', '0').replaceAll('R', '1')
);
const values = binary.map((str) => [parseInt(str.substring(0, 7), 2), parseInt(str.substring(7, 10), 2)]);
const seatIDs = values.map((value) => value[0] * 8 + value[1]);

console.log(seatIDs.sort((a, b) => b - a));
