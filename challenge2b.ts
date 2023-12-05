import { readFileSync } from 'fs';

const file = readFileSync('./input2', 'utf-8');
const arr = file
    .split(/\r?\n/)
    .map((gameStr) => gameStr.split(':'))
    .map((game) => [
        game[0].split(' ')[1],
        game[1]
            ?.trim()
            .split(';')
            .map((turn) => turn.trim().split(', ')),
    ])
    .map((game) => (game[1] as string[][]).join(',').split(','));

const powers = arr.map((turnArr) => {
    const reds = turnArr.filter((str) => str.split(' ')[1] === 'red');
    const greens = turnArr.filter((str) => str.split(' ')[1] === 'green');
    const blues = turnArr.filter((str) => str.split(' ')[1] === 'blue');
    const redAmount =
        +reds
            .sort((a, b) => +a.split(' ')[0] - +b.split(' ')[0])
            .pop()
            .split(' ')[0] ?? 0;
    const greenAmount =
        +greens
            .sort((a, b) => +a.split(' ')[0] - +b.split(' ')[0])
            .pop()
            .split(' ')[0] ?? 0;
    const blueAmount =
        +blues
            .sort((a, b) => +a.split(' ')[0] - +b.split(' ')[0])
            .pop()
            .split(' ')[0] ?? 0;
    return redAmount * greenAmount * blueAmount;
});

console.log(powers.reduce((p, a) => p + a, 0));
