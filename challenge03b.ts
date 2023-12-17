import { readFileSync } from 'fs';

const file = readFileSync('./input03', 'utf-8');

const norm = (num: number) => {
    if (num === -1) {
        num = 0;
    }
    if (num === 140) {
        num = 139;
    }
    return num;
};

interface numAndIndex {
    num: number;
    indexX: number;
    indexY: number;
}

const arr = file.split(/\r?\n/).map((row) => row.split(''));

const othernums: numAndIndex[] = [];
const partnums: numAndIndex[] = [];
arr.forEach((row, i) => {
    row.forEach((char, j) => {
        if (char.match(/\d/)) {
            if (
                row[norm(j - 1)].match(/(\d|\.)/) &&
                row[norm(j + 1)].match(/(\d|\.)/) &&
                arr[norm(i - 1)][norm(j - 1)].match(/(\d|\.)/) &&
                arr[norm(i - 1)][norm(j)].match(/(\d|\.)/) &&
                arr[norm(i - 1)][norm(j + 1)].match(/(\d|\.)/) &&
                arr[norm(i + 1)][norm(j - 1)].match(/(\d|\.)/) &&
                arr[norm(i + 1)][norm(j)].match(/(\d|\.)/) &&
                arr[norm(i + 1)][norm(j + 1)].match(/(\d|\.)/)
            ) {
                if (
                    partnums.length &&
                    (partnums[partnums.length - 1].indexX === j - 1 ||
                        (partnums[partnums.length - 1].num > 9 && partnums[partnums.length - 1].indexX === j - 2)) &&
                    partnums[partnums.length - 1].indexY === i
                ) {
                    partnums[partnums.length - 1].num = +(partnums[partnums.length - 1].num + char);
                } else {
                    if (
                        othernums.length &&
                        (othernums[othernums.length - 1].indexX === j - 1 ||
                            (othernums[othernums.length - 1].num > 9 &&
                                othernums[othernums.length - 1].indexX === j - 2)) &&
                        othernums[othernums.length - 1].indexY === i
                    ) {
                        othernums[othernums.length - 1].num = +(othernums[othernums.length - 1].num + char);
                    } else {
                        othernums.push({ num: +char, indexX: j, indexY: i });
                    }
                }
            } else {
                if (
                    partnums.length &&
                    (partnums[partnums.length - 1].indexX === j - 1 ||
                        (partnums[partnums.length - 1].num > 9 && partnums[partnums.length - 1].indexX === j - 2)) &&
                    partnums[partnums.length - 1].indexY === i
                ) {
                    partnums[partnums.length - 1].num = +(partnums[partnums.length - 1].num + char);
                } else {
                    if (
                        othernums.length &&
                        (othernums[othernums.length - 1].indexX === j - 1 ||
                            (othernums[othernums.length - 1].num > 9 &&
                                othernums[othernums.length - 1].indexX === j - 2)) &&
                        othernums[othernums.length - 1].indexY === i
                    ) {
                        partnums.push(othernums.pop());
                        partnums[partnums.length - 1].num = +(partnums[partnums.length - 1].num + char);
                    } else {
                        partnums.push({ num: +char, indexX: j, indexY: i });
                    }
                }
            }
        }
    });
});

const gearratios: number[] = [];
arr.forEach((row, i) => {
    row.forEach((char, j) => {
        if (char.match(/\*/)) {
            const amts = partnums.filter(
                (part) =>
                    (part.indexY === i - 1 || part.indexY === i || part.indexY === i + 1) &&
                    (part.indexX === j - 1 ||
                        part.indexX === j ||
                        part.indexX === j + 1 ||
                        (part.num > 9 && part.indexX === j - 2) ||
                        (part.num > 99 && part.indexX === j - 3))
            );
            gearratios.push(amts.map((part) => part.num).reduce((p, a) => p * a, 1));
        }
    });
});

console.log(gearratios.reduce((p, a) => p + a, 0));
