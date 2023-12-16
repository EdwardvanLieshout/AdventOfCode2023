import { readFileSync } from 'fs';

const file = readFileSync('./input16', 'utf-8');
const arr = file.split(/\r?\n/).map((line) => line.split(''));

interface Tile {
    symbol: string;
    isEnergized: boolean;
    xCoord: number;
    yCoord: number;
}

let tiles: Tile[][] = arr.map((line, y) =>
    line.map((char, x) => {
        return {
            symbol: char,
            isEnergized: false,
            xCoord: x,
            yCoord: y,
        };
    })
);

const move = (currentX: number, currentY, dir: string): void => {
    if (dir === 'right') {
        currentX += 1;
        if (currentX >= tiles[0].length) {
            return;
        }
    }
    if (dir === 'left') {
        currentX -= 1;
        if (currentX < 0) {
            return;
        }
    }
    if (dir === 'down') {
        currentY += 1;
        if (currentY >= tiles.length) {
            return;
        }
    }
    if (dir === 'up') {
        currentY -= 1;
        if (currentY < 0) {
            return;
        }
    }
    if (
        tiles[currentY][currentX].isEnergized &&
        (tiles[currentY][currentX].symbol === '|' || tiles[currentY][currentX].symbol === '-')
    ) {
        return;
    }
    tiles[currentY][currentX].isEnergized = true;
    let tile = tiles[currentY][currentX];
    if (tile.symbol === '/') {
        const newDir = dir === 'right' ? 'up' : dir === 'left' ? 'down' : dir === 'up' ? 'right' : 'left';
        move(currentX, currentY, newDir);
        return;
    }
    if (tile.symbol === '\\') {
        const newDir = dir === 'right' ? 'down' : dir === 'left' ? 'up' : dir === 'up' ? 'left' : 'right';
        move(currentX, currentY, newDir);
        return;
    }
    if (tile.symbol === '|' && (dir === 'left' || dir === 'right')) {
        move(currentX, currentY, 'up');
        move(currentX, currentY, 'down');
        return;
    }
    if (tile.symbol === '-' && (dir === 'up' || dir === 'down')) {
        move(currentX, currentY, 'left');
        move(currentX, currentY, 'right');
        return;
    }

    move(currentX, currentY, dir);
};

let scores = [];

const findScores = (x, y, dir): void => {
    tiles.forEach((line, yi) => {
        line.forEach((tile, xi) => {
            tiles[yi][xi].isEnergized = false;
        });
    });
    move(x, y, dir);
    if (x === -1) {
        tiles[y][0].isEnergized = true;
    } else {
        tiles[0][x].isEnergized = true;
    }

    const laserTrajectory = tiles.map((line) => line.map((tile) => (tile.isEnergized ? '#' : '.')).join('')).join('\n');
    let count = 0;
    tiles.forEach((line) => {
        line.forEach((tile) => {
            count += tile.isEnergized ? 1 : 0;
        });
    });

    console.log(laserTrajectory);
    console.log(count);
    scores.push(count);
};

for (let y = 0; y < tiles.length; y++) {
    findScores(-1, y, 'right');
    findScores(tiles[0].length - 1, y, 'left');
}

for (let x = 0; x < tiles[0].length; x++) {
    findScores(x, -1, 'down');
    findScores(x, tiles.length - 1, 'up');
}

console.log(scores.sort((a, b) => b - a));
console.log(scores.sort((a, b) => b - a)[0]);
