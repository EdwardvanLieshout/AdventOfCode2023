import { readFileSync } from 'fs';

const file = readFileSync('./input14', 'utf-8');

const moveAllRocks = (map: string): string => {
    const tiles = map.split(/\r?\n/).map((line) => line.split(''));

    for (let y = 0; y < tiles.length - 1; y++) {
        tiles[y].forEach((tile, x) => {
            if (tile === '.') {
                if (tiles[y + 1][x] === 'O') {
                    tiles[y][x] = 'O';
                    tiles[y + 1][x] = '.';
                }
            }
        });
    }

    const tileDisplay = tiles.map((line) => line.join('')).join('\n');
    if (map === tileDisplay) {
        return tileDisplay;
    } else {
        return moveAllRocks(tileDisplay);
    }
};

const tiltedMap = moveAllRocks(file);
const tiltedMapRows = tiltedMap.split(/\r?\n/);
const amounts = tiltedMapRows.map((row, i) => {
    return row.split('').filter((char) => char === 'O').length * (tiltedMapRows.length - i);
});

console.log(amounts.reduce((p, a) => p + a));
