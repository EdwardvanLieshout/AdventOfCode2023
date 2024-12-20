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

pos = {x: start.x, y: start.y};
i = 1;
let cheating = [];
while(pos.x !== end.x || pos.y !== end.y) {
    for(let cheatDir of directions) {
        for(let extraCheatDir of directions) {
            let j = i + 2;
            if(input[pos.y + cheatDir[1] + extraCheatDir[1]]?.[pos.x + cheatDir[0] + extraCheatDir[0]]?.match(/\d+/) && +input[pos.y + cheatDir[1] + extraCheatDir[1]]?.[pos.x + cheatDir[0] + extraCheatDir[0]] >= j) {
                let cheatingAmount = +input[pos.y + cheatDir[1] + extraCheatDir[1]]?.[pos.x + cheatDir[0] + extraCheatDir[0]] + 1 - j;
                if(cheatingAmount >= 100) {
                    cheating.push(cheatingAmount);
                }
            }
        }
    }
    for(let dir of directions) {
        if(input[pos.y + dir[1]][pos.x + dir[0]] === `${i}`) {
            pos.x += dir[0];
            pos.y += dir[1];
            i++;
            break;
        }
    }
}

console.log(input.map((row) => row.join('')).join('\n'));
console.log(cheating);
console.log(cheating.length);
