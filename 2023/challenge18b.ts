import { readFileSync } from 'fs';

const file = readFileSync('./input18', 'utf-8');

interface DigStep {
    dir: string;
    amount: number;
    colour: string;
}

const steps: DigStep[] = file.split(/\r?\n/).map((line) => {
    const vals = line.split(' ');
    const dirNum = +vals[2].substring(7, 8);
    return {
        dir: dirNum === 0 ? 'R' : dirNum === 1 ? 'D' : dirNum === 2 ? 'L' : 'U',
        amount: +('0x' + vals[2].substring(2, 7)),
        colour: vals[2],
    };
});

console.log(steps);

interface Coords {
    x: number;
    y: number;
}

let coordsList: Coords[] = [];
let currentCoords: Coords = {
    x: 0,
    y: 0,
};
steps.forEach((step) => {
    let newCoords = { ...currentCoords };
    if (step.dir === 'R') {
        newCoords.x += step.amount;
    }
    if (step.dir === 'L') {
        newCoords.x -= step.amount;
    }
    if (step.dir === 'D') {
        newCoords.y += step.amount;
    }
    if (step.dir === 'U') {
        newCoords.y -= step.amount;
    }
    currentCoords = newCoords;
    coordsList.push(newCoords);
});

let answers = [];

for (let i = 0; i < coordsList.length; i++) {
    let x = coordsList[i].x;
    let y = coordsList[i].y;
    let deltaX = i < coordsList.length - 1 ? coordsList[i + 1].x : 0;
    let deltaY = i < coordsList.length - 1 ? coordsList[i + 1].y : 0;
    answers.push((y + deltaY) * (x - deltaX));
}
const sumInside = answers.reduce((p, a) => p + a) / 2;
const sumOutside = steps.reduce((p, a) => p + a.amount, 0);
console.log(sumInside + 1 - sumOutside / 2 + sumOutside);
