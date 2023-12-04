import { readFileSync } from 'fs'

const file = readFileSync('./input4', 'utf-8')
const arr = file.split(/\r?\n/).map((cardStr) =>
    cardStr
        .substring(cardStr.indexOf(':') + 1)
        .trim()
        .split('|')
        .map((piles) => piles.split(' ').filter((item) => item !== ''))
)
const winningVals = arr
    .map((card) => card[1].filter((value) => card[0].includes(value)))
    .map((winningVals) => {
        if (!winningVals.length) {
            return 0
        } else {
            return Math.pow(2, winningVals.length - 1)
        }
    })
console.log(winningVals.reduce((p, a) => p + a, 0))
