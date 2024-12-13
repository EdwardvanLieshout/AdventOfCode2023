import { readFileSync } from 'fs';

const file = readFileSync('./input13.input', 'utf-8');
const input = file.split(/\r?\n/);

let aButtons = input.filter((row) => row.substring(0, 8) === 'Button A').map((row) => {
    const x = [...row.matchAll(/\d+/g)][0][0];
    const y = [...row.matchAll(/\d+/g)][1][0];
    return {x: +x, y: +y, price: 3};
});
let bButtons = input.filter((row) => row.substring(0, 8) === 'Button B').map((row) => {
    const x = [...row.matchAll(/\d+/g)][0][0];
    const y = [...row.matchAll(/\d+/g)][1][0];
    return {x: +x, y: +y, price: 1};
});
let prizes = input.filter((row) => row.substring(0, 5) === 'Prize').map((row) => {
    const x = [...row.matchAll(/\d+/g)][0][0];
    const y = [...row.matchAll(/\d+/g)][1][0];
    return {x: +(10000000000000+ +x), y: +(10000000000000 + +y)};
});

const tryForPrize = (prizeX: number, prizeY: number, aX: number, aY: number, aPrice: number, bX: number, bY: number, bPrice: number): number =>{
    let b = (prizeY/aY - prizeX/aX) / (-bX/aX + bY/aY);
    let cost = +b.toFixed() * bPrice;
    let a = (prizeX - b*bX)/aX;
    cost += +a.toFixed() * aPrice;
    if ((b % 1 === 0 || b % 1 < 0.001 || b % 1 > 0.99) && (a % 1 === 0 || a % 1 < 0.001 || a % 1 > 0.99)) {
        return cost;
    } 
    return 0;
}

let costs = prizes.map((p, i) => tryForPrize(p.x, p.y, aButtons[i].x, aButtons[i].y, aButtons[i].price, bButtons[i].x, bButtons[i].y, bButtons[i].price));

console.log(costs.reduce((p, a) => p + a, 0));
