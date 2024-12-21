import { readFileSync } from 'fs';

const file = readFileSync('./input21.input', 'utf-8');
const input = file.split(/\r?\n/);

let numpad = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['', '0', 'A']];

let directionalPad = [
    ['', '^', 'A'],
    ['<', 'v', '>']
]

let firstRobotPos = [2, 3];
let secondRobotPos = [2, 0];
let thirdRobotPos = [2, 0];

const mapNumSequenceToSecondBotMoves = (str: string): string => {
    let i = 0;
    let secondRobotSequence = '';
    while(i < str.length) {
        let nextChar = str.split('')[i]
        let nextCharPosY = numpad.findIndex((n) => n.includes(nextChar));
        let nextCharPosX = numpad[nextCharPosY].findIndex((n) => n === nextChar);
        let nextCharDiff = [nextCharPosX, nextCharPosY];
        let firstRobotDelta = [nextCharDiff[0]-firstRobotPos[0], nextCharDiff[1]-firstRobotPos[1]];
        let secondRobotLeftMoves = firstRobotDelta[0] < 0 ? -firstRobotDelta[0] : 0;
        let secondRobotRightMoves = firstRobotDelta[0] > 0 ? firstRobotDelta[0] : 0;
        let secondRobotUpMoves = firstRobotDelta[1] < 0 ? -firstRobotDelta[1] : 0;
        let secondRobotDownMoves = firstRobotDelta[1] > 0? firstRobotDelta[1] : 0;
        if(numpad[firstRobotPos[1]][nextCharPosX] !== '' && secondRobotLeftMoves) {
            secondRobotSequence += Array(secondRobotLeftMoves).fill('<').join('');
        }
        if(numpad[nextCharPosY][firstRobotPos[0]] !== '' && secondRobotDownMoves) {
            secondRobotSequence += Array(secondRobotDownMoves).fill('v').join('');
        }
        if(secondRobotUpMoves) {
            secondRobotSequence += Array(secondRobotUpMoves).fill('^').join('');
        }
        if(secondRobotLeftMoves && numpad[firstRobotPos[1]][nextCharPosX] === '' ) {
            secondRobotSequence += Array(secondRobotLeftMoves).fill('<').join('');
        }
        if(secondRobotRightMoves) {
            secondRobotSequence += Array(secondRobotRightMoves).fill('>').join('');
        }
        if(numpad[nextCharPosY][firstRobotPos[0]] === '' && secondRobotDownMoves) {
            secondRobotSequence += Array(secondRobotDownMoves).fill('v').join('');
        }
        secondRobotSequence += 'A';
        firstRobotPos = [...nextCharDiff];
        i++;
    }
    return secondRobotSequence;
}

const mapSecondSequenceToThirdSequence = (str: string): string => {
    let i = 0;
    let thirdRobotSequence = '';
    while(i < str.length) {
        let nextChar = str.split('')[i]
        let nextCharPosY = directionalPad.findIndex((n) => n.includes(nextChar));
        let nextCharPosX = directionalPad[nextCharPosY].findIndex((n) => n === nextChar);
        let nextCharDiff = [nextCharPosX, nextCharPosY];
        let secondRobotDelta = [nextCharDiff[0]-secondRobotPos[0], nextCharDiff[1]-secondRobotPos[1]];
        let thirdRobotLeftMoves = secondRobotDelta[0] < 0 ? -secondRobotDelta[0] : 0;
        let thirdRobotRightMoves = secondRobotDelta[0] > 0 ? secondRobotDelta[0] : 0;
        let thirdRobotUpMoves = secondRobotDelta[1] < 0 ? -secondRobotDelta[1] : 0;
        let thirdRobotDownMoves = secondRobotDelta[1] > 0? secondRobotDelta[1] : 0;
        if(directionalPad[secondRobotPos[1]][nextCharPosX] !== '' && thirdRobotLeftMoves) {
            thirdRobotSequence += Array(thirdRobotLeftMoves).fill('<').join('');
        }
        if(directionalPad[nextCharPosY][secondRobotPos[0]] !== '' && thirdRobotDownMoves) {
            thirdRobotSequence += Array(thirdRobotDownMoves).fill('v').join('');
        }
        if(thirdRobotUpMoves) {
            thirdRobotSequence += Array(thirdRobotUpMoves).fill('^').join('');
        }
        if(thirdRobotLeftMoves && directionalPad[secondRobotPos[1]][nextCharPosX] === '' ) {
            thirdRobotSequence += Array(thirdRobotLeftMoves).fill('<').join('');
        }
        if(thirdRobotRightMoves) {
            thirdRobotSequence += Array(thirdRobotRightMoves).fill('>').join('');
        }
        if(directionalPad[nextCharPosY][secondRobotPos[0]] === '' && thirdRobotDownMoves) {
            thirdRobotSequence += Array(thirdRobotDownMoves).fill('v').join('');
        }
        thirdRobotSequence += 'A';
        secondRobotPos = [...nextCharDiff];
        i++;
    }
    return thirdRobotSequence
}


const mapFinalSequence = (str: string): string => {
    let i = 0;
    let finalSequence = '';
    while(i < str.length) {
        let nextChar = str.split('')[i]
        let nextCharPosY = directionalPad.findIndex((n) => n.includes(nextChar));
        let nextCharPosX = directionalPad[nextCharPosY].findIndex((n) => n === nextChar);
        let nextCharDiff = [nextCharPosX, nextCharPosY];
        let thirdRobotDelta = [nextCharDiff[0]-thirdRobotPos[0], nextCharDiff[1]-thirdRobotPos[1]];
        let leftMoves = thirdRobotDelta[0] < 0 ? -thirdRobotDelta[0] : 0;
        let rightMoves = thirdRobotDelta[0] > 0 ? thirdRobotDelta[0] : 0;
        let upMoves = thirdRobotDelta[1] < 0 ? -thirdRobotDelta[1] : 0;
        let downMoves = thirdRobotDelta[1] > 0? thirdRobotDelta[1] : 0;
        let finalPart = '';
        if(downMoves) {
            finalSequence += Array(downMoves).fill('v').join('');
            if(directionalPad[nextCharPosY][thirdRobotPos[0]] === '') {
                finalPart = 'v';
                finalSequence = finalSequence.slice(0, finalSequence.length-1);
            }
        }
        if(leftMoves) {
            finalSequence += Array(leftMoves).fill('<').join('');
        }
        if(upMoves) {
            finalSequence += Array(upMoves).fill('^').join('');
            if(directionalPad[nextCharPosY][thirdRobotPos[0]] === '') {
                finalPart = '^';
                finalSequence = finalSequence.slice(0, finalSequence.length-1);
            }
        }
        if(rightMoves) {
            finalSequence += Array(rightMoves).fill('>').join('');
        }
        finalSequence += finalPart;
        finalSequence += 'A';
        thirdRobotPos = [...nextCharDiff];
        i++;
    }
    return finalSequence
}

const paths = input.map((sequence) => mapFinalSequence(mapSecondSequenceToThirdSequence(mapNumSequenceToSecondBotMoves(sequence))));

console.log(input.map((sequence) => mapNumSequenceToSecondBotMoves(sequence)))
console.log(input.map((sequence) => mapSecondSequenceToThirdSequence(mapNumSequenceToSecondBotMoves(sequence))))

const vals = input.map((code) => +code.slice(0, code.length-1));
const complexities = vals.map((val, i) => val * paths[i].length);

console.log(paths);
console.log(vals);
console.log(complexities.reduce((p, a) => p + a, 0))
