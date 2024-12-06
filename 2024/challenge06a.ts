import { readFileSync } from 'fs';

const file = readFileSync('./input06.input', 'utf-8');
const input = file.split(/\r?\n/).map((row) => row.split(''));
let guardPosX = -1;
let guardPosY = -1;
let guardDir = 'N';
input.forEach((row, y) => {
    row.forEach((char, x) => {
        if (char === '^') {
            guardPosX = x;
            guardPosY = y;
            input[y][x] = 'X';
        }
    });
});

while (input[guardPosY]?.[guardPosX] !== undefined) {
    if (guardDir === 'N') {
        if (input[guardPosY - 1]?.[guardPosX] !== '#') {
            guardPosY--;
            if (guardPosY < 0) {
                continue;
            }
            input[guardPosY][guardPosX] = 'X';
        } else {
            guardDir = 'E';
        }
    }
    if (guardDir === 'E') {
        if (input[guardPosY][guardPosX + 1] !== '#') {
            guardPosX++;
            if (guardPosX >= input[0].length) {
                continue;
            }
            input[guardPosY][guardPosX] = 'X';
        } else {
            guardDir = 'S';
        }
    }
    if (guardDir === 'S') {
        if (input[guardPosY + 1]?.[guardPosX] !== '#') {
            guardPosY++;
            if (guardPosY >= input.length) {
                continue;
            }
            input[guardPosY][guardPosX] = 'X';
        } else {
            guardDir = 'W';
        }
    }
    if (guardDir === 'W') {
        if (input[guardPosY][guardPosX - 1] !== '#') {
            guardPosX--;
            if (guardPosX < 0) {
                continue;
            }
            input[guardPosY][guardPosX] = 'X';
        } else {
            guardDir = 'N';
        }
    }
}

let count = 0;
input.forEach((row) => {
    row.forEach((char) => {
        if (char === 'X') {
            count++;
        }
    });
});

console.log(count);
