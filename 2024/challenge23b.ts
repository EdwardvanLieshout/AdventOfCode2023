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

let connectedGroups = new Map();
let triedGroups = new Map();

const checkIfConnection = (connections: Computer[]): boolean => {
    let areConnections = true;
    connections.forEach((computer) => {
        if(!(computer.connections.filter((c) => connections.some((conn) => conn.name === c.name)).length === connections.length - 1)) {
            areConnections = false;
            return;
        }
    });
    return areConnections;
}

computers.forEach((startComputer) => {
    let connections = [startComputer];
    for(let i = 0; i < 2; i++) {
        for(let j = i+1; j < 3; j++) {
            for(let k = j+1; k < 4; k++) {
                for(let l = k+1; l < 5; l++) {
                    for(let m = l+1; m < 6; m++) {
                        for(let n = m+1; n < 7; n++) {
                            for(let o = n+1; o < 8; o++) {
                                for(let p = o+1; p < 9; p++) {
                                    for(let q = p+1; q < 10; q++) {
                                        for(let r = q+1; r < 11; r++) {
                                            for(let s = r+1; s < 12; s++) {
                                                for(let t = s+1; t < 13; t++) {
                                                    connections.push(startComputer.connections[i], startComputer.connections[j], startComputer.connections[k], startComputer.connections[l], startComputer.connections[m], startComputer.connections[n], startComputer.connections[o], startComputer.connections[p], startComputer.connections[q], startComputer.connections[r], startComputer.connections[s], startComputer.connections[t]);
                                                    const names = connections.map((c) => c.name).sort();
                                                    const key = names.join(',');
                                                    if(triedGroups.has(key)) {
                                                        connections = [startComputer];
                                                        continue;
                                                    }
                                                    triedGroups.set(key, key);
                                                    if(checkIfConnection(connections)) {
                                                        if(connectedGroups.has(key)) {
                                                            connections = [startComputer];
                                                            continue;
                                                        }
                                                        connectedGroups.set(key, key);
                                                        console.log(connectedGroups.size);
                                                    }
                                                        
                                                    connections = [startComputer];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})

let filteredTrios = [...connectedGroups.values()].sort((a, b) => b.length - a.length);

console.log(filteredTrios);
