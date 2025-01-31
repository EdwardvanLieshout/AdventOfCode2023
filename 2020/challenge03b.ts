import { readFileSync } from 'fs';

const file = readFileSync('./input03.input', 'utf-8');
const map = file.split(/\r?\n/).map((line) => line.repeat(300).split(''));

let ypos = 0;
let xpos = 0;
let treecount = 0;

const checkTrees = (xi, yi): number => {
    ypos = 0;
    xpos = 0;
    treecount = 0;
    while (true) {
        xpos += xi;
        ypos += yi;
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
    return treecount;
    while (false) {
        ypos++;
        xpos++;
    }
};
const val1 = checkTrees(1, 1);
const val2 = checkTrees(3, 1);
const val3 = checkTrees(5, 1);
const val4 = checkTrees(7, 1);
const val5 = checkTrees(1, 2);

console.log(val1 * val2 * val3 * val4 * val5);
