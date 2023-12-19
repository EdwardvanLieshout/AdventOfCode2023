import { readFileSync } from 'fs';
import { json } from 'stream/consumers';
import { listenerCount } from 'events';

const file = readFileSync('./input18', 'utf-8');

interface DigStep {
    dir: string;
    amount: number;
    colour: string;
}

const steps: DigStep[] = file
    .split(/\r?\n/).map((line) => {
        const vals = line.split(' ');
        return {
            dir: vals[0],
            amount: +vals[1],
            colour: vals[2]
        }
    });

let matrix: string[][] = [['#']];
let xPos: number = 0;
let yPos: number = 0;
steps.forEach((step) => {
    if(step.dir === 'R'){
        const newXPos = xPos + step.amount;
        if(matrix[0].length < newXPos + 1){
            matrix.forEach((line) => line.push(...new Array(newXPos + 1 - line.length).fill('.')))
        }
        for(let x = xPos + 1; x < newXPos + 1; x++) {
            matrix[yPos][x] = '#';
        }
        xPos = newXPos;
    }
    if(step.dir === 'L'){
        let newXPos = xPos - step.amount;
        if(newXPos < 0){
            matrix.forEach((line) => line.unshift(...new Array(0 - newXPos).fill('.')))
            xPos += 0-newXPos
            newXPos = 0;
        }
        for(let x = xPos - 1; x > newXPos - 1; x--) {
            matrix[yPos][x] = '#';
        }
        xPos = newXPos;
    }
    if(step.dir === 'D'){
        const newYPos = yPos + step.amount;
        if(matrix.length < newYPos + 1){
            matrix.push(...Array.from({ length: newYPos + 1 - matrix.length }, (e) => new Array(matrix[0].length).fill('.')));
        }
        for(let y = yPos + 1; y < newYPos + 1; y++) {
            matrix[y][xPos] = '#';
        }
        yPos = newYPos;
    }
    if(step.dir === 'U'){
        let newYPos = yPos - step.amount;
        if(newYPos < 0){
            matrix.unshift(...Array.from({ length: 0 - newYPos }, (e) => new Array(matrix[0].length).fill('.')));
            yPos += 0-newYPos
            newYPos = 0;
        }
        for(let y = yPos - 1; y > newYPos - 1; y--) {
            matrix[y][xPos] = '#';
        }
        yPos = newYPos;
    }
})

console.log(matrix.map((line) => line.join('')).join('\n'));


const waterFill = (x, y) => {
    if(matrix[y][x] === '#') {
        return;
    }
    matrix[y][x] = '#';
    
    setTimeout(() => waterFill(x-1, y), 0);
    setTimeout(() => waterFill(x+1, y), 0);
    setTimeout(() => waterFill(x, y-1), 0);
    setTimeout(() => waterFill(x, y+1), 0);
}

let startedWaterFill = false;
for(let y = 0; y < matrix.length; y++) {
    let findFirstHash = false;
    let findFirstInnerDot = false;
    for(let x = 0; x < matrix[0].length; x++) {
        if(matrix[y][x]==='#' && !findFirstHash) {
            findFirstHash = true;
        }
        if(matrix[y][x]==='.' && findFirstHash) {
            findFirstInnerDot = true;
        }
        if(matrix[y][x]==='#' && findFirstInnerDot) {
            findFirstHash = true;
            waterFill(x-1, y);
            startedWaterFill = true;
            break;
        }
    }
    if(startedWaterFill) {
        break;
    }
}


setTimeout(() => {
    console.log();
    const amounts = matrix.map((line) => line.filter((c) => c === '#').length);
    console.log(matrix.map((line) => line.join('')).join('\n'));
    console.log(amounts.reduce((p, a) => p + a));
}, 3000)
