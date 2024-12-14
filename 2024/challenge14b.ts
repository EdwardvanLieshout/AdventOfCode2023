import { readFileSync } from 'fs';

const file = readFileSync('./input14.input', 'utf-8');
const input = file.split(/\r?\n/);

interface Robot {
    positionX: number
    positionY: number
    velocityX: number
    velocityY: number
}

let robots: Robot[] = input.map((row) => {
    let p1 = +row.split(' ')[0].split(',')[0].substring(2);
    let p2 = +row.split(' ')[0].split(',')[1];
    let v1 = +row.split(' ')[1].split(',')[0].substring(2);
    let v2 = +row.split(' ')[1].split(',')[1];
    return {positionX: p1, positionY: p2, velocityX: v1, velocityY: v2}
})

const MAP_WIDTH = 101;
const MAP_HEIGHT = 103;

const moveRobot = (robot: Robot, seconds: number): Robot => {
    robot.positionX = (robot.positionX + robot.velocityX*seconds) % MAP_WIDTH;
    robot.positionY = (robot.positionY + robot.velocityY*seconds) % MAP_HEIGHT;
    if(robot.positionX < 0) {
        robot.positionX = MAP_WIDTH + robot.positionX;
    }
    if(robot.positionY < 0) {
        robot.positionY = MAP_HEIGHT + robot.positionY;
    }
    return robot;
}

let i = 6500;
robots = robots.map((robot) => moveRobot(robot, 6500));
setInterval(() => {
    i++;
    robots = robots.map((robot) => moveRobot(robot, 1));
    let grid = Array.from({length: MAP_HEIGHT}, e => Array(MAP_WIDTH).fill('.'));
    robots.forEach((robot) => {
        if(grid[robot.positionY][robot.positionX] === '.') {
            grid[robot.positionY][robot.positionX] = '1'
        } else {
            grid[robot.positionY][robot.positionX] = `${(+grid[robot.positionY][robot.positionX] + 1)}`;
        }
    });
    console.log(i);
    console.log(grid.map((row) => row.join('')).join('\n'));
    console.log();
}, 50);
