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
    return {x: +x, y: +y};
});

const tryForPrize = (prizeX: number, prizeY: number, aX: number, aY: number, aPrice: number, bX: number, bY: number, bPrice: number): number =>{
    for(let b = 100; b >= 0; b--) {
        for(let a = 0; a <= 100; a++) {
            if (b * bX + a * aX === prizeX && b * bY + a * aY === prizeY) {
                return b*bPrice + a*aPrice
            }
        }
    }
    return 0;
}

let costs = prizes.map((p, i) => tryForPrize(p.x, p.y, aButtons[i].x, aButtons[i].y, aButtons[i].price, bButtons[i].x, bButtons[i].y, bButtons[i].price));

console.log(costs.reduce((p, a) => p + a, 0));
