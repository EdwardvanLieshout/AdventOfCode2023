import { readFileSync } from 'fs';

const file = readFileSync('./input02.input', 'utf-8');
const input = file.split(/\r?\n/);
let results = input.map((str) => str.split(' '));
let correctResults = [];
results.forEach((arr, i) => {
    let firstNum = +arr[0];
    let currentNum = +arr[0];
    let increasing = +arr[0] < +arr[1];
    arr.shift();
    let correct = true;
    for (let num of arr) {
        if (+num === currentNum) {
            correct = false;
            break;
        }
        if (currentNum < +num !== increasing) {
            correct = false;
            break;
        }
        if (Math.abs(+num - currentNum) > 3) {
            correct = false;
            break;
        }
        currentNum = +num;
    }
    arr.unshift(`${firstNum}`);
    if (!correct) {
        for (let l = 0; l < arr.length; l++) {
            let newArr = [...arr];
            newArr.splice(l, 1);
            let currentNum = +newArr[0];
            let increasing = +newArr[0] < +newArr[1];
            newArr.shift();
            correct = true;
            for (let num of newArr) {
                if (+num === currentNum) {
                    correct = false;
                    break;
                }
                if (currentNum < +num !== increasing) {
                    correct = false;
                    break;
                }
                if (Math.abs(+num - currentNum) > 3) {
                    correct = false;
                    break;
                }
                currentNum = +num;
            }
            if (correct) {
                console.log(newArr);
                break;
            }
        }
    }
    correctResults[i] = correct;
});
console.log(correctResults.filter((res) => res === true).length);
