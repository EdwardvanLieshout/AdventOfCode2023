import { readFileSync } from 'fs';

const file = readFileSync('./input11.input', 'utf-8');
let input = file.split(' ');

const blink = (): void => {
    const newArr = [];
    input.forEach((num) => {
        if (num === '0') {
            newArr.push('1');
        } else {
            if (num.length % 2 === 0) {
                const num1 = +num.substring(0, num.length / 2) + '';
                const num2 = +num.substring(num.length / 2, num.length) + '';
                newArr.push(num1, num2);
            } else {
                newArr.push(+num * 2024 + '');
            }
        }
    });
    input = [...newArr];
};
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();
blink();

console.log(input.length);
