import { readFileSync } from 'fs';

const file = readFileSync('./input5', 'utf-8');
let arr = file.split(/\r?\n/);
let seeds = arr[0]
    .substring(arr[0].indexOf(':') + 2)
    .split(' ')
    .map((seed) => +seed);
arr.shift();
let maps: any = file.split('map:');
maps.shift();
maps = maps.map((map) =>
    map
        .trim()
        .split(/\r?\n/)
        .filter((line) => line.match(/.+ .+ .+/))
);
maps.forEach((map) => {
    let tempseeds = [];
    map.forEach((line) => {
        const vals = line.split(' ');
        seeds.forEach((seed, index) => {
            if (seed >= +vals[1] && seed < +vals[1] + +vals[2]) {
                tempseeds.push(+vals[0] + (seed - +vals[1]));
                seeds[index] = -1;
            }
        });
        seeds = seeds.filter((seed) => seed !== -1);
    });
    seeds.push(...tempseeds);
    console.log(seeds.sort((a, b) => a - b));
});
