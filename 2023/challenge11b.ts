import { readFileSync } from 'fs';

const file = readFileSync('./input11', 'utf-8');
let arr = file.split(/\r?\n/);

let millionYearsX = [];
let millionYearsY = [];

for (let i = 0; i < arr.length; i++) {
    if (!arr[i].includes('#')) {
        millionYearsY.push(i);
    }
}

for (let i = 0; i < arr[0].length; i++) {
    let hasGalaxy = false;
    arr.forEach((line) => {
        if (line.split('')[i] === '#') {
            hasGalaxy = true;
        }
    });
    if (!hasGalaxy) {
        millionYearsX.push(i);
    }
}

interface Galaxy {
    xPos: number;
    yPos: number;
}

let galaxies: Galaxy[] = [];

arr.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (char === '#') {
            galaxies.push({ xPos: x, yPos: y });
        }
    });
});

let amounts = [];

while (galaxies.length > 1) {
    for (let i = 1; i < galaxies.length; i++) {
        let amount = 0;
        const amountExtraX = millionYearsX.filter(
            (x) => (x > galaxies[0].xPos && x < galaxies[i].xPos) || (x > galaxies[i].xPos && x < galaxies[0].xPos)
        ).length;
        const amountExtraY = millionYearsY.filter(
            (y) => (y > galaxies[0].yPos && y < galaxies[i].yPos) || (y > galaxies[i].yPos && y < galaxies[0].yPos)
        ).length;
        amount += Math.abs(galaxies[0].xPos - galaxies[i].xPos) + amountExtraX * 999999;
        amount += Math.abs(galaxies[0].yPos - galaxies[i].yPos) + amountExtraY * 999999;
        amounts.push(amount);
    }
    galaxies.shift();
}

console.log(amounts.reduce((p, a) => p + a, 0));
