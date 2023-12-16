import { readFileSync } from 'fs';

const file = readFileSync('./input15', 'utf-8');

interface HashInput {
    operator: string;
    input: string;
    focalLength?: number;
    boxNumber?: number;
}

let steps: HashInput[] = file.split(',').map((str) => {
    let hashInput: HashInput = {
        operator: str.includes('=') ? '=' : '-',
        input: str.split(/(-|=)/)[0],
    };
    if (hashInput.operator === '=') {
        hashInput.focalLength = +str.split('=')[1];
    }
    return hashInput;
});

steps = steps.map((step) => {
    let val = 0;
    step.input.split('').forEach((char) => {
        val += char.charCodeAt(0);
        val *= 17;
        val %= 256;
    });
    return { ...step, boxNumber: val };
});

let boxes = Array.from({ length: 256 }, (e) => []);
steps.forEach((step) => {
    if (step.operator === '=') {
        if (boxes[step.boxNumber].filter((s) => s.input === step.input).length) {
            boxes[step.boxNumber][boxes[step.boxNumber].findIndex((s) => s.input === step.input)].focalLength =
                step.focalLength;
        } else {
            boxes[step.boxNumber].push(step);
        }
    } else {
        if (boxes[step.boxNumber].filter((s) => s.input === step.input).length) {
            boxes[step.boxNumber] = boxes[step.boxNumber].filter((s) => s.input !== step.input);
        }
    }
});

let focusingPowers = [];
boxes.forEach((box) => {
    box.forEach((step, i) => {
        let val = 0;
        val += step.boxNumber + 1;
        val *= i + 1;
        val *= step.focalLength;
        focusingPowers.push(val);
    });
});

console.log(focusingPowers);
console.log(focusingPowers.reduce((p, a) => p + a));
