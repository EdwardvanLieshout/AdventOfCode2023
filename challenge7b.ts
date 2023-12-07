import { readFileSync } from 'fs';

const file = readFileSync('./input7', 'utf-8');

class CardsAndBid {
    cards: number[];
    bid: number;
    val1: number = 0;
    dupesOfVal1: number = 0;
    val2: number = 0;
    dupesOfVal2: number = 0;
}

const arr = file
    .split(/\r?\n/)
    .map((line) => line.split(' '))
    .map((line) => [
        line[0]
            .split('')
            .map(
                (char) =>
                    +char
                        .replaceAll('T', '10')
                        .replaceAll('Q', '11')
                        .replaceAll('K', '12')
                        .replaceAll('A', '13')
                        .replaceAll('J', '1')
            ),
        +line[1],
    ]);
const cardsAndBids: CardsAndBid[] = arr.map((data) => {
    return { cards: data[0] as number[], bid: data[1] as number, val1: 0, val2: 0, dupesOfVal1: 0, dupesOfVal2: 0 };
});

cardsAndBids.sort((a, b) => b.cards[4] - a.cards[4]);
cardsAndBids.sort((a, b) => b.cards[3] - a.cards[3]);
cardsAndBids.sort((a, b) => b.cards[2] - a.cards[2]);
cardsAndBids.sort((a, b) => b.cards[1] - a.cards[1]);
cardsAndBids.sort((a, b) => b.cards[0] - a.cards[0]);

cardsAndBids.forEach((c) => c.cards.sort((a, b) => b - a));
cardsAndBids.map((c, i) =>
    c.cards.forEach((card, cardIndex) => {
        if (cardsAndBids[i].dupesOfVal1 === 0) {
            cardsAndBids[i].val1 = card;
        }
        if (
            (card === cardsAndBids[i].val1 || card === 1) &&
            cardIndex !== 0 &&
            (c.cards[cardIndex - 1] === card || card === 1)
        ) {
            cardsAndBids[i].dupesOfVal1++;
        } else {
            if (card === cardsAndBids[i].val2 || card === 1) {
                cardsAndBids[i].dupesOfVal2++;
            } else {
                cardsAndBids[i].val2 = card;
            }
        }
    })
);
cardsAndBids.forEach((c, i) => {
    if (c.dupesOfVal2 === 2 && c.dupesOfVal1 === 1) {
        cardsAndBids[i].dupesOfVal1 = 2;
        cardsAndBids[i].dupesOfVal2 = 1;
    }
    if (c.dupesOfVal2 === 1 && c.dupesOfVal1 === 4) {
        cardsAndBids[i].dupesOfVal2 = 0;
    }
});
cardsAndBids.sort((a, b) => b.dupesOfVal1 * 5 + b.dupesOfVal2 - (a.dupesOfVal1 * 5 + a.dupesOfVal2));
cardsAndBids.reverse();

const finalVal = cardsAndBids.reduce((p, a, i) => p + a.bid * (i + 1), 0);

console.log(finalVal);
