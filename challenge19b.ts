import { readFileSync } from 'fs';

const file = readFileSync('./input19', 'utf-8');
let [strWorkflows, strParts] = file.split('\r\n\r\n').map((section) => section.split('\r\n'));

interface Part {
    x0: number;
    m0: number;
    a0: number;
    s0: number;
    x1: number;
    m1: number;
    a1: number;
    s1: number;
}

interface Step {
    instantDestination?: string;
    property?: string;
    operatorIsBiggerThan?: boolean;
    value?: number;
    destination?: string;
}

interface Workflow {
    name: string;
    steps: Step[];
}

const workflows: Workflow[] = strWorkflows.map((strWorkFlow) => {
    const name = strWorkFlow.substring(0, strWorkFlow.indexOf('{'));
    let steps = strWorkFlow
        .substring(strWorkFlow.indexOf('{') + 1, strWorkFlow.length - 1)
        .split(',')
        .map((stepStr) => {
            if (!stepStr.match(/>|</)) {
                return { instantDestination: stepStr };
            }
            const operatorIsBiggerThan = stepStr.includes('>');
            const property = stepStr.charAt(0);
            const destination = stepStr.split(':')[1];
            const value = +stepStr.split(':')[0].substring(2);
            return {
                operatorIsBiggerThan,
                property,
                destination,
                value,
            };
        });
    return {
        name,
        steps: steps,
    };
});

const workflowDictionary = new Map<string, Workflow>();
workflows.forEach((workflow) => {
    workflowDictionary.set(workflow.name, workflow);
});

const acceptedParts = [];
const rejectedParts = [];

const performWorkflow = (part: Part, workflow: Workflow): void => {
    for (let step of workflow.steps) {
        if (step.instantDestination) {
            if (step.instantDestination === 'A') {
                acceptedParts.push(part);
                break;
            }
            if (step.instantDestination === 'R') {
                rejectedParts.push(part);
                break;
            }
            performWorkflow(part, workflowDictionary.get(step.instantDestination));
            break;
        } else {
            if (step.operatorIsBiggerThan) {
                if (part[step.property + '0'] <= step.value && part[step.property + '1'] > step.value) {
                    let succesPart = { ...part };
                    let failPart = { ...part };
                    succesPart[step.property + '0'] = step.value + 1;
                    failPart[step.property + '1'] = step.value;
                    part = failPart;
                    if (step.destination === 'A') {
                        acceptedParts.push(succesPart);
                    } else {
                        if (step.destination === 'R') {
                            rejectedParts.push(succesPart);
                        } else {
                            performWorkflow(succesPart, workflowDictionary.get(step.destination));
                        }
                    }
                } else {
                    if (part[step.property + '0'] > step.value) {
                        if (step.destination === 'A') {
                            acceptedParts.push(part);
                            break;
                        }
                        if (step.destination === 'R') {
                            rejectedParts.push(part);
                            break;
                        }
                        performWorkflow(part, workflowDictionary.get(step.destination));
                        break;
                    }
                }
            } else {
                if (part[step.property + '0'] < step.value && part[step.property + '1'] >= step.value) {
                    let succesPart = { ...part };
                    let failPart = { ...part };
                    succesPart[step.property + '1'] = step.value - 1;
                    failPart[step.property + '0'] = step.value;
                    part = failPart;
                    if (step.destination === 'A') {
                        acceptedParts.push(succesPart);
                    } else {
                        if (step.destination === 'R') {
                            rejectedParts.push(succesPart);
                        } else {
                            performWorkflow(succesPart, workflowDictionary.get(step.destination));
                        }
                    }
                } else {
                    if (part[step.property + '0'] < step.value) {
                        if (step.destination === 'A') {
                            acceptedParts.push(part);
                            break;
                        }
                        if (step.destination === 'R') {
                            rejectedParts.push(part);
                            break;
                        }
                        performWorkflow(part, workflowDictionary.get(step.destination));
                        break;
                    }
                }
            }
        }
    }
};

performWorkflow({ x0: 1, x1: 4000, m0: 1, m1: 4000, a0: 1, a1: 4000, s0: 1, s1: 4000 }, workflowDictionary.get('in'));

const compliantValues = acceptedParts.map((part) => {
    const x = part.x1 - part.x0 + 1;
    const m = part.m1 - part.m0 + 1;
    const a = part.a1 - part.a0 + 1;
    const s = part.s1 - part.s0 + 1;
    return x * m * a * s;
});

console.log(acceptedParts);
console.log(compliantValues.reduce((p, a) => p + a));
