import { readFileSync } from 'fs';

const file = readFileSync('./input17', 'utf-8');
const map = file.split(/\r?\n/).map((line) => line.split('').map((char) => +char));

const answers = [9999999999999];
const cache = new Map();

const millisecondsStart = new Date().getTime();

const move = (dir: number, amountSameDir: number, totalHeatLoss: number, x: number, y: number): void => {
    let key = `${x},${y},${dir},${amountSameDir}`;
    totalHeatLoss += map[y][x];
    if (cache.has(key) && cache.get(key) <= totalHeatLoss) {
        return;
    }
    if (totalHeatLoss >= answers[answers.length - 1]) {
        return;
    }
    cache.set(key, totalHeatLoss);
    if (
        amountSameDir > 3 &&
        y === map.length - 1 &&
        x === map[0].length - 1 &&
        totalHeatLoss < answers[answers.length - 1]
    ) {
        console.log(totalHeatLoss);
        answers.push(totalHeatLoss);
        return;
    }
    let availableDirs = [3, 2, 1, 0];
    if (amountSameDir === 10) {
        availableDirs = availableDirs.filter((d) => d !== dir);
    }
    if (amountSameDir < 4) {
        availableDirs = [dir];
    }
    if (dir === 0) {
        availableDirs = availableDirs.filter((d) => d !== 2);
    }
    if (dir === 2) {
        availableDirs = availableDirs.filter((d) => d !== 0);
    }
    if (dir === 1) {
        availableDirs = availableDirs.filter((d) => d !== 3);
    }
    if (dir === 3) {
        availableDirs = availableDirs.filter((d) => d !== 1);
    }
    if (x === 0) {
        availableDirs = availableDirs.filter((d) => d !== 0);
    }
    if (x === map[0].length - 1) {
        availableDirs = availableDirs.filter((d) => d !== 2);
    }
    if (y === 0) {
        availableDirs = availableDirs.filter((d) => d !== 1);
    }
    if (y === map.length - 1) {
        availableDirs = availableDirs.filter((d) => d !== 3);
    }
    for (let newDir of availableDirs) {
        const newX = newDir === 0 ? x - 1 : newDir === 2 ? x + 1 : x;
        const newY = newDir === 1 ? y - 1 : newDir === 3 ? y + 1 : y;
        const newAmountOfSameDir = newDir === dir ? amountSameDir + 1 : 1;
        move(newDir, newAmountOfSameDir, totalHeatLoss, newX, newY);
    }
    return;
};
move(3, 0, 0 - map[0][0], 0, 0);
move(2, 0, 0 - map[0][0], 0, 0);

const millisecondsEnd = new Date().getTime();

console.log(answers.sort((a, b) => a - b));
console.log(answers.sort((a, b) => a - b)[0]);
console.log('Duration:', (millisecondsEnd - millisecondsStart) / 1000);
