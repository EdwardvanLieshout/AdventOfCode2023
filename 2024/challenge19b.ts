import { readFileSync } from 'fs';

const file = readFileSync('./input19.input', 'utf-8');
const input = file.split(/\r?\n/);
let possibleTowels = input[0].split(', ');
let desiredTowels = input.filter((row, i) => i >= 2);

let solveTowel = (start: string, goal: string): number => {
    let amount = 0;
    let stack = [{val: start, amt: 1}];
    let currentVal;
    while(currentVal = stack.shift()){
        let current = currentVal.val;
        if(current === goal) {
            amount+=currentVal.amt;
            continue;
        }
        for(let possibleTowel of possibleTowels) {
            let attempt = current + possibleTowel;
            if(attempt.length > goal.length) {
                continue;
            }
            if(attempt === goal.substring(0, attempt.length)) {
                stack.push({val: attempt, amt: currentVal.amt});
            }
        }
        let newStack = [];
        
        stack.forEach((action) => {
            if (!newStack.filter((nsa) => nsa.val === action.val).length) {
                newStack.push({val: action.val, amt: stack.filter((sa) => sa.val === action.val).reduce((p, a) => p + a.amt, 0)})
            }
        });
        stack = newStack;
    }
    
    return amount;
}

const solvedTowels = desiredTowels.map((towel) => solveTowel('', towel));

console.log(solvedTowels.reduce((p, a) => p + a, 0));
