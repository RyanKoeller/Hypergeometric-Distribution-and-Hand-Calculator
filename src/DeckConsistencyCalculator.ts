import Deck from "./Deck";
import CardCategory from "./CardCategory";
const decks: Deck[] = [];
const customHandSize = 5;

decks.push(
    new Deck(
        'Blue-Eyes',
        [
            new CardCategory("Starter", 16),
            new CardCategory("Handtrap", 15),
            new CardCategory("Utility", 9),
            new CardCategory("Brick", 3)
        ]
    ));
Deck.ComparisonTable(decks, undefined, undefined, customHandSize);
