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

robots = robots.map((robot) => moveRobot(robot, 100));
let q1 = robots.filter((robot) => robot.positionX <= (MAP_WIDTH-3)/2 && robot.positionY <= (MAP_HEIGHT-3)/2);
let q2 = robots.filter((robot) => robot.positionX > (MAP_WIDTH-1)/2 && robot.positionY <= (MAP_HEIGHT-3)/2);
let q3 = robots.filter((robot) => robot.positionX <= (MAP_WIDTH-3)/2 && robot.positionY > (MAP_HEIGHT-1)/2);
let q4 = robots.filter((robot) => robot.positionX > (MAP_WIDTH-1)/2 && robot.positionY > (MAP_HEIGHT-1)/2);

console.log(robots);
console.log(q1.length*q2.length*q3.length*q4.length);
