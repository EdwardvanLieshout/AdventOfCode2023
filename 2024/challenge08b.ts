import { readFileSync } from 'fs';

const file = readFileSync('./input08.input', 'utf-8');
const input = file.split(/\r?\n/).map((row) => row.split(''));
let uniqueAntennas = [
    ...new Set(
        input
            .map((row) => row.join(''))
            .join('')
            .split('')
            .filter((char) => char !== '.')
    ),
];
let antinodes = [];

const findAntinodes = (ax1: number, ay1: number, ax2: number, ay2: number): void => {
    let deltaX = ax2 - ax1;
    let deltaY = ay2 - ay1;
    let currentX = ax1;
    let currentY = ay1;
    while (input[currentX]?.[currentY] !== undefined) {
        antinodes.push([currentX, currentY]);
        currentX = currentX - deltaX;
        currentY = currentY - deltaY;
    }

    currentX = ax2;
    currentY = ay2;

    while (input[currentX]?.[currentY] !== undefined) {
        antinodes.push([currentX, currentY]);
        currentX = currentX + deltaX;
        currentY = currentY + deltaY;
    }
};

uniqueAntennas.forEach((antenna) => {
    let coords = [];
    input.forEach((row, y) => {
        row.forEach((char, x) => {
            if (char === antenna) {
                coords.push([x, y]);
            }
        });
    });
    while (coords.length > 1) {
        for (let j = coords.length - 1; j > 0; j--) {
            console.log(coords[0], coords[j]);
            findAntinodes(coords[0][0], coords[0][1], coords[j][0], coords[j][1]);
        }
        coords.shift();
    }
});

antinodes = [...new Set(antinodes.map((coords) => JSON.stringify(coords)))];

console.log(antinodes.length);
