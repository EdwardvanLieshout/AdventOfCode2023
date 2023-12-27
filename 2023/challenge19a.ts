import { readFileSync } from 'fs';

const file = readFileSync('./input19', 'utf-8');
let [strWorkflows, strParts] = file.split('\r\n\r\n').map((section) => section.split('\r\n'));

interface Part {
    x: number;
    m: number;
    a: number;
    s: number;
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

const parts: Part[] = strParts.map((strPart) => {
    strPart = strPart.substring(1, strPart.length - 1);
    const properties = strPart.split(',').map((prop) => prop.substring(2));
    return {
        x: +properties[0],
        m: +properties[1],
        a: +properties[2],
        s: +properties[3],
    };
});

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
            let shouldGoToDestination = step.operatorIsBiggerThan
                ? part[step.property] > step.value
                : part[step.property] < step.value;
            if (shouldGoToDestination) {
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
};

parts.forEach((part) => {
    performWorkflow(part, workflowDictionary.get('in'));
});

console.log(acceptedParts);
console.log(
    acceptedParts
        .map((p) => ([...Object.values(p)] as number[]).reduce((prev, a) => prev + a, 0))
        .reduce((p, a) => p + a)
);
