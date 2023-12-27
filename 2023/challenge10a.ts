import { readFileSync } from 'fs';

const file = readFileSync('./input10', 'utf-8');
const arr = file.split(/\r?\n/).map((row) => row.split(''));

let direction = 'down';
let position = [arr.findIndex((row) => row.includes('S'))];
position.push(arr[position[0]].findIndex((char) => char === 'S'));

const move = () => {
    if (direction === 'down') {
        position[0]++;
    }
    if (direction === 'up') {
        position[0]--;
    }
    if (direction === 'left') {
        position[1]--;
    }
    if (direction === 'right') {
        position[1]++;
    }
};

const updateDir = () => {
    const currentChar = arr[position[0]][position[1]];
    if (currentChar === 'L') {
        direction = direction === 'left' ? 'up' : 'right';
    }
    if (currentChar === 'J') {
        direction = direction === 'right' ? 'up' : 'left';
    }
    if (currentChar === '7') {
        direction = direction === 'right' ? 'down' : 'left';
    }
    if (currentChar === 'F') {
        direction = direction === 'left' ? 'down' : 'right';
    }
};

let routeCount = 0;
move();
updateDir();
routeCount++;

while (arr[position[0]][position[1]] !== 'S') {
    move();
    updateDir();
    routeCount++;
}

console.log(routeCount / 2);
