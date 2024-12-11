import { readFileSync } from 'fs';

const file = readFileSync('./input11.input', 'utf-8');
let input = file.split(' ');

let history = new Map();

const blink = (num: number, count: number): number => {
    if (count === 75) {
        return 1;
    }
    let blinkedVal = 0;
    if (history.has(num + ',' + count)) {
        return history.get(num + ',' + count);
    }
    if (num === 0) {
        blinkedVal = blink(1, count + 1);
    } else {
        if ((num + '').length % 2 === 0) {
            const num1 = +(num + '').substring(0, (num + '').length / 2);
            const num2 = +(num + '').substring((num + '').length / 2, (num + '').length);
            blinkedVal = blink(num1, count + 1) + blink(num2, count + 1);
        } else {
            blinkedVal = blink(num * 2024, count + 1);
        }
    }
    history.set(num + ',' + count, blinkedVal);
    return blinkedVal;
};

let counts = input.map((val) => blink(+val, 0));

console.log(counts.reduce((p, a) => p + a, 0));
