import { readFileSync } from 'fs';

const file = readFileSync('./input01.input', 'utf-8');
const input = file.split(/\r?\n/).map((num) => +num);
input.forEach((num1, i1) => {
    input.forEach((num2, i2) => {
        input.forEach((num3, i3) => {
            if (i1 === i2 || i2 === i3) {
                //skip
            } else {
                if (num1 + num2 + num3 === 2020) {
                    console.log(num1, num2, num3);
                    console.log(num1 * num2 * num3);
                }
            }
        });
    });
});
