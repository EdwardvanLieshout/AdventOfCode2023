import { readFileSync } from 'fs';

const file = readFileSync('./input08', 'utf-8');

const instructions = file
    .split(/\r?\n/)[0]
    .split('')
    .map((char) => (char === 'L' ? 1 : 2));

let lines = file.split(/\r?\n/).filter((line) => line.match(/.+=.+/));
let nodes = lines.map((node) => [node.substring(0, 3), node.substring(7, 10), node.substring(12, 15)]);

let currentNodes = nodes.filter((n) => n[0].charAt(2) === 'A').map((n) => n[0]);
let counts = Array(currentNodes.length).fill(0);

for (let i = 0; i < currentNodes.length; i++) {
    while (currentNodes[i].charAt(2) !== 'Z') {
        currentNodes[i] = nodes.find((n) => n[0] === currentNodes[i])[instructions[counts[i] % instructions.length]];
        counts[i]++;
    }
}
let nodeCounts = counts.map((c, i) => {
    return {
        code: currentNodes[i],
        amount: c,
        increment: c,
    };
});

while (!nodeCounts.reduce((p, a) => p && a.amount === nodeCounts[0].amount, true)) {
    nodeCounts.sort((a, b) => a.amount - b.amount);
    nodeCounts[0].amount += nodeCounts[0].increment;
}

console.log(nodeCounts);
console.log(nodeCounts[0].amount);
