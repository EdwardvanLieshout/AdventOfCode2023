import { readFileSync } from 'fs';

const file = readFileSync('./input05.input', 'utf-8');
const input = file.split(/\r?\n\r?\n/).map((sect) => sect.split(/\r?\n/));
let rules = input[0].map((rule) => [+rule.split('|')[0], +rule.split('|')[1]]);
let updates = input[1].map((update) => update.split(',').map((value) => +value));

const isUpdateValid = (update: number[]): boolean => {
    let prevNums = [update[0]];
    let isValid = true;
    update.forEach((val, i) => {
        if (i === 0) {
            return;
        }
        rules.forEach((rule) => {
            if (rule[0] === val && prevNums.includes(rule[1])) {
                isValid = false;
            }
        });
        prevNums.push(val);
    });
    return isValid;
};

updates = updates.filter((update) => isUpdateValid(update));
let values = updates.map((update) => update[Math.floor(update.length / 2)]);

console.log(values.reduce((p, a) => p + a, 0));
