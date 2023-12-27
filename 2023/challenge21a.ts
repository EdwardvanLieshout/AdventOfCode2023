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
        tile.north = map[y - 1]?.[x];
        tile.south = map[y + 1]?.[x];
        tile.west = map[y][x - 1];
        tile.east = map[y][x + 1];
        return tile;
    })
);

const checkAndAddTile = (tile: Tile, arr: Tile[]): void => {
    if (tile && !tile.isRock && !arr.find((t) => t.x === tile.x && t.y === tile.y)) {
        arr.push(tile);
    }
};

let possibleTiles: Tile[] = [map[startY][startX]];
for (let i = 0; i < 64; i++) {
    let tempTiles = [];
    for (let tile of possibleTiles) {
        checkAndAddTile(tile.north, tempTiles);
        checkAndAddTile(tile.east, tempTiles);
        checkAndAddTile(tile.west, tempTiles);
        checkAndAddTile(tile.south, tempTiles);
    }
    possibleTiles = tempTiles;
}

console.log(possibleTiles.length);
