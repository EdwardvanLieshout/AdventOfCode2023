import { readFileSync } from 'fs';

const file = readFileSync('./input5', 'utf-8');
let arr = file.split(/\r?\n/);
let seeds = arr[0]
    .substring(arr[0].indexOf(':') + 2)
    .split(' ')
    .map((seed) => +seed);
let seedRanges = [];
for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i + 1]]);
}
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
    let tempseedRanges = [];
    map.forEach((line) => {
        const vals = line.split(' ');
        seedRanges.forEach((seedRange, index) => {
            if (seedRange[0] >= +vals[1] && seedRange[0] + seedRange[1] <= +vals[1] + +vals[2]) {
                tempseedRanges.push([+vals[0] + seedRange[0] - +vals[1], seedRange[1]]);
                seedRanges[index] = [-1, -1];
            }
            if (
                seedRange[0] >= +vals[1] &&
                seedRange[0] < +vals[1] + +vals[2] &&
                seedRange[0] + seedRange[1] > +vals[1] + +vals[2] &&
                seedRange[0] !== -1
            ) {
                const start = seedRange[0];
                const end = +vals[1] + +vals[2];
                const final = seedRange[0] + seedRange[1];
                tempseedRanges.push([+vals[0] + start - +vals[1], end - start]);
                seedRanges.push([end, final - end]);
                seedRanges[index] = [-1, -1];
            }
            if (
                seedRange[0] < +vals[1] &&
                seedRange[0] + seedRange[1] > +vals[1] &&
                seedRange[0] + seedRange[1] <= +vals[1] + +vals[2] &&
                seedRange[0] !== -1
            ) {
                const start = +vals[1];
                const end = seedRange[0] + seedRange[1];
                const begin = seedRange[0];
                tempseedRanges.push([+vals[0] + start - +vals[1], end - start]);
                seedRanges.push([begin, start - begin]);
                seedRanges[index] = [-1, -1];
            }
            if (seedRange[0] <= +vals[1] && seedRange[0] + seedRange[1] >= +vals[1] + +vals[2] && seedRange[0] !== -1) {
                const start = +vals[1];
                const end = +vals[1] + +vals[2];
                const begin = seedRange[0];
                const final = seedRange[0] + seedRange[1];
                tempseedRanges.push([+vals[0] + start - +vals[1], end - start]);
                seedRanges.push([end, final - end]);
                seedRanges.push([begin, start - begin]);
                seedRanges[index] = [-1, -1];
            }
        });
    });
    seedRanges = seedRanges.filter((range) => range[0] >= 0);
    seedRanges.push(...tempseedRanges);
    console.log(seedRanges);
    console.log(seedRanges.sort((a, b) => a[0] - b[0])[0][0]);
});
