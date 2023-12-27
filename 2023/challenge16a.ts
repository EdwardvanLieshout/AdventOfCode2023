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

move(-1, 0, 'right');
tiles[0][0].isEnergized = true;

const laserTrajectory = tiles.map((line) => line.map((tile) => (tile.isEnergized ? '#' : '.')).join('')).join('\n');
let count = 0;
tiles.forEach((line) => {
    line.forEach((tile) => {
        count += tile.isEnergized ? 1 : 0;
    });
});
console.log(laserTrajectory);
console.log(count);
