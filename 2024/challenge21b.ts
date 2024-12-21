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
    let output = '';
    while(i < str.length) {
        let nextChar = str.split('')[i]
        let nextCharPosY = numpad.findIndex((n) => n.includes(nextChar));
        let nextCharPosX = numpad[nextCharPosY].findIndex((n) => n === nextChar);
        let nextCharPos = [nextCharPosX, nextCharPosY];
        let robotDelta = [nextCharPos[0]-firstRobotPos[0], nextCharPos[1]-firstRobotPos[1]];
        let deltaLeftAmount = robotDelta[0] < 0 ? -robotDelta[0] : 0;
        let deltaRightAmount = robotDelta[0] > 0 ? robotDelta[0] : 0;
        let deltaUpAmount = robotDelta[1] < 0 ? -robotDelta[1] : 0;
        let deltaDownAmount = robotDelta[1] > 0? robotDelta[1] : 0;
        if(numpad[firstRobotPos[1]][nextCharPosX] !== '' && deltaLeftAmount) {
            output += Array(deltaLeftAmount).fill('<').join('');
        }
        if(numpad[nextCharPosY][firstRobotPos[0]] !== '' && deltaDownAmount) {
            output += Array(deltaDownAmount).fill('v').join('');
        }
        if(deltaUpAmount) {
            output += Array(deltaUpAmount).fill('^').join('');
        }
        if(deltaRightAmount) {
            output += Array(deltaRightAmount).fill('>').join('');
        }
        if(deltaLeftAmount && numpad[firstRobotPos[1]][nextCharPosX] === '' ) {
            output += Array(deltaLeftAmount).fill('<').join('');
        }
        if(numpad[nextCharPosY][firstRobotPos[0]] === '' && deltaDownAmount) {
            output += Array(deltaDownAmount).fill('v').join('');
        }
        output += 'A';
        firstRobotPos = [...nextCharPos];
        i++;
    }
    return output;
}


const convertMovementToInstructionsForNextRobot = (str: string): string => {
    let i = 0;
    let output = '';
    let robotPos = [2, 0];
    while(i < str.length) {
        let nextChar = str.split('')[i]
        let nextCharPosY = directionalPad.findIndex((n) => n.includes(nextChar));
        let nextCharPosX = directionalPad[nextCharPosY].findIndex((n) => n === nextChar);
        let nextCharPos = [nextCharPosX, nextCharPosY];
        let robotDelta = [nextCharPos[0]-robotPos[0], nextCharPos[1]-robotPos[1]];
        let deltaLeftAmount = robotDelta[0] < 0 ? -robotDelta[0] : 0;
        let deltaRightAmount = robotDelta[0] > 0 ? robotDelta[0] : 0;
        let deltaUpAmount = robotDelta[1] < 0 ? -robotDelta[1] : 0;
        let deltaDownAmount = robotDelta[1] > 0? robotDelta[1] : 0;
        if(directionalPad[robotPos[1]][nextCharPosX] !== '' && deltaLeftAmount) {
            output += Array(deltaLeftAmount).fill('<').join('');
        }
        if(directionalPad[nextCharPosY][robotPos[0]] !== '' && deltaDownAmount) {
            output += Array(deltaDownAmount).fill('v').join('');
        }
        if(directionalPad[nextCharPosY][robotPos[0]] !== '' && deltaUpAmount) {
            output += Array(deltaUpAmount).fill('^').join('');
        }
        if(deltaRightAmount) {
            output += Array(deltaRightAmount).fill('>').join('');
        }
        if(deltaLeftAmount && directionalPad[robotPos[1]][nextCharPosX] === '' ) {
            output += Array(deltaLeftAmount).fill('<').join('');
        }
        if(directionalPad[nextCharPosY][robotPos[0]] === '' && deltaDownAmount) {
            output += Array(deltaDownAmount).fill('v').join('');
        }
        if(directionalPad[nextCharPosY][robotPos[0]] === '' && deltaUpAmount) {
            output += Array(deltaUpAmount).fill('^').join('');
        }
        output += 'A';
        robotPos = [...nextCharPos];
        i++;
    }
    return output
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

const pathLengths = paths.map((p) => addExtraRobotAndParseNewPath(p, 25));
const codeValues = input.map((code) => +code.slice(0, code.length-1));
const complexities = codeValues.map((val, i) => val * pathLengths[i]);

console.log(complexities.reduce((p, a) => p + a, 0))
