import { readFileSync } from 'fs';

const file = readFileSync('./input12', 'utf-8');
const arr = file.split(/\r?\n/).map((line) => line.split(' '));

interface ConditionRecord {
    springText: string;
    sizeList: number[];
    possibleUnknownSpaceSolutions: string[];
}

let conditionRecords: ConditionRecord[] = arr.map((data) => {
    return { springText: data[0], sizeList: data[1].split(',').map((num) => +num), possibleUnknownSpaceSolutions: [] };
});

const iterateThroughEmptySpaces = (possibleUnknownSpaceSolutions: string[], springText: string): string[] => {
    if (springText.includes('?')) {
        const option1 = springText.replace('?', '.');
        const option2 = springText.replace('?', '#');
        return [
            ...iterateThroughEmptySpaces(possibleUnknownSpaceSolutions, option1),
            ...iterateThroughEmptySpaces(possibleUnknownSpaceSolutions, option2),
        ];
    }
    return [...possibleUnknownSpaceSolutions, springText];
};

conditionRecords = conditionRecords.map((record) => {
    record.possibleUnknownSpaceSolutions = iterateThroughEmptySpaces([], record.springText);
    return record;
});

conditionRecords = conditionRecords.map((record) => {
    record.possibleUnknownSpaceSolutions = record.possibleUnknownSpaceSolutions.filter((solutionString) => {
        const solutionSizeList = solutionString
            .split('.')
            .filter((entry) => entry.length !== 0)
            .map((spring) => spring.length);
        return solutionSizeList.toString() == record.sizeList.toString();
    });
    return record;
});

const amountsOfSolutions = conditionRecords.map((record) => record.possibleUnknownSpaceSolutions.length);

console.log(amountsOfSolutions.reduce((p, a) => p + a, 0));
