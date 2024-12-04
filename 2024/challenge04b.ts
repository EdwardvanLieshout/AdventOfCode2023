import { readFileSync } from 'fs';

const file = readFileSync('./input04.input', 'utf-8');
const input = file.split(/\r?\n/).map((row) => row.split(''));

const isX_mas = (c1, c2, c3, c4, c5) =>
    c1 === 'A' &&
    ((c2 === 'M' && c5 === 'S') || (c2 === 'S' && c5 === 'M')) &&
    ((c4 === 'M' && c3 === 'S') || (c4 === 'S' && c3 === 'M'));

const count = input.reduce((prevXmasTotal, row, i) => {
    return (
        prevXmasTotal +
        row.reduce((prevXmasAmount, char, j) => {
            if (char === 'A') {
                let bool1 = isX_mas(
                    input[i][j],
                    input[i - 1]?.[j - 1],
                    input[i - 1]?.[j + 1],
                    input[i + 1]?.[j - 1],
                    input[i + 1]?.[j + 1]
                );
                return prevXmasAmount + +bool1;
            }
            return prevXmasAmount;
        }, 0)
    );
}, 0);
console.log(count);
