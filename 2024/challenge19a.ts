import { readFileSync } from 'fs';

const file = readFileSync('./input19.input', 'utf-8');
const input = file.split(/\r?\n/);
let possibleTowels = input[0].split(', ');
let desiredTowels = input.filter((row, i) => i >= 2);

let solveTowel = (current: string, goal: string): boolean => {
    if(current === goal) {
        return true;
    }
    let possibleSolution = false;
    for(let possibleTowel of possibleTowels) {
        let attempt = current + possibleTowel;
        if(attempt.length > goal.length) {
            continue;
        }
        if(attempt === goal.substring(0, attempt.length)) {
            if(solveTowel(attempt, goal)) {
                return true;
            } else {
                continue;
            }
        }
    }
    return false;
}

const solvedTowels = desiredTowels.map((towel) => solveTowel('', towel));

console.log(solvedTowels.filter((bool) => bool === true).length);
