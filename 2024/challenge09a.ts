import { readFileSync } from 'fs';

const file = readFileSync('./input09.input', 'utf-8');
const input = file.split('');
let checksumArr = input
    .map((char, i) => {
        return i % 2 === 0 ? Array(+char).fill(i / 2) : Array(+char).fill('.');
    })
    .flat();
checksumArr.forEach((char, i) => {
    if (char === '.') {
        for (let j = checksumArr.length - 1; j > 0; j--) {
            if (checksumArr[j] !== '.' && j > i) {
                let temp = checksumArr[i];
                checksumArr[i] = checksumArr[j];
                checksumArr[j] = temp;
                break;
            }
        }
    }
});
let values = checksumArr.map((val, i) => {
    if (val !== '.') {
        return +val * i;
    }
    return 0;
});

console.log(values.reduce((p, a) => p + a, 0));
