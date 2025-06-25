import Deck from "./Deck";
const decks: Deck[] = [];
decks.push(new Deck('Super Quant Rangers', 13, 12, 14, 1));
decks.push(new Deck('Odion 1', 10, 9, 23, 0));
decks.push(new Deck('Odion 2', 10, 11, 18, 1));
Deck.ComparisonTable(decks);
