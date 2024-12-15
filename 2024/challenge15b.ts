import { readFileSync } from 'fs';

const file = readFileSync('./input15.input', 'utf-8');
const map = file.split(/\r?\n\r?\n/)[0].split(/\r?\n/).map((row) => row.split(''));
const actions = file.split(/\r?\n\r?\n/)[1].split(/\r?\n/).map((row) => row.split('')).flat();

const wideMap = map.map((row) => {
    return row.map((c) => {
        if (c === '#') {
            return ['#', '#'];
        }
        if (c === '.') {
            return ['.', '.'];
        }
        if (c === 'O') {
            return ['[', ']'];
        }
        if (c === '@') {
            return ['@', '.'];
        }
    }).flat();
})

let robotY = wideMap.findIndex((row) => row.includes('@'));
let robotX = wideMap[robotY].findIndex((c) => c === '@');


const tryMovePlayer = (dirX: number, dirY: number, posX: number, posY: number): boolean => {
    let checkTileX = posX + dirX;
    let checkTileY = posY + dirY;
    let canPush = true;
    if(wideMap[checkTileY][checkTileX] === '[') {
        canPush = tryMoveStone(dirX, dirY, checkTileX, checkTileY);
    }
    if(wideMap[checkTileY][checkTileX] === ']') {
        canPush = tryMoveStone(dirX, dirY, checkTileX-1, checkTileY);
    }
    if(wideMap[checkTileY][checkTileX] === '#') {
        return false;
    }
    return canPush;
}

const movePlayer = (dirX: number, dirY: number, posX: number, posY: number): void => {
    let checkTileX = posX + dirX;
    let checkTileY = posY + dirY;
    if(wideMap[checkTileY][checkTileX] === '[') {
        moveStone(dirX, dirY, checkTileX, checkTileY);
    }
    if(wideMap[checkTileY][checkTileX] === ']') {
        moveStone(dirX, dirY, checkTileX-1, checkTileY);
    }
    wideMap[posY + dirY][posX + dirX] = '@';
    robotX += dirX;
    robotY += dirY;
    wideMap[posY][posX] = '.';
}

const tryMoveStone = (dirX: number, dirY: number, posX: number, posY: number): boolean => {
    let checkTileX = posX + dirX;
    let checkTileY = posY + dirY;
    let extraCheckTileX = undefined;
    let extraCheckTileY = undefined;
    if(dirX > 0) {
        checkTileX = checkTileX + dirX;
    }
    if(dirY !== 0) {
        extraCheckTileX = posX + dirX + 1;
        extraCheckTileY = posY + dirY;
        if(wideMap[checkTileY][checkTileX] === '#' || wideMap[extraCheckTileY][extraCheckTileX] === '#') {
            return false;
        }
        let bool1 = true;
        let bool2 = true;
        if(wideMap[checkTileY][checkTileX] === '[') {
            bool1 = tryMoveStone(dirX, dirY, checkTileX, checkTileY);
        }
        if(wideMap[checkTileY][checkTileX] === ']') {
            bool1 = tryMoveStone(dirX, dirY, checkTileX-1, checkTileY);
        }
        if(wideMap[extraCheckTileY][extraCheckTileX] === '[') {
            bool2 = tryMoveStone(dirX, dirY, extraCheckTileX, extraCheckTileY);
        }
        if(wideMap[extraCheckTileY][extraCheckTileX] === ']') {
            bool2 = tryMoveStone(dirX, dirY, extraCheckTileX-1, extraCheckTileY);
        }
        if (bool1 && bool2) {
            return true;
        }
        return false;
    }
    if(wideMap[checkTileY][checkTileX] === '#') {
        return false;
    }
    let bool1 = true;
    if(wideMap[checkTileY][checkTileX] === '[') {
        bool1 = tryMoveStone(dirX, dirY, checkTileX, checkTileY);
    }
    if(wideMap[checkTileY][checkTileX] === ']') {
        bool1 = tryMoveStone(dirX, dirY, checkTileX-1, checkTileY);
    }
    if (bool1) {
        return true;
    }
    return false;
}

const moveStone = (dirX: number, dirY: number, posX: number, posY: number): void => {
    let checkTileX = posX + dirX;
    let checkTileY = posY + dirY;
    let extraCheckTileX = undefined;
    let extraCheckTileY = undefined;
    if(dirX > 0) {
        checkTileX = checkTileX + dirX;
    }
    if(dirY !== 0) {
        extraCheckTileX = posX + dirX + 1;
        extraCheckTileY = posY + dirY;
        if(wideMap[checkTileY][checkTileX] === '[') {
            moveStone(dirX, dirY, checkTileX, checkTileY);
        }
        if(wideMap[checkTileY][checkTileX] === ']') {
            moveStone(dirX, dirY, checkTileX-1, checkTileY);
        }
        if(wideMap[extraCheckTileY][extraCheckTileX] === '[') {
            moveStone(dirX, dirY, extraCheckTileX, extraCheckTileY);
        }
        if(wideMap[extraCheckTileY][extraCheckTileX] === ']') {
            moveStone(dirX, dirY, extraCheckTileX-1, extraCheckTileY);
        }
        wideMap[checkTileY][checkTileX] = '[';
        wideMap[extraCheckTileY][extraCheckTileX] = ']';
        wideMap[posY][posX] = '.';
        wideMap[posY][posX+1] = '.';
        return;
    }
    if(wideMap[checkTileY][checkTileX] === '[') {
        moveStone(dirX, dirY, checkTileX, checkTileY);
    }
    if(wideMap[checkTileY][checkTileX] === ']') {
        moveStone(dirX, dirY, checkTileX-1, checkTileY);
    }
    wideMap[posY][posX] = '.';
    wideMap[posY][posX+1] = '.';
    wideMap[posY][posX + dirX] = '[';
    wideMap[posY][posX + dirX + 1] = ']';
}


actions.forEach((action) => {
    if(action === '<') {
        if (tryMovePlayer(-1, 0, robotX, robotY)) {
            movePlayer(-1, 0, robotX, robotY);
        }
    }
    if(action === '>') {
        if (tryMovePlayer(1, 0, robotX, robotY)) {
            movePlayer(1, 0, robotX, robotY);
        }
    }
    if(action === 'v') {
        if (tryMovePlayer(0, 1, robotX, robotY)) {
            movePlayer(0, 1, robotX, robotY);
        }
    }
    if(action === '^') {
        if (tryMovePlayer(0, -1, robotX, robotY)) {
            movePlayer(0, -1, robotX, robotY);
        }
    }
});

let stoneVals = [];

wideMap.forEach((row, y) => {
    row.forEach((c, x) => {
        if (c === '[') {
            stoneVals.push(y*100+x);
        }
    })
})

console.log(wideMap.map((row) => row.join('')).join('\n'));
console.log(stoneVals.reduce((p, a) => p + a, 0));
