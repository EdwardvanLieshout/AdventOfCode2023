import { readFileSync } from 'fs';

const file = readFileSync('./input12', 'utf-8');
const arr = file.split(/\r?\n/).map((line) => line.split(' '));

interface ConditionRecord {
    springText: string;
    sizeList: number[];
}

let conditionRecords: ConditionRecord[] = arr.map((data) => {
    return { springText: data[0], sizeList: data[1].split(',').map((num) => +num) };
});

let previousAnswers = new Map();

function iterateThroughSprings(
    springs: string[],
    sizeList: number[],
    currentSpringLength: number,
    springIndex: number,
    sizeIndex: number
): number {
    const key = `${springIndex},${sizeIndex},${currentSpringLength}`;
    if (previousAnswers.has(key)) {
        return previousAnswers.get(key);
    }
    if (springIndex === springs.length) {
        if (
            (sizeIndex === sizeList.length && currentSpringLength === 0) ||
            (sizeIndex === sizeList.length - 1 && sizeList[sizeIndex] === currentSpringLength)
        ) {
            previousAnswers.set(key, 1);
            return 1;
        }
        previousAnswers.set(key, 0);
        return 0;
    }
    let answer = 0;
    for (const char of ['#', '.']) {
        if (springs[springIndex] === char || springs[springIndex] === '?') {
            answer +=
                char === '.' && currentSpringLength === 0
                    ? iterateThroughSprings(springs, sizeList, 0, springIndex + 1, sizeIndex)
                    : 0;
            answer +=
                char === '.' &&
                currentSpringLength > 0 &&
                sizeIndex < sizeList.length &&
                sizeList[sizeIndex] === currentSpringLength
                    ? iterateThroughSprings(springs, sizeList, 0, springIndex + 1, sizeIndex + 1)
                    : 0;
            answer +=
                char === '#'
                    ? iterateThroughSprings(springs, sizeList, currentSpringLength + 1, springIndex + 1, sizeIndex)
                    : 0;
        }
    }
    previousAnswers.set(key, answer);
    return answer;
}

let i = 0;
let r = 0;

const millisecondsStart = new Date().getTime();

for (let record of conditionRecords) {
    previousAnswers = new Map();
    const result = iterateThroughSprings(
        `${record.springText}?${record.springText}?${record.springText}?${record.springText}?${record.springText}`.split(
            ''
        ),
        [...record.sizeList, ...record.sizeList, ...record.sizeList, ...record.sizeList, ...record.sizeList],
        0,
        0,
        0
    );
    i++;
    r += result;
}

const millisecondsEnd = new Date().getTime();

console.log(r);
console.log('Duration:', (millisecondsEnd - millisecondsStart) / 1000);
