import { readFileSync } from 'fs';

const file = readFileSync('./input21', 'utf-8');

interface Tile {
    isRock: boolean;
    north?: Tile;
    west?: Tile;
    east?: Tile;
    south?: Tile;
    x: number;
    y: number;
}

interface Coords {
    x: number;
    y: number;
}

let startX = 0;
let startY = 0;

let map: Tile[][] = file.split(/\r?\n/).map((line, y) =>
    line.split('').map((char, x) => {
        if (char === 'S') {
            startX = x;
            startY = y;
        }
        return {
            isRock: char === '#',
            x,
            y,
        };
    })
);

map = map.map((line, y) =>
    line.map((tile, x) => {
        tile.north = map[y - 1 < 0 ? map.length - 1 : y - 1][x];
        tile.south = map[y + 1 >= map.length ? 0 : y + 1][x];
        tile.west = map[y][x - 1 < 0 ? map.length - 1 : x - 1];
        tile.east = map[y][x + 1 >= map.length ? 0 : x + 1];
        return tile;
    })
);

const checkAndAddTile = (tile: Tile, map: Map<string, Coords>, coords: Coords): void => {
    if (tile && !tile.isRock && !map.has(`${coords.x},${coords.y}`)) {
        map.set(`${coords.x},${coords.y}`, coords);
    }
};
let answers = [];
let testBuffer: Coords[] = [{ x: startX, y: startY }];
const amountOfSolves = map.length > 11 ? map.length * 2 + 1 : map.length * 10 + 1;
for (let i = 0; i < amountOfSolves; i++) {
    let tempTiles = new Map<string, Coords>();
    for (let coords of testBuffer) {
        const loopingX = (coords.x + Math.abs(coords.x) * map[0].length) % map[0].length;
        const loopingY = (coords.y + Math.abs(coords.y) * map.length) % map.length;
        checkAndAddTile(map[loopingY][loopingX].north, tempTiles, { x: coords.x, y: coords.y - 1 });
        checkAndAddTile(map[loopingY][loopingX].south, tempTiles, { x: coords.x, y: coords.y + 1 });
        checkAndAddTile(map[loopingY][loopingX].west, tempTiles, { x: coords.x - 1, y: coords.y });
        checkAndAddTile(map[loopingY][loopingX].east, tempTiles, { x: coords.x + 1, y: coords.y });
    }
    testBuffer = [...tempTiles.values()];
    answers.push(testBuffer.length);
}

let dimension = map.length;
for (let i = answers.length; i < 26501365; i++) {
    let firstCycle = answers[i - 2 * dimension] - answers[i - (2 * dimension + 1)];
    let secondCycle = answers[i - dimension] - answers[i - (dimension + 1)];
    let currentDelta = secondCycle + secondCycle - firstCycle;
    answers.push(answers[i - 1] + currentDelta);
}
console.log(answers.pop());
