import { readFileSync } from 'fs';

const file = readFileSync('./input10.input', 'utf-8');
const input = file.split(/\r?\n/).map((row) => row.split(''));

let history = [];

const checkHasTrail = (x: number, y: number, c: number): number => {
    if (c === 9) {
        if (history.includes(x + ',' + y)) {
            return 0;
        }
        history.push(x + ',' + y);
        return 1;
    }
    let trails = 0;
    if (input[y][x + 1] === c + 1 + '') {
        trails += checkHasTrail(x + 1, y, c + 1);
    }
    if (input[y][x - 1] === c + 1 + '') {
        trails += checkHasTrail(x - 1, y, c + 1);
    }
    if (input[y + 1]?.[x] === c + 1 + '') {
        trails += checkHasTrail(x, y + 1, c + 1);
    }
    if (input[y - 1]?.[x] === c + 1 + '') {
        trails += checkHasTrail(x, y - 1, c + 1);
    }
    return trails;
};

let trailValues = [];

input.forEach((row, y) => {
    row.forEach((char, x) => {
        if (char === '0') {
            trailValues.push(checkHasTrail(x, y, 0));
            history = [];
        }
    });
});

console.log(trailValues.reduce((p, a) => p + a, 0));
