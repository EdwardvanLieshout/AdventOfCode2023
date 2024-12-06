import { readFileSync } from 'fs';

const file = readFileSync('./input06.input', 'utf-8');
let input = file.split(/\r?\n/).map((row) => row.split(''));
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

const testBlockage = (y: number, x: number): boolean => {
    input[y][x] = '#';
    while (input[guardPosY]?.[guardPosX] !== undefined) {
        if (guardDir === 'N') {
            if (input[guardPosY - 1]?.[guardPosX] !== '#') {
                guardPosY--;
                if (guardPosY < 0) {
                    continue;
                }
                if (input[guardPosY][guardPosX].includes('XN')) {
                    return true;
                }
                input[guardPosY][guardPosX] += 'XN';
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
                if (input[guardPosY][guardPosX].includes('XE')) {
                    return true;
                }
                input[guardPosY][guardPosX] += 'XE';
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
                if (input[guardPosY][guardPosX].includes('XS')) {
                    return true;
                }
                input[guardPosY][guardPosX] += 'XS';
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
                if (input[guardPosY][guardPosX].includes('XW')) {
                    return true;
                }
                input[guardPosY][guardPosX] += 'XW';
            } else {
                guardDir = 'N';
            }
        }
    }
    return false;
};

let count = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
        if (input[y][x] !== '#' && input[y][x] !== 'X') {
            count += +testBlockage(y, x);
            input = file.split(/\r?\n/).map((row) => row.split(''));
            guardDir = 'N';
            input.forEach((row, y) => {
                row.forEach((char, x) => {
                    if (char === '^') {
                        guardPosX = x;
                        guardPosY = y;
                        input[y][x] = 'X';
                    }
                });
            });
        }
    }
}

console.log(count);
