import { readFileSync } from 'fs';

const file = readFileSync('./input25.input', 'utf-8');
const input = file.split(/\r?\n\r?\n/).map((grid) => grid.split(/\r?\n/));
const keys = input.filter(((grid) => grid[0] === '.....'));
const locks = input.filter(((grid) => grid[0] === '#####'));
const keyValues = keys.map((key) => {
    const vals = [0, 0, 0, 0, 0]
    for(let x = 0; x < 5; x++) {
        let count = 0;
        for(let y = 1; y < 6; y++) {
            if(key[y][x] === '#') {
                count++;
            }
        }
        vals[x] = count;
    }
    return vals;
});

const lockValues = locks.map((key) => {
    const vals = [0, 0, 0, 0, 0]
    for(let x = 0; x < 5; x++) {
        let count = 0;
        for(let y = 1; y < 6; y++) {
            if(key[y][x] === '#') {
                count++;
            }
        }
        vals[x] = count;
    }
    return vals;
});

let count = 0;
lockValues.forEach((lock) => {
    keyValues.forEach((key) => {
        if(lock.map((lVal, i) => lVal+key[i]).filter((combo) => combo > 5).length === 0) {
            count++;
        }
    })
})

console.log(keys);
console.log(locks);
console.log(keyValues)
console.log(lockValues)
console.log(count);
