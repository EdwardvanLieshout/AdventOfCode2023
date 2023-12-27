import { readFileSync } from 'fs';

const file = readFileSync('./input03.input', 'utf-8');
const map = file.split(/\r?\n/).map((line) => line.repeat(50).split(''));

let ypos = 0;
let xpos = 0;
let treecount = 0;
while (true) {
    xpos += 3;
    ypos++;
    if (ypos >= map.length) {
        break;
    }
    if (map[ypos][xpos] === undefined) {
        throw new Error();
    }
    if (map[ypos][xpos] === '#') {
        treecount++;
    }
}

console.log(treecount);
