import { readFileSync } from 'fs';

const file = readFileSync('./input22', 'utf-8');

interface Brick {
    x0: number,
    y0: number,
    z0: number,
    x1: number,
    y1: number,
    z1: number
}

let bricksList: Brick[] = [];

bricksList = file
    .split(/\r?\n/).map((line) => {
        const coords = line.split('~').map((edge) => edge.split(','));
        return {
            x0: +coords[0][0],
            y0: +coords[0][1],
            z0: +coords[0][2],
            x1: +coords[1][0],
            y1: +coords[1][1],
            z1: +coords[1][2]
        }
    }).sort((a, b) => a.z1 - b.z1);

const intersectsX = (x01: number, x11: number, x02: number, x12: number) => {
    if((x02 >= x01 && x02 <= x11) || (x12 >= x01 && x12 <= x11) || (x02 <= x01 && x12 >= x11)) {
        return true;
    }
    return false;
}
const intersectsY = (y01: number, y11: number, y02: number, y12: number) => {
    if((y02 >= y01 && y02 <= y11) || (y12 >= y01 && y12 <= y11) || (y02 <= y01 && y12 >= y11)) {
        return true;
    }
    return false;
}
let ans = 0;
const letFall = (bricks: Brick[]): void => {
    for(let brick of bricks) {
        if(brick.z0 === 1){
            continue;
        }
        const bricksBelow = bricks.filter((b) => b.z1 === brick.z0 - 1).filter((b) => intersectsX(brick.x0, brick.x1, b.x0, b.x1) && intersectsY(brick.y0, brick.y1, b.y0, b.y1));
        if(bricksBelow.length){
            continue;
        } else {
            bricks[bricks.indexOf(brick)].z0--;
            bricks[bricks.indexOf(brick)].z1--;
            ans++;
        }
    }
}
let tempBricksList = JSON.stringify([...bricksList]);
letFall(bricksList);
while(tempBricksList !== JSON.stringify(bricksList)) {
    tempBricksList = JSON.stringify([...bricksList]);
    letFall(bricksList);
}
let answers = [];
for(let brick of bricksList){
    ans = 0;
    let testBricksList = JSON.parse(JSON.stringify([...bricksList]));
    testBricksList.splice(bricksList.indexOf(brick), 1);
    tempBricksList = JSON.stringify([...testBricksList]);

    letFall(testBricksList);
    answers.push(ans);
}

console.log(answers);
console.log(answers.reduce((p, a) => p + a));
