import { readFileSync } from 'fs';

const file = readFileSync('./input10', 'utf-8');
let arr = file.split(/\r?\n/).map((row) => row.split(''));

let direction = 'down';
let position = [arr.findIndex((row) => row.includes('S'))];
position.push(arr[position[0]].findIndex((char) => char === 'S'));
let routePositions = [];

const move = () => {
    if (direction === 'down') {
        position[0]++;
    }
    if (direction === 'up') {
        position[0]--;
    }
    if (direction === 'left') {
        position[1]--;
    }
    if (direction === 'right') {
        position[1]++;
    }
    routePositions.push([position[0], position[1]]);
};

const updateDir = () => {
    const currentChar = arr[position[0]][position[1]];
    if (currentChar === 'L') {
        direction = direction === 'left' ? 'up' : 'right';
    }
    if (currentChar === 'J') {
        direction = direction === 'right' ? 'up' : 'left';
    }
    if (currentChar === '7') {
        direction = direction === 'right' ? 'down' : 'left';
    }
    if (currentChar === 'F') {
        direction = direction === 'left' ? 'down' : 'right';
    }
};

let routeCount = 0;
move();
updateDir();
routeCount++;

while (arr[position[0]][position[1]] !== 'S') {
    move();
    updateDir();
    routeCount++;
}

arr = arr.map((row, yIndex) => {
    return row.map((char, xIndex) => {
        if (routePositions.find((pos) => pos[0] === yIndex && pos[1] === xIndex)) {
            return char;
        }
        return '.';
    });
});

const updateDirAndMarkTiles = () => {
    const currentChar = arr[position[0]][position[1]];
    if (currentChar === 'L') {
        direction = direction === 'left' ? 'up' : 'right';
        arr[position[0]][position[1]] = direction === 'up' ? 'UL' : 'DR';
        return;
    }
    if (currentChar === 'J') {
        direction = direction === 'right' ? 'up' : 'left';
        arr[position[0]][position[1]] = direction === 'up' ? 'UR' : 'DL';
        return;
    }
    if (currentChar === '7') {
        direction = direction === 'right' ? 'down' : 'left';
        arr[position[0]][position[1]] = direction === 'down' ? 'DR' : 'UL';
        return;
    }
    if (currentChar === 'F') {
        direction = direction === 'left' ? 'down' : 'right';
        arr[position[0]][position[1]] = direction === 'down' ? 'DL' : 'UR';
        return;
    }
    if (currentChar === 'S') {
        return;
    }
    if (currentChar === '|' || currentChar === '-') {
        arr[position[0]][position[1]] =
            direction === 'left' ? 'L' : direction === 'right' ? 'R' : direction === 'up' ? 'U' : 'D';
    }
};

direction = 'down';
position = [arr.findIndex((row) => row.includes('S'))];
position.push(arr[position[0]].findIndex((char) => char === 'S'));

move();
updateDirAndMarkTiles();

while (arr[position[0]][position[1]] !== 'S') {
    move();
    updateDirAndMarkTiles();
}

arr.forEach((row, yIndex) => {
    row.forEach((char, xIndex) => {
        if (char === '.') {
            if (arr[yIndex][xIndex + 1]?.includes('U')) {
                char += 'U';
            }
            if (arr[yIndex][xIndex - 1]?.includes('D')) {
                char += 'D';
            }
            if (arr[yIndex - 1]?.[xIndex].includes('L')) {
                char += 'L';
            }
            if (arr[yIndex + 1]?.[xIndex].includes('R')) {
                char += 'R';
            }
            arr[yIndex][xIndex] = char;
        }
    });
});

let iterator = 0;
while (iterator < 50) {
    iterator++;
    arr.forEach((row, yIndex) => {
        row.forEach((char, xIndex) => {
            if (char.includes('.')) {
                if (arr[yIndex][xIndex - 1]?.includes('.') && arr[yIndex][xIndex - 1]?.includes('U')) {
                    char += char.includes('U') ? '' : 'U';
                }
                if (arr[yIndex][xIndex - 1]?.includes('.') && arr[yIndex][xIndex - 1]?.includes('D')) {
                    char += char.includes('D') ? '' : 'D';
                }
                if (arr[yIndex][xIndex - 1]?.includes('.') && arr[yIndex][xIndex - 1]?.includes('L')) {
                    char += char.includes('L') ? '' : 'L';
                }
                if (arr[yIndex][xIndex - 1]?.includes('.') && arr[yIndex][xIndex - 1]?.includes('R')) {
                    char += char.includes('R') ? '' : 'R';
                }

                if (arr[yIndex][xIndex + 1]?.includes('.') && arr[yIndex][xIndex + 1]?.includes('U')) {
                    char += char.includes('U') ? '' : 'U';
                }
                if (arr[yIndex][xIndex + 1]?.includes('.') && arr[yIndex][xIndex + 1]?.includes('D')) {
                    char += char.includes('D') ? '' : 'D';
                }
                if (arr[yIndex][xIndex + 1]?.includes('.') && arr[yIndex][xIndex + 1]?.includes('L')) {
                    char += char.includes('L') ? '' : 'L';
                }
                if (arr[yIndex][xIndex + 1]?.includes('.') && arr[yIndex][xIndex + 1]?.includes('R')) {
                    char += char.includes('R') ? '' : 'R';
                }

                if (arr[yIndex + 1]?.[xIndex]?.includes('.') && arr[yIndex + 1]?.[xIndex]?.includes('U')) {
                    char += char.includes('U') ? '' : 'U';
                }
                if (arr[yIndex + 1]?.[xIndex]?.includes('.') && arr[yIndex + 1]?.[xIndex]?.includes('D')) {
                    char += char.includes('D') ? '' : 'D';
                }
                if (arr[yIndex + 1]?.[xIndex]?.includes('.') && arr[yIndex + 1]?.[xIndex]?.includes('L')) {
                    char += char.includes('L') ? '' : 'L';
                }
                if (arr[yIndex + 1]?.[xIndex]?.includes('.') && arr[yIndex + 1]?.[xIndex]?.includes('R')) {
                    char += char.includes('R') ? '' : 'R';
                }

                if (arr[yIndex - 1]?.[xIndex]?.includes('.') && arr[yIndex - 1]?.[xIndex]?.includes('U')) {
                    char += char.includes('U') ? '' : 'U';
                }
                if (arr[yIndex - 1]?.[xIndex]?.includes('.') && arr[yIndex - 1]?.[xIndex]?.includes('D')) {
                    char += char.includes('D') ? '' : 'D';
                }
                if (arr[yIndex - 1]?.[xIndex]?.includes('.') && arr[yIndex - 1]?.[xIndex]?.includes('L')) {
                    char += char.includes('L') ? '' : 'L';
                }
                if (arr[yIndex - 1]?.[xIndex]?.includes('.') && arr[yIndex - 1]?.[xIndex]?.includes('R')) {
                    char += char.includes('R') ? '' : 'R';
                }
                arr[yIndex][xIndex] = char;
            }
        });
    });
}

let answers = arr.map((row) => row.filter((c) => c.includes('.') && c.length === 5));

console.log(answers.reduce((p, a) => p + a.length, 0));
