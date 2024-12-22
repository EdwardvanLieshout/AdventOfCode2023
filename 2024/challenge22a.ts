import { readFileSync } from 'fs';

const file = readFileSync('./input22.input', 'utf-8');
let input = file.split(/\r?\n/).map((nr) => +nr);

const mix = (value: number, secretNr: number): number => {
    return value ^ secretNr;
}

const prune = (secretNr: number): number => {
    return secretNr & 16777215;
}

const evolve = (secretNr: number): number => {
    let result = secretNr*64;
    secretNr = mix(result, secretNr);
    secretNr = prune(secretNr);
    result = Math.floor(secretNr / 32);
    secretNr = mix(result, secretNr);
    secretNr = prune(secretNr);
    result = secretNr * 2048;
    secretNr = mix(result, secretNr);
    secretNr = prune(secretNr);
    return secretNr;
}

for(let i = 0; i < 2000; i++) {
    input = input.map(nr => evolve(nr))
}
console.log(input);

console.log(input.reduce((p, a) => p + a, 0))
