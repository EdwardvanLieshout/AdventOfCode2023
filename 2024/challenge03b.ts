import { readFileSync } from 'fs';

const file = readFileSync('./input03.input', 'utf-8');
const input = file;
let matches = [...input.matchAll(/mul\(\d+\,\d+\)/g)];
let dos = [...input.matchAll(/do(?!n't)/g)];
let donts = [...input.matchAll(/don't/g)];

let validMatches = matches
    .filter((match) => {
        const prevDos = dos.filter((doMatch) => doMatch.index < match.index);
        const latestDo = prevDos[prevDos.length - 1];
        const prevDonts = donts.filter((doMatch) => doMatch.index < match.index);
        const latestDont = prevDonts[prevDonts.length - 1];
        if (latestDont === undefined) {
            return true;
        }
        if (latestDo === undefined && latestDont !== undefined) {
            return false;
        }
        return latestDo.index > latestDont.index;
    })
    .map((match) => match[0]);

let amtPairs = validMatches.map((match) => match.substring(4).slice(0, -1).split(','));
let amts = amtPairs.map((amt) => +amt[0] * +amt[1]);
console.log(amts.reduce((p, a) => p + a, 0));
