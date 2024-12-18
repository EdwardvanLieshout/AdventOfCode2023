import { readFileSync } from 'fs';

const file = readFileSync('./input18.input', 'utf-8');
const input = file.split(/\r?\n/).map((coord) => coord.split(','));

const map = Array.from({length: 71}, e => Array(71).fill('.'));
for(let i = 0; i < 1024; i++) {
    map[input[i][1]][input[i][0]] = '#';
}


const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
let start = [0, 0];
let end = [70, 70];

const solveMaze = (): void => {
    let stack = [{coord: start, score: 0}];
    let current
    while(current = stack.shift()) {
        if(map[current.coord[1]][current.coord[0]] !== '.') {
            continue;
        }
        current.score += 1;
        console.log(current);
        map[current.coord[1]][current.coord[0]] = `${current.score}`;
        if(current.coord[1] === end[1] && current.coord[0] === end[0]) {
            return;
        }
        directions.forEach((dir) => {
            if(map[current.coord[1]+dir[1]]?.[current.coord[0]+dir[0]] === '.') {
                stack.push({coord: [current.coord[0]+dir[0], current.coord[1]+dir[1]], score: current.score});
            }
        })
    }
}

solveMaze();

console.log(map.map((row) => row.join('')).join('\n'));
console.log(+map[end[1]][end[0]]-1)
