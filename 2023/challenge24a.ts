import { readFileSync } from 'fs';

const file = readFileSync('./input24', 'utf-8');

interface Line {
    a: number;
    c: number;
    originalY: number;
    yInterval: number;
}

interface Coords {
    x: number;
    y: number;
}

const arr = file.split(/\r?\n/).map((line) => line.split(' @ ').map((vals) => vals.split(', ').map((num) => +num)));

const lines = arr.map((line) => {
    let a = line[1][0];
    const b = line[1][1];
    const c = (-line[0][0] / a) * b + line[0][1];
    const originalY = line[0][1];
    a = b / a;
    return { a, originalY, c, yInterval: b };
});

const findIntersection = (line1: Line, line2: Line): Coords => {
    const x = (line2.c - line1.c) / (line1.a - line2.a);
    const y = line1.a * x + line1.c;
    if ((line1.yInterval > 0 && line1.originalY > y) || (line2.yInterval > 0 && line2.originalY > y)) {
        return { x: NaN, y: NaN };
    }
    if ((line1.yInterval < 0 && line1.originalY < y) || (line2.yInterval < 0 && line2.originalY < y)) {
        return { x: NaN, y: NaN };
    }
    return { x, y };
};

const coords: Coords[] = [];
lines.forEach((line, i1) => {
    for (let i = i1 + 1; i < lines.length; i++) {
        coords.push(findIntersection(line, lines[i]));
    }
});

console.log(
    coords.filter(
        (coord) =>
            coord.x >= 200000000000000 &&
            coord.x <= 400000000000000 &&
            coord.y >= 200000000000000 &&
            coord.y <= 400000000000000
    ).length
);
