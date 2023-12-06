import { readFileSync } from 'fs';

const file = readFileSync('./input6', 'utf-8');

interface Race {
    time: number;
    distance: number;
}

let tempraces = [{ time: '', distance: '' }];

const arr = file.split(/\r?\n/).map((line) =>
    line
        .substring(line.indexOf(':') + 1)
        .split(' ')
        .filter((data) => data !== '')
);

arr[0].forEach((num, index) => {
    tempraces[0].time += arr[0][index];
    tempraces[0].distance += arr[1][index];
});

let races: Race[] = tempraces.map((race) => {
    return { time: +race.time, distance: +race.distance };
});

const amountsOfWaysToBeatRecord = [0];

races.forEach((race, raceIndex) => {
    for (let chargeTime = 0; chargeTime < race.time; chargeTime++) {
        amountsOfWaysToBeatRecord[raceIndex] += (race.time - chargeTime) * chargeTime > race.distance ? 1 : 0;
    }
});

console.log(amountsOfWaysToBeatRecord[0]);
