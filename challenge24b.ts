import { readFileSync } from 'fs';

const file = readFileSync('./input24', 'utf-8');

interface Line {
    x: number;
    y: number;
    z: number;
    xStep: number;
    yStep: number;
    zStep: number;
}

const arr = file.split(/\r?\n/).map((line) => line.split(' @ ').map((vals) => vals.split(', ').map((num) => +num)));

const lines: Line[] = arr.map((line) => {
    const x = line[0][0];
    const y = line[0][1];
    const z = line[0][2];
    const xStep = line[1][0];
    const yStep = line[1][1];
    const zStep = line[1][2];
    return { x, y, z, xStep, yStep, zStep };
});

async function main(): Promise<void> {
    const { init } = require('z3-solver');
    const { Context } = await init();
    const { Solver, Real } = new Context('main');

    const f = (s) => {
        return Real.const(s);
    };

    const x = f('x');
    const y = f('y');
    const z = f('z');
    const xStep = f('xStep');
    const yStep = f('yStep');
    const zStep = f('zStep');
    const tValues = [];
    for (let i = 0; i < lines.length; i++) {
        tValues.push(f('T' + i));
    }
    const solver = new Solver();
    for (let i = 0; i < lines.length; i++) {
        solver.add(x.add(tValues[i].mul(xStep)).sub(lines[i].x).sub(tValues[i].mul(lines[i].xStep)).eq(0));
        solver.add(y.add(tValues[i].mul(yStep)).sub(lines[i].y).sub(tValues[i].mul(lines[i].yStep)).eq(0));
        solver.add(z.add(tValues[i].mul(zStep)).sub(lines[i].z).sub(tValues[i].mul(lines[i].zStep)).eq(0));
    }
    console.log(await solver.check());
    const model = await solver.model();
    console.log(model.get(x).value().numerator + model.get(y).value().numerator + model.get(z).value().numerator);
}
main();
