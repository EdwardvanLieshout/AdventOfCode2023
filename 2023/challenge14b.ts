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

const moveRocksAndRotate = (map: string): string => {
    const tiltedMap = moveAllRocks(map);
    const tiltedMatrix = tiltedMap.split(/\r?\n/).map((line) => line.split(''));
    const rotatedMatrix = tiltedMatrix[0].map((val, index) => tiltedMatrix.map((row) => row[index]).reverse());
    return rotatedMatrix.map((line) => line.join('')).join('\n');
};

let map = file;

for (let i = 0; i < 1000; i++) {
    map = moveRocksAndRotate(map);
    map = moveRocksAndRotate(map);
    map = moveRocksAndRotate(map);
    map = moveRocksAndRotate(map);

    const matrix = map.split(/\r?\n/).map((line) => line.split(''));
    const amounts = matrix.map((row, i) => {
        return row.filter((char) => char === 'O').length * (matrix.length - i);
    });

    console.log(amounts.reduce((p, a) => p + a));
}

// After a while the following cycle repeats endlessly:

const repeatCycle = [
    102657, 102655, 102648, 102651, 102642, 102643, 102656, 102660, 102653, 102647, 102654, 102643, 102656, 102660,
    102653, 102647, 102654, 102640, 102642, 102659, 102658, 102652, 102650, 102652, 102639, 102645, 102657,
];

// Calculate where in the above cycle we are after 1000000000 cycles

let index = (1000000000 - 1000) % repeatCycle.length;
let answer = repeatCycle[index];

console.log('answer:', answer);
