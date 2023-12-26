import { readFileSync } from 'fs';

const file = readFileSync('./input25', 'utf-8');
const arr = file.split(/\r?\n/);

interface Component {
    name: string;
    connections: string[];
}

const components: Component[] = arr.map((str) => {
    const name = str.split(':')[0];
    const connections = str.split(': ')[1].split(' ');
    return { name, connections };
});
const componentDictionary: Map<string, Component> = new Map();
components.forEach((component) => {
    if (!componentDictionary.has(component.name)) {
        componentDictionary.set(component.name, component);
    } else {
        componentDictionary.get(component.name).connections.push(...component.connections);
    }
    component.connections.forEach((connection) => {
        if (!componentDictionary.has(connection)) {
            componentDictionary.set(connection, { name: connection, connections: [component.name] });
        } else {
            componentDictionary.get(connection).connections.push(component.name);
        }
    });
});

let callStack = [];
let finalConnections = [];
let visited = [];

const findShortestPathsFrom = (c1: string, specificHistory: string[]) => {
    if (visited.includes(c1)) {
        return;
    }
    visited.push(c1);
    specificHistory.push(c1);
    const component1 = componentDictionary.get(c1);
    if (specificHistory.length > 1) {
        finalConnections.push(
            [specificHistory[specificHistory.length - 2], [specificHistory[specificHistory.length - 1]]]
                .sort()
                .join(',')
        );
    }
    component1.connections.forEach((connection) => {
        callStack.push({ connection, specificHistory: [...specificHistory] });
    });
};

for (let component1 of [...componentDictionary.values()]) {
    callStack = [];
    visited = [];
    callStack.push({ connection: component1.name, specificHistory: [] });
    while (callStack.length) {
        const call = callStack.shift();
        findShortestPathsFrom(call.connection, call.specificHistory);
    }
}

console.log('All connections found, searching for the three connections with the most traffic...');

interface Connection {
    combination: string;
    score: number;
}

let connections: Connection[] = [];

for (let combination of finalConnections.filter((value, index, array) => array.indexOf(value) === index)) {
    connections.push({ combination, score: finalConnections.filter((c) => c === combination).length });
}

connections = connections.sort((a, b) => b.score - a.score);
console.log(connections);

const cutConnection = (connection: string) => {
    const [componentName1, componentName2] = connection.split(',');
    componentDictionary.get(componentName1).connections = componentDictionary
        .get(componentName1)
        .connections.filter((c) => c !== componentName2);
    componentDictionary.get(componentName2).connections = componentDictionary
        .get(componentName2)
        .connections.filter((c) => c !== componentName1);
};

cutConnection(connections.shift().combination);
cutConnection(connections.shift().combination);
cutConnection(connections.shift().combination);

const findAllConnectedComponents = (c1: string) => {
    if (visited.includes(c1)) {
        return;
    }
    visited.push(c1);
    const component1 = componentDictionary.get(c1);
    component1.connections.forEach((connection) => {
        callStack.push({ connection });
    });
};

callStack = [];
visited = [];
callStack.push({ connection: components[0].name });
while (callStack.length) {
    const call = callStack.shift();
    findAllConnectedComponents(call.connection);
}
console.log(visited.length, componentDictionary.size - visited.length);
console.log(visited.length * (componentDictionary.size - visited.length));
