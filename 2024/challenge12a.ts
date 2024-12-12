import { readFileSync } from 'fs';

const file = readFileSync('./input12.input', 'utf-8');
const input = file.split(/\r?\n/).map((row) => row.split(''));

let regions = [];
let visited = [];

interface region {
    char: string;
    perimeter: number;
    area: number;
}

const floodfillRegion = (char: string, x: number, y: number): void => {
    if(input[y][x+1] === char) {
        if(!visited.includes((x+1) + ',' + y)) {
                visited.push((x+1) + ',' + y);
                regions[regions.length-1].area++;
                floodfillRegion(char, x+1, y);
        } 
    } else {
        regions[regions.length-1].perimeter++;
    }
    if(input[y][x-1] === char) {
        if(!visited.includes((x-1) + ',' + y)) {
            visited.push((x-1) + ',' + y);
            regions[regions.length-1].area++;
            floodfillRegion(char, x-1, y);
        }
    } else {
        regions[regions.length-1].perimeter++;
    }
    if(input[y+1]?.[x] === char) {
        if(!visited.includes(x + ',' + (y+1))) {
            visited.push(x + ',' + (y+1));
            regions[regions.length-1].area++;
            floodfillRegion(char, x, y+1);
        } 
    } else {
        regions[regions.length-1].perimeter++;
    }
    if(input[y-1]?.[x] === char) {
    if(!visited.includes(x + ',' + (y-1))) {
        visited.push(x + ',' + (y-1));
        regions[regions.length-1].area++;
        floodfillRegion(char, x, y-1);
        } 
    } else {
        regions[regions.length-1].perimeter++;
    }
}

input.forEach((row, y) => {
    row.forEach((char, x) => {
        if(!visited.includes(x + ',' + y)) {
            visited.push(x + ',' + y);
            regions.push({char: char, perimeter: 0, area: 1});
            floodfillRegion(char, x, y);
        }
    })
});

const values = regions.map((region) => region.perimeter*region.area);

console.log(regions);
console.log(values.reduce((p, a) => p + a, 0));
