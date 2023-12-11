import { readFileSync } from 'fs';

const file = readFileSync('./input11', 'utf-8');
let arr = file.split(/\r?\n/);

for (let i = 0; i < arr.length; i++) {
    if (!arr[i].includes('#')) {
        arr = [...arr.slice(0, i), arr[i], ...arr.slice(i)];
        i++;
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
        arr = arr.map((str) => {
            return str.slice(0, i) + '.' + str.slice(i);
        });
        i++;
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
        amount += Math.abs(galaxies[0].xPos - galaxies[i].xPos);
        amount += Math.abs(galaxies[0].yPos - galaxies[i].yPos);
        amounts.push(amount);
    }
    galaxies.shift();
}

console.log(galaxies);
console.log(amounts.reduce((p, a) => p + a, 0));
