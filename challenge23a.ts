import { readFileSync } from 'fs';

const file = readFileSync('./input23', 'utf-8');

interface Tile {
    isStart: boolean;
    isEnd: boolean;
    x: number;
    y: number;
    north?: Tile;
    east?: Tile;
    south?: Tile;
    west?: Tile;
    slopeDir?: string;
}

const charMatrix = file.split(/\r?\n/).map((line) => line.split(''));

let tiles: Map<string, Tile> = new Map();
charMatrix.forEach((line, y) =>
    line.forEach((char, x) => {
        if (char !== '#') {
            const slopeDir =
                char === '>'
                    ? 'east'
                    : char === '<'
                      ? 'west'
                      : char === '^'
                        ? 'north'
                        : char === 'v'
                          ? 'south'
                          : undefined;
            const isStart = y === 0;
            const isEnd = y === charMatrix.length - 1;

            tiles.set(`${x},${y}`, { slopeDir, isStart, isEnd, x, y });
        }
    })
);

let startPosX = 0;
let startPosY = 0;

tiles.forEach((tile) => {
    if (tile.isStart) {
        startPosX = tile.x;
        startPosY = tile.y;
    }
    if (tiles.has(`${tile.x},${tile.y - 1}`)) {
        tile.north = tiles.get(`${tile.x},${tile.y - 1}`);
    }
    if (tiles.has(`${tile.x},${tile.y + 1}`)) {
        tile.south = tiles.get(`${tile.x},${tile.y + 1}`);
    }
    if (tiles.has(`${tile.x - 1},${tile.y}`)) {
        tile.west = tiles.get(`${tile.x - 1},${tile.y}`);
    }
    if (tiles.has(`${tile.x + 1},${tile.y}`)) {
        tile.east = tiles.get(`${tile.x + 1},${tile.y}`);
    }
    if (tile.slopeDir) {
        for (let dir of ['north', 'south', 'west', 'east']) {
            if (dir !== tile.slopeDir) {
                tile[dir] = undefined;
            }
        }
    }
});

let answers = [];

const move = (tile: Tile, visitedTiles: Map<string, Tile>): void => {
    visitedTiles.set(`${tile.x},${tile.y}`, tile);
    if (tile.isEnd) {
        answers.push(visitedTiles.size - 1);
        return;
    }
    if (tile.north && !visitedTiles.has(`${tile.north.x},${tile.north.y}`)) {
        move(tile.north, new Map(visitedTiles));
    }
    if (tile.west && !visitedTiles.has(`${tile.west.x},${tile.west.y}`)) {
        move(tile.west, new Map(visitedTiles));
    }
    if (tile.south && !visitedTiles.has(`${tile.south.x},${tile.south.y}`)) {
        move(tile.south, new Map(visitedTiles));
    }
    if (tile.east && !visitedTiles.has(`${tile.east.x},${tile.east.y}`)) {
        move(tile.east, new Map(visitedTiles));
    }
};
move(tiles.get(`${startPosX},${startPosY}`), new Map());

console.log(answers.sort((a, b) => b - a).shift());
