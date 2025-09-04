import Deck from "./Deck";
const decks: Deck[] = [];
const customHandSize = 5;
decks.push(new Deck('Blue-Eyes', 16, 15, 9, 3));
Deck.ComparisonTable(decks, undefined, undefined, customHandSize);
