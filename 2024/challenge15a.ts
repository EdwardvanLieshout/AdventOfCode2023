import { readFileSync } from 'fs';

const file = readFileSync('./input15.input', 'utf-8');
const map = file.split(/\r?\n\r?\n/)[0].split(/\r?\n/).map((row) => row.split(''));
const actions = file.split(/\r?\n\r?\n/)[1].split(/\r?\n/).map((row) => row.split('')).flat();

let robotY = map.findIndex((row) => row.includes('@'));
let robotX = map[robotY].findIndex((c) => c === '@');

const move = (dirX: number, dirY: number, posX: number, posY: number): void => {
    let checkTileX = posX + dirX;
    let checkTileY = posY + dirY;
    let stoneCount = 0;
    while(map[checkTileY][checkTileX] === 'O') {
        stoneCount++;
        checkTileX += dirX;
        checkTileY += dirY;
    }
    if(map[checkTileY][checkTileX] === '#') {
        return;
    }
    map[posY + dirY][posX + dirX] = '@';
    robotX += dirX;
    robotY += dirY;
    map[posY][posX] = '.';
    if(stoneCount) {
        map[checkTileY][checkTileX] = 'O'
    }
}

actions.forEach((action) => {
    if(action === '<') {
        move(-1, 0, robotX, robotY);
    }
    if(action === '>') {
        move(1, 0, robotX, robotY);
    }
    if(action === 'v') {
        move(0, 1, robotX, robotY);
    }
    if(action === '^') {
        move(0, -1, robotX, robotY);
    }
});

let stoneVals = [];

map.forEach((row, y) => {
    row.forEach((c, x) => {
        if (c === 'O') {
            stoneVals.push(y*100+x);
        }
    })
})

console.log(map.map((row) => row.join('')).join('\n'));
console.log(stoneVals.reduce((p, a) => p + a, 0));
