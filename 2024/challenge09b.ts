import { readFileSync } from 'fs';

const file = readFileSync('./input09.input', 'utf-8');
const input = file.split('');
let checksumArr = input.map((char, i) => {
    return i % 2 === 0 ? Array(+char).fill(i / 2) : Array(+char).fill('.');
});

for (let i = checksumArr.length - 1; i > 0; i--) {
    if (checksumArr[i][0] === '.') {
        continue;
    }
    for (let j = 0; j < i; j++) {
        if (checksumArr[j][0] === '.' && checksumArr[i].length <= checksumArr[j].length) {
            let extraDots = Array(checksumArr[j].length - checksumArr[i].length).fill('.');
            checksumArr[j] = checksumArr[i];
            checksumArr.splice(i, 1, Array(checksumArr[j].length).fill('.'));
            checksumArr.splice(j + 1, 0, extraDots);
            i++;
            break;
        }
    }
}

checksumArr = checksumArr.flat();

let values = checksumArr.map((val, i) => {
    if ((val as unknown as string) !== '.') {
        return +val * i;
    }
    return 0;
});

console.log(values.reduce((p, a) => p + a, 0));
