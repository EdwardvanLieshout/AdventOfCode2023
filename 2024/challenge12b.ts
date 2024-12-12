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

const findInnerCorners = (char: string, x: number, y: number): number => {
  let corners = 0;
  if(input[y][x-1] === char && input[y-1]?.[x] === char && input[y-1]?.[x-1] !== char) {
    corners++;
  }
  if(input[y][x+1] === char && input[y-1]?.[x] === char && input[y-1]?.[x+1] !== char) {
    corners++;
  }
  if(input[y][x-1] === char && input[y+1]?.[x] === char && input[y+1]?.[x-1] !== char) {
    corners++;
  }
  if(input[y][x+1] === char && input[y+1]?.[x] === char && input[y+1]?.[x+1] !== char) {
    corners++;
  }
  return corners;
}

const findOuterCorners = (char: string, x: number, y: number): number => {
  if(input[y-1]?.[x] !== char && input[y+1]?.[x] !== char && input[y][x-1] !== char && input[y][x+1] !== char) {
    return 4;
  }
  if(input[y-1]?.[x] === char && input[y+1]?.[x] !== char && input[y][x-1] !== char && input[y][x+1] !== char) {
    return 2;
  }
  if(input[y-1]?.[x] !== char && input[y+1]?.[x] === char && input[y][x-1] !== char && input[y][x+1] !== char) {
    return 2;
  }
  if(input[y-1]?.[x] !== char && input[y+1]?.[x] !== char && input[y][x-1] === char && input[y][x+1] !== char) {
    return 2;
  }
  if(input[y-1]?.[x] !== char && input[y+1]?.[x] !== char && input[y][x-1] !== char && input[y][x+1] === char) {
    return 2;
  }
  if(input[y-1]?.[x] !== char && input[y+1]?.[x] === char && input[y][x-1] !== char && input[y][x+1] === char) {
    return 1;
  }
  if(input[y-1]?.[x] !== char && input[y+1]?.[x] === char && input[y][x-1] === char && input[y][x+1] !== char) {
    return 1;
  }
  if(input[y-1]?.[x] === char && input[y+1]?.[x] !== char && input[y][x-1] !== char && input[y][x+1] === char) {
    return 1;
  }
  if(input[y-1]?.[x] === char && input[y+1]?.[x] !== char && input[y][x-1] === char && input[y][x+1] !== char) {
    return 1;
  }
  return 0;
}

const floodfillRegion = (char: string, x: number, y: number): void => {
    if(input[y][x+1] === char) {
        if(!visited.includes((x+1) + ',' + y)) {
                visited.push((x+1) + ',' + y);
                regions[regions.length-1].area++;
                floodfillRegion(char, x+1, y);
        } 
    } else {
    }
    if(input[y][x-1] === char) {
        if(!visited.includes((x-1) + ',' + y)) {
            visited.push((x-1) + ',' + y);
            regions[regions.length-1].area++;
            floodfillRegion(char, x-1, y);
        }
    } else {
    }
    if(input[y+1]?.[x] === char) {
        if(!visited.includes(x + ',' + (y+1))) {
            visited.push(x + ',' + (y+1));
            regions[regions.length-1].area++;
            floodfillRegion(char, x, y+1);
        } 
    } else {
    }
    if(input[y-1]?.[x] === char) {
    if(!visited.includes(x + ',' + (y-1))) {
        visited.push(x + ',' + (y-1));
        regions[regions.length-1].area++;
        floodfillRegion(char, x, y-1);
        } 
    } else {
    }
    regions[regions.length-1].perimeter += findInnerCorners(char, x, y);
    regions[regions.length-1].perimeter += findOuterCorners(char, x, y);
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
