import { readFileSync } from 'fs';

const file = readFileSync('./input02.input', 'utf-8');
const input = file.split(/\r?\n/);

interface Policy {
    min: number;
    max: number;
    letter: string;
    password: string;
    isCompliant: boolean;
}

const policies: Policy[] = input.map((str) => {
    const min = +str.split('-')[0];
    const max = +str.split('-')[1].split(' ')[0];
    const letter = str.split(' ')[1].substring(0, 1);
    const password = str.split(': ')[1];
    const isCompliant =
        password.split('').filter((char) => char === letter).length > min &&
        password.split('').filter((char) => char === letter).length < max;
    return { min, max, letter, password, isCompliant };
});

console.log(policies);
console.log(policies.filter((policy) => policy.isCompliant).length);
