import { readFileSync } from 'fs';

const file = readFileSync('./input22.input', 'utf-8');
let input = file.split(/\r?\n/).map((nr) => +nr);

const mix = (value: number, secretNr: number): number => {
    return value ^ secretNr;
}

const prune = (secretNr: number): number => {
    return secretNr & 16777215;
}

interface PriceChange {
    index: number;
    priceDelta: number;
    price: number;
}

const evolve = (secretNr: number): number => {
    let result = secretNr*64;
    secretNr = mix(result, secretNr);
    secretNr = prune(secretNr);
    result = Math.floor(secretNr / 32);
    secretNr = mix(result, secretNr);
    secretNr = prune(secretNr);
    result = secretNr * 2048;
    secretNr = mix(result, secretNr);
    secretNr = prune(secretNr);
    return secretNr;
}

let priceHistory = input.map((nr => [nr]));

for(let i = 0; i < 2000; i++) {
    priceHistory.forEach((history) => history.push(evolve(history[history.length-1])))
}

priceHistory = priceHistory.map((history) => history.map(nr => {
    return nr % 10;
}));

let priceChanges: PriceChange[][] = priceHistory.map((history, histIndex) => history.map((nr, i) => {
    let delta = priceHistory[histIndex][i-1] !== undefined ? nr - (priceHistory[histIndex][i-1]) : 0;
    return {index: histIndex, priceDelta: delta, price: nr}
}));

const getPriceForDelta = (delta: number[], history: PriceChange[]): number => {
    let count = 0;
    for(let i = 1; i < history.length; i++) {
        if(history[i].priceDelta === delta[count]) {
            count++;
            if(count === 4) {
                return history[i].price;
            }
        } else {
            i -= count;
            count = 0;
        }
    } return 0;
}

const getDelta = (hist: number, index: number): number[] => {
    return [priceChanges[hist][index].priceDelta, priceChanges[hist][index+1].priceDelta, priceChanges[hist][index+2].priceDelta, priceChanges[hist][index+3].priceDelta];
}

let deltaCache = new Map();

let prevBest = 0;
for(let j = input.length-1; j >= 0; j--) {
    for(let i = 1; i < 2000-3; i++) {
        let delta = getDelta(j, i);
        if(deltaCache.has(`${delta[0]},${delta[1]},${delta[2]},${delta[3]}`)) {
            continue;
        }
        let bananaGains = priceChanges.map((history) => getPriceForDelta(delta, history))
        deltaCache.set(`${delta[0]},${delta[1]},${delta[2]},${delta[3]}`, 1);
        let totalBananas = bananaGains.reduce((p, a) => p + a, 0);
        if (totalBananas > prevBest) {
            console.log('current best deal: ', totalBananas);
            prevBest = totalBananas;
        }
    }
}
