import { readFileSync } from 'fs';

const file = readFileSync('./input23.input', 'utf-8');
const input = file.split(/\r?\n/);

interface Computer {
    name: string;
    connections: Computer[];
}

let computers = new Map();

input.forEach((line) => {
    let [c1, c2] = line.split('-');
    let comp1: Computer;
    let comp2: Computer;
    if(computers.has(c1)) {
        comp1 = computers.get(c1);
    } else {
        comp1 = {name: c1, connections: []};
        computers.set(c1, comp1);
    }
    if(computers.has(c2)) {
        comp2 = computers.get(c2);
    } else {
        comp2 = {name: c2, connections: []};
        computers.set(c2, comp2);
    }
    computers.get(c1).connections.push(computers.get(c2));
    computers.get(c2).connections.push(computers.get(c1));
});
computers.forEach((c) => {
    c.connections = [...new Set(c.connections)];
})

let connectedTrios = new Map();

computers.forEach((startComputer) => {
    startComputer.connections.forEach((secondComputer) => {
        startComputer.connections.forEach((thirdComputer) => {
            if(secondComputer.name === thirdComputer.name) {
                return;
            }
            if(secondComputer.connections.some((c) => c.name === thirdComputer.name)) {
                const names = [startComputer.name, secondComputer.name, thirdComputer.name].sort();
                const key = names.join(',');
                if(connectedTrios.has(key)) {
                    return;
                }
                connectedTrios.set(key, key);
            }
        })
    })
})

let filteredTrios = [...connectedTrios.values()].map((trio) => trio.split(',')).filter((trio) => trio.some((compNames) => compNames.substring(0, 1) === 't'));

console.log(filteredTrios.length);
