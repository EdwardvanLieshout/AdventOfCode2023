import { readFileSync } from 'fs';

const file = readFileSync('./input6', 'utf-8');

interface Race {
    time: number;
    distance: number;
}

const races = [];

const arr = file.split(/\r?\n/).map((line) =>
    line
        .substring(line.indexOf(':') + 1)
        .split(' ')
        .filter((data) => data !== '')
        .map((numStr) => +numStr)
);

arr[0].forEach((num, index) => {
    races.push({
        time: arr[0][index],
        distance: arr[1][index],
    });
});

const amountsOfWaysToBeatRecord = [0, 0, 0, 0];

races.forEach((race, raceIndex) => {
    for (let chargeTime = 0; chargeTime < race.time; chargeTime++) {
        amountsOfWaysToBeatRecord[raceIndex] += (race.time - chargeTime) * chargeTime > race.distance ? 1 : 0;
    }
});

console.log(amountsOfWaysToBeatRecord.reduce((p, a) => p * a, 1));
