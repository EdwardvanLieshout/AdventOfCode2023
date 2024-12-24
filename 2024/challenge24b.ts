import { readFileSync } from 'fs';

const file = readFileSync('./input24.input', 'utf-8');
const initialValues = file.split(/\r?\n\r?\n/)[0].split(/\r?\n/);
const gates = file.split(/\r?\n\r?\n/)[1].split(/\r?\n/);

const originalWires = new Map();

const xVals = [];
const yVals = [];

const wires = new Map(originalWires);

initialValues.forEach((val) => {
    const key = val.split(': ')[0];
    const amt = +val.split(': ')[1];
    if(key.startsWith('x')) xVals.push(amt);
    if(key.startsWith('y')) yVals.push(amt);
    wires.set(key, amt);
});


const andFn = (p1: number, p2: number): number => {
    return p1 & p2;
}

const orFn = (p1: number, p2: number): number => {
    return p1 | p2;
}

const xorFn = (p1: number, p2: number): number => {
    return p1 ^ p2;
}

const getFn = (key: string) => {
    if(key === 'AND'){
        return andFn;
    }
    if(key === 'OR'){
        return orFn;
    }
    if(key === 'XOR'){
        return xorFn;
    }
}

let keys = [];

let gate;

let badWires = [];

let gatesToParse = [...gates];
while(gate = gatesToParse.shift()) {
    const [operation, key] = gate.split(' -> ');
    const [param1, operator, param2] = operation.split(' ');
    if(!wires.has(param1) || !wires.has(param2)) {
        gatesToParse.push(gate);
        continue;
    }
    const val1 = wires.get(param1);
    const val2 = wires.get(param2);
    wires.set(key, getFn(operator)(val1, val2));
    if(key.startsWith('z')){
        keys.push(key.substring(1));
    }

    if(key.startsWith('z') && operator !== 'XOR' && +key.substring(1) !== 45) {
        badWires.push(key);
    }
    if(!key.startsWith('z') && !param1.startsWith('x') && !param1.startsWith('y') && !param2.startsWith('x') && !param2.startsWith('y') && operator === 'XOR') {
        badWires.push(key);
    }
    if((param1.startsWith('x') || param1.startsWith('y')) && +param1.substring(1) !== 0 && (param2.startsWith('x') || param2.startsWith('y')) && +param2.substring(1) !== 0 && operator === 'AND' && !gates.some((g) => g.split(' ')[1] === 'OR' && g.split(' -> ')[0].includes(key))) {
        badWires.push(key);
    }
    if((param1.startsWith('x') || param1.startsWith('y')) && +param1.substring(1) !== 0 && (param2.startsWith('x') || param2.startsWith('y')) && +param2.substring(1) !== 0 && operator === 'XOR' && !gates.some((g) => g.includes('XOR') && g.split(' -> ')[0].includes(key))) {
        badWires.push(key);
    }
}

keys = keys.sort((a, b) => +b - +a);
const finalValue = keys.reduce((p, a) => {
    return p + wires.get('z'+a);
}, '');
const addition = parseInt(xVals.join(''), 2) + parseInt(yVals.join(''), 2);

console.log(finalValue)
console.log(addition.toString(2))
badWires = [...new Set(badWires)].sort();
console.log(badWires.join(','));
