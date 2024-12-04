import { readFileSync } from 'fs';

const file = readFileSync('./input04.input', 'utf-8');
const input = file.split(/\r?\n/).map((row) => row.split(''));

const isXmas = (c1, c2, c3, c4) => c1 === 'X' && c2 === 'M' && c3 === 'A' && c4 === 'S';
let count = 0;
input.forEach((row, i) => {
    row.forEach((char, j) => {
        if (char === 'X') {
            let bool1 = isXmas(input[i][j], input[i][j + 1], input[i][j + 2], input[i][j + 3]);
            let bool2 = isXmas(input[i][j], input[i][j - 1], input[i][j - 2], input[i][j - 3]);
            let bool3 = isXmas(input[i][j], input[i + 1]?.[j + 1], input[i + 2]?.[j + 2], input[i + 3]?.[j + 3]);
            let bool4 = isXmas(input[i][j], input[i + 1]?.[j - 1], input[i + 2]?.[j - 2], input[i + 3]?.[j - 3]);
            let bool5 = isXmas(input[i][j], input[i - 1]?.[j + 1], input[i - 2]?.[j + 2], input[i - 3]?.[j + 3]);
            let bool6 = isXmas(input[i][j], input[i - 1]?.[j - 1], input[i - 2]?.[j - 2], input[i - 3]?.[j - 3]);
            let bool7 = isXmas(input[i][j], input[i + 1]?.[j], input[i + 2]?.[j], input[i + 3]?.[j]);
            let bool8 = isXmas(input[i][j], input[i - 1]?.[j], input[i - 2]?.[j], input[i - 3]?.[j]);
            count += +bool1 + +bool2 + +bool3 + +bool4 + +bool5 + +bool6 + +bool7 + +bool8;
        }
    });
});
console.log(count);
