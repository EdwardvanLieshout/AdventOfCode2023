import { readFileSync } from 'fs';

const file = readFileSync('./input08', 'utf-8');

const instructions = file
    .split(/\r?\n/)[0]
    .split('')
    .map((char) => (char === 'L' ? 1 : 2));

let lines = file.split(/\r?\n/).filter((line) => line.match(/.+=.+/));
let nodes = lines.map((node) => [node.substring(0, 3), node.substring(7, 10), node.substring(12, 15)]);

let count = 0;
let currentNode = 'AAA';

while (currentNode !== 'ZZZ') {
    currentNode = nodes.find((n) => n[0] === currentNode)[instructions[count % instructions.length]];
    count++;
}

console.log(currentNode);
console.log(count);
