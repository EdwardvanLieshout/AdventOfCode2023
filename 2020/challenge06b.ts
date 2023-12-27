import { readFileSync } from 'fs';

const file = readFileSync('./input06.input', 'utf-8');
const groups = file.split(/\r?\n\r?\n/).map((group) => group.split(/\r?\n/));
const amounts = groups.map((group) => {
    const length = group.length;
    const allAnswersStr = group.join('').split('');
    const amount =
        allAnswersStr.filter((char) => allAnswersStr.filter((c) => c === char).length === length).length / length;
    return amount;
});

console.log(amounts.reduce((p, a) => p + a));
