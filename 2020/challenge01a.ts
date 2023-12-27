import { readFileSync } from 'fs';

const file = readFileSync('./input01.input', 'utf-8');
const input = file.split(/\r?\n/).map((num) => +num);
input.forEach((num1, i1) => {
    input.forEach((num2, i2) => {
        if (i1 === i2) {
            //skip
        } else {
            if (num1 + num2 === 2020) {
                console.log(num1, num2);
                console.log(num1 * num2);
            }
        }
    });
});
