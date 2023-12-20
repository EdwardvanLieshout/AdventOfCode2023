import { readFileSync } from 'fs';

const file = readFileSync('./input20', 'utf-8');
const arr = file.split(/\r?\n/);

const FLIPFLOP = '%';
const CONJUNCTION = '&';
const BROADCASTER = 'b';

interface Module {
    type: string;
    name: string;
    outputs: string[];
    isTurnedOn: boolean;
    inputMemory?: Map<string, number>;
}

const modules: Module[] = arr.map((str) => {
    const type = str.charAt(0);
    const name = str.split(' -> ')[0].substring(1);
    const outputs = JSON.parse(`["${str.split(' -> ')[1].replaceAll(', ', `", "`)}"]`);
    const isTurnedOn = false;
    const inputMemory = type === CONJUNCTION ? new Map() : undefined;
    return { type, name, outputs, isTurnedOn, inputMemory };
});

modules
    .filter((module) => module.type === CONJUNCTION)
    .forEach((conjunctionModule, i) => {
        modules.forEach((module) => {
            if (module.outputs.includes(conjunctionModule.name)) {
                modules[modules.indexOf(conjunctionModule)].inputMemory.set(module.name, 0);
            }
        });
    });

const moduleDictionary: Map<string, Module> = new Map();
modules.forEach((module) => {
    moduleDictionary.set(module.name, module);
});

interface Signal {
    sender: string;
    amount: number;
    receivers: string[];
}

let signalStack: Signal[] = [];
let lowPulseAmount = 0;
let highPulseAmount = 0;
let amountOfButtonPresses = 0;
let prevButtonPresses = new Map();
let prevButtonPressesDelta = new Map();

const sendSignals = (signal: Signal): void => {
    for (let receiver of signal.receivers) {
        if (signal.amount) {
            highPulseAmount++;
        } else {
            lowPulseAmount++;
        }
        if (moduleDictionary.has(receiver)) {
            const module = moduleDictionary.get(receiver);
            if (module.type === FLIPFLOP) {
                if (signal.amount === 1) {
                    continue;
                } else {
                    module.isTurnedOn = !module.isTurnedOn;
                    signalStack.push({
                        sender: module.name,
                        receivers: module.outputs,
                        amount: module.isTurnedOn ? 1 : 0,
                    });
                    moduleDictionary.set(module.name, module);
                }
            }
            if (module.type === CONJUNCTION) {
                module.inputMemory.set(signal.sender, signal.amount);
                if (module.outputs.includes('rx') && signal.amount === 1) {
                    if (prevButtonPresses.has(signal.sender)) {
                        prevButtonPressesDelta.set(
                            signal.sender,
                            amountOfButtonPresses - prevButtonPresses.get(signal.sender)
                        );
                    }
                    prevButtonPresses.set(signal.sender, amountOfButtonPresses);
                }
                signalStack.push({
                    sender: module.name,
                    receivers: module.outputs,
                    amount: [...module.inputMemory.values()].filter((val) => val === 0).length ? 1 : 0,
                });
                moduleDictionary.set(module.name, module);
            }
            if (module.type === BROADCASTER) {
                signalStack.push({
                    sender: module.name,
                    receivers: module.outputs,
                    amount: 0,
                });
            }
        }
    }
};
let keepLooping = true;
while (keepLooping) {
    amountOfButtonPresses++;
    signalStack.push({
        sender: 'button',
        amount: 0,
        receivers: ['roadcaster'],
    });
    while (signalStack.length > 0) {
        let signal = signalStack.shift();
        if (prevButtonPressesDelta.size === 4) {
            keepLooping = false;
        }
        sendSignals(signal);
    }
}

console.log(prevButtonPresses);
console.log(prevButtonPressesDelta);

const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);

console.log([...prevButtonPressesDelta.values()].reduce(lcm));
