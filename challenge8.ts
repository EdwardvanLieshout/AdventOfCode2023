import { readFileSync } from 'fs'

const file = readFileSync('./input4', 'utf-8')
const arr = file.split(/\r?\n/).map((cardStr) =>
    cardStr
        .substring(cardStr.indexOf(':') + 1)
        .trim()
        .split('|')
        .map((piles) => piles.split(' ').filter((item) => item !== ''))
)
const amountsOfEachCard = new Array(220).fill(1)
const winningVals = arr
    .map((card) => card[1].filter((value) => card[0].includes(value)))
    .map((winningVals, index) => {
        for (let i = index + 1; i <= index + winningVals.length; i++) {
            amountsOfEachCard[i] += 1 * amountsOfEachCard[index]
        }
    })
console.log(amountsOfEachCard.reduce((p, a) => p + a, 0))
