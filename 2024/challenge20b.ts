import { readFileSync } from 'fs';

const file = readFileSync('./input20.input', 'utf-8');
let input = file.split(/\r?\n/).map((row) => row.split(''));

let start = {x: 0, y: 0};
let end = {x: 0, y: 0};
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

input.forEach((row, y) => row.forEach((c, x) => {
    if (c == 'S') {
        start = {x, y};
    }
    if (c == 'E') {
        end = {x, y};
        input[y][x] = '.';
    }
}));

let pos = {x: start.x, y: start.y};
let i = 1;
while(pos.x !== end.x || pos.y !== end.y) {
    for(let dir of directions) {
        if(input[pos.y + dir[1]][pos.x + dir[0]] === '.') {
            pos.x += dir[0];
            pos.y += dir[1];
            input[pos.y][pos.x] = `${i}`;
            i++;
        }
    }
}

input[start.y][start.x] = '0';
let cache = new Map();
let knownStartsAndEnds = new Map();

let cheat = (x: number, y: number, count: number, original: number, originalX: number, originalY: number): number => {
    let stack = [{x, y, count, original, originalX, originalY}];
    let current;
    let cheatCount = 0;
    while(current = stack.shift()) {
        let j = current.original + current.count;
        if(current.count === 21) {
            continue;
        }
        if(cache.has(`${current.x},${current.y},${current.originalX},${current.originalY}`)) {
            continue;
        }
        for(let cheatDir of directions) {
            if(input[current.y + cheatDir[1]]?.[current.x + cheatDir[0]]?.match(/\d+/) && +input[current.y + cheatDir[1]]?.[current.x + cheatDir[0]] > j) {
                let cheatingAmount = +input[current.y + cheatDir[1]]?.[current.x + cheatDir[0]] - j;
                if(cheatingAmount >= 100 && !knownStartsAndEnds.has(`${current.x + cheatDir[0]},${current.y + cheatDir[1]},${originalX},${originalY}`)) {
                    knownStartsAndEnds.set(`${current.x + cheatDir[0]},${current.y + cheatDir[1]},${originalX},${originalY}`, 1);
                    cheatCount++;
                }
            }
            if(input[current.y + cheatDir[1]]?.[current.x + cheatDir[0]] !== undefined) {
                stack.push({x: current.x + cheatDir[0], y: current.y + cheatDir[1], count: current.count+1, original, originalX, originalY});
            }
        }
        cache.set(`${current.x},${current.y},${current.originalX},${current.originalY}`, cheatCount);
    }
    return cheatCount;
}

pos = {x: start.x, y: start.y};
i = 1;
let cheating = [];
while(pos.x !== end.x || pos.y !== end.y) {
    cheating.push(cheat(pos.x, pos.y, 1, +input[pos.y][pos.x], pos.x, pos.y));
    for(let dir of directions) {
        if(input[pos.y + dir[1]][pos.x + dir[0]] === `${i}`) {
            pos.x += dir[0];
            pos.y += dir[1];
            i++;
            break;
        }
    }
}

console.log(cheating.reduce((p, a) => p + a, 0));
