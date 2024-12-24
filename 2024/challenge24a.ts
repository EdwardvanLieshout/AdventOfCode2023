import { readFileSync } from 'fs';

const file = readFileSync('./input24.input', 'utf-8');
const initialValues = file.split(/\r?\n\r?\n/)[0].split(/\r?\n/);
const gates = file.split(/\r?\n\r?\n/)[1].split(/\r?\n/);

const wires = new Map();

initialValues.forEach((val) => {
    const key = val.split(': ')[0];
    const amt = +val.split(': ')[1];
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
while(gate = gates.shift()) {
    const [operation, key] = gate.split(' -> ');
    const [param1, operator, param2] = operation.split(' ');
    if(!wires.has(param1) || !wires.has(param2)) {
        gates.push(gate);
        continue;
    }
    const val1 = wires.get(param1);
    const val2 = wires.get(param2);
    wires.set(key, getFn(operator)(val1, val2));
    if(key.startsWith('z')){
        keys.push(key.substring(1));
    }
}

keys = keys.sort((a, b) => +b - +a);

const finalValue = keys.reduce((p, a) => {
    return p + wires.get('z'+a);
}, '')

console.log(initialValues);
console.log(gates);
console.log(wires);
console.log(parseInt(finalValue, 2));
