import { readFileSync } from 'fs'

const file = readFileSync('./input2', 'utf-8')
const arr = file
    .split(/\r?\n/)
    .map((gameStr) => gameStr.split(':'))
    .map((game) => [
        game[0].split(' ')[1],
        game[1]
            ?.trim()
            .split(';')
            .map((turn) => turn.trim().split(', ')),
    ])
    .map((game) => [
        game[0],
        (game[1] as string[][])?.filter(
            (blockArr) =>
                blockArr.filter(
                    (blockStr) =>
                        (+blockStr.split(' ')[0] > 12 && blockStr.split(' ')[1] === 'red') ||
                        (+blockStr.split(' ')[0] > 13 && blockStr.split(' ')[1] === 'green') ||
                        (+blockStr.split(' ')[0] > 14 && blockStr.split(' ')[1] === 'blue')
                ).length > 0
        ),
    ])
    .filter((game) => game[1].length === 0)
    .map((game) => +game[0])

console.log(arr.reduce((p, a) => p + a, 0))
