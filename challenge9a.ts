import { readFileSync } from 'fs';

const file = readFileSync('./input9', 'utf-8');
const vals = file.split(/\r?\n/).map((line) => line.split(' ').map((numStr) => +numStr));

let resultVals = [];

vals.forEach((numHistory) => {
    let lastNums = [numHistory[numHistory.length - 1]];
    while (numHistory.filter((num) => num !== 0).length !== 0) {
        let newNumHistory = [];
        numHistory.reduce((p, c) => {
            newNumHistory.push(c - p);
            return c;
        });
        numHistory = newNumHistory;
        lastNums.push(numHistory[numHistory.length - 1]);
    }
    resultVals.push(lastNums.reduce((p, a) => p + a, 0));
});

console.log(resultVals.reduce((p, a) => p + a, 0));
