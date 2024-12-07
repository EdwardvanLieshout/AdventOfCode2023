import { readFileSync } from 'fs';

const oldTime = new Date();

const file = readFileSync('./input07.input', 'utf-8');
let input = file.split(/\r?\n/).map((row) => {
    let newRow: any = row.split(': ');
    newRow[1] = newRow[1].split(' ');
    return newRow;
});

const getPossibleAnswers = (n1: number, n2: number): number[] => {
    return [n1 + n2, n1 * n2];
};

let results = input.map((row) => {
    const answer = +row[0];
    const values = row[1];
    let startValues = [+row[1][0]];
    let multiplyValue = +row[1][1];

    for (let i = 2; i <= row[1].length; i++) {
        let temp = [];
        startValues.forEach((startVal) => {
            temp.push(...getPossibleAnswers(startVal, multiplyValue));
        });
        startValues = [...temp];
        multiplyValue = +row[1][i];
    }
    return startValues.includes(answer) ? answer : 0;
});

console.log(new Date().getTime() - oldTime.getTime() + ' milliseconds');
console.log(results.reduce((p, a) => p + a, 0));
