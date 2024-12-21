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

const solveNumLock = (str: string): string => {
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
        if(secondRobotRightMoves) {
            secondRobotSequence += Array(secondRobotRightMoves).fill('>').join('');
        }
        if(secondRobotLeftMoves && numpad[firstRobotPos[1]][nextCharPosX] === '' ) {
            secondRobotSequence += Array(secondRobotLeftMoves).fill('<').join('');
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


const convertMovementToInstructionsForNextRobot = (str: string): string => {
    let i = 0;
    let thirdRobotSequence = '';
    let secondRobotPos = [2, 0];
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
        if(directionalPad[nextCharPosY][secondRobotPos[0]] !== '' && thirdRobotUpMoves) {
            thirdRobotSequence += Array(thirdRobotUpMoves).fill('^').join('');
        }
        if(thirdRobotRightMoves) {
            thirdRobotSequence += Array(thirdRobotRightMoves).fill('>').join('');
        }
        if(thirdRobotLeftMoves && directionalPad[secondRobotPos[1]][nextCharPosX] === '' ) {
            thirdRobotSequence += Array(thirdRobotLeftMoves).fill('<').join('');
        }
        if(directionalPad[nextCharPosY][secondRobotPos[0]] === '' && thirdRobotDownMoves) {
            thirdRobotSequence += Array(thirdRobotDownMoves).fill('v').join('');
        }
        if(directionalPad[nextCharPosY][secondRobotPos[0]] === '' && thirdRobotUpMoves) {
            thirdRobotSequence += Array(thirdRobotUpMoves).fill('^').join('');
        }
        thirdRobotSequence += 'A';
        secondRobotPos = [...nextCharDiff];
        i++;
    }
    return thirdRobotSequence
}
let paths = input.map((sequence) => solveNumLock(sequence));
let robotCache = new Map();

const addExtraRobotAndParseNewPath = (pathToParse: string, count: number): number => {
    if (count === 0) {
        return pathToParse.length;
    };
    if (robotCache.has(`${pathToParse},${count}`)) {
        return robotCache.get(`${pathToParse},${count}`);
    }
    let splitPaths = pathToParse.split('A').map((part) => part + 'A');
    splitPaths = splitPaths.slice(0, splitPaths.length-1);
    splitPaths = splitPaths.map((str) => convertMovementToInstructionsForNextRobot(str));
    let amount = splitPaths.map(p => addExtraRobotAndParseNewPath(p, count - 1)).reduce((b, a) => b + a, 0);
    robotCache.set(`${pathToParse},${count}`, amount);
    return amount;
}

let pathLengths = paths.map((p) => addExtraRobotAndParseNewPath(p, 25));

const codeValues = input.map((code) => +code.slice(0, code.length-1));
const complexities = codeValues.map((val, i) => val * pathLengths[i]);

console.log(complexities.reduce((p, a) => p + a, 0))
