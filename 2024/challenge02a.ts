import { readFileSync } from 'fs';

const file = readFileSync('./input02.input', 'utf-8');
const input = file.split(/\r?\n/);
let results = input.map((str) => str.split(' '));
let correctResults = [];
results.forEach((arr, i) => {
    let currentNum = +arr[0];
    let increasing = +arr[0] < +arr[1];
    arr.shift();
    for (let num of arr) {
        if (+num === currentNum) {
            correctResults[i] = false;
            break;
        }
        if (currentNum < +num !== increasing) {
            correctResults[i] = false;
            break;
        }
        if (Math.abs(+num - currentNum) > 3) {
            correctResults[i] = false;
            break;
        }
        currentNum = +num;
    }
    if (correctResults[i] !== false) {
        correctResults[i] = true;
    }
});
console.log(correctResults.filter((res) => res === true).length);
