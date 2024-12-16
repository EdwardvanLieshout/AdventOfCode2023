import { readFileSync } from "fs";

const file = readFileSync('./input16.input', 'utf-8');
const input = file.split("\n").map(line => line.split(''))

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

let start = {
    x: 0,
    y: 0,
    dirIndex: 0
};
let end = {
    x: 0,
    y: 0
};

input.forEach((row, y) => row.forEach((c, x) => {
    if (c === '#') {
        return;
    }
    if (c == 'S') {
        start = {x, y, dirIndex: 0};
    }
    if (c == 'E') {
        end = {x, y};
    }
    input[y][x] = '.';
}));

const findShortestPaths = (start, end): string[][] => {
    let stack = [{tile: start, path: [], cost: 0}];
    let current
    let cache = {}; 
    let paths = [];
    let lowestCompletion = 999999999;
    while (current = stack.shift()) {
        current.path.push(current.tile.x+','+current.tile.y);
        if (current.tile.x === end.x && current.tile.y === end.y) {
            if (current.cost < lowestCompletion) {
                paths = [];
                lowestCompletion = current.cost;
            };
            if (current.cost === lowestCompletion) {
                paths.push(current.path);
            }
            continue;
        }

        let cacheId = current.tile.x + ',' + current.tile.y + ',' + current.tile.dirId;
        if (cache[cacheId] < current.cost) {
            continue;
        }
        cache[cacheId] = current.cost;
        if (current.cost > lowestCompletion) {
            continue;
        }

        let currentDir = directions[current.tile.dirIndex];
        directions.forEach((dir, dirId) => {
            if (dir[0] === -currentDir && dir[1] === -currentDir[1]) {
                return;
            }
            let tile = {x: current.tile.x+dir[0], y: current.tile.y+dir[1], dirIndex: dirId};
            if (input[tile.y]?.[tile.x] === '#') {
                return;
            }
            stack.push({
                path: current.path.slice(),
                tile: tile,
                cost: current.cost + (tile.dirIndex == current.tile.dirIndex ? 1 : 1001)
            })
        })
    }
    return paths;
}

let paths = findShortestPaths(start, end);
console.log(new Set([...paths.flat()]).size);
