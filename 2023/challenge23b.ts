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

interface Route {
    travelTime: number;
    destination: Node;
}

interface Node {
    x: number;
    y: number;
    north?: Route;
    east?: Route;
    south?: Route;
    west?: Route;
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
});

let nodes: Map<string, Node> = new Map();

tiles.forEach((tile) => {
    if (
        [tile.north, tile.west, tile.east, tile.south].filter((dir) => dir !== undefined).length > 2 ||
        tile.isStart ||
        tile.isEnd
    ) {
        nodes.set(`${tile.x},${tile.y}`, { x: tile.x, y: tile.y });
    }
});

const findDestination = (tile: Tile, visitedTiles: string[]): Route => {
    visitedTiles.push(`${tile.x},${tile.y}`);
    if (nodes.has(`${tile.x},${tile.y}`)) {
        return {
            destination: nodes.get(`${tile.x},${tile.y}`),
            travelTime: visitedTiles.length - 1,
        };
    }
    if (tile.north && !visitedTiles.includes(`${tile.north.x},${tile.north.y}`)) {
        return findDestination(tile.north, [...visitedTiles]);
    }
    if (tile.west && !visitedTiles.includes(`${tile.west.x},${tile.west.y}`)) {
        return findDestination(tile.west, [...visitedTiles]);
    }
    if (tile.south && !visitedTiles.includes(`${tile.south.x},${tile.south.y}`)) {
        return findDestination(tile.south, [...visitedTiles]);
    }
    if (tile.east && !visitedTiles.includes(`${tile.east.x},${tile.east.y}`)) {
        return findDestination(tile.east, [...visitedTiles]);
    }
    return undefined;
};

nodes.forEach((node) => {
    for (let dir of ['north', 'south', 'west', 'east']) {
        const tile = tiles.get(`${node.x},${node.y}`)[dir];
        if (tile === undefined) {
            continue;
        }
        const route = findDestination(tile, [`${node.x},${node.y}`]);
        node[dir] = route;
    }
});

let answers = [];
const move = (node: Node, visitedNodes: Node[], traveled: number): void => {
    visitedNodes.push(node);
    if (
        traveled > 1 &&
        [node.north, node.west, node.east, node.south].filter((dir) => dir !== undefined).length === 1
    ) {
        answers.push(traveled);
        return;
    }
    if (node.north && !visitedNodes.includes(node.north.destination)) {
        move(node.north.destination, [...visitedNodes], traveled + node.north.travelTime);
    }
    if (node.west && !visitedNodes.includes(node.west.destination)) {
        move(node.west.destination, [...visitedNodes], traveled + node.west.travelTime);
    }
    if (node.south && !visitedNodes.includes(node.south.destination)) {
        move(node.south.destination, [...visitedNodes], traveled + node.south.travelTime);
    }
    if (node.east && !visitedNodes.includes(node.east.destination)) {
        move(node.east.destination, [...visitedNodes], traveled + node.east.travelTime);
    }
};
move(nodes.get(`${startPosX},${startPosY}`), [], 0);

console.log(answers.sort((a, b) => b - a).shift());
