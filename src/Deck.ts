import FactorialMath from "./FactorialMath";
import CardCategory from "./CardCategory";

class Deck {
    // region Properties
    constructor(
        private _name: string,
        private _cardCategories: CardCategory[],
    ) {}
    // endregion Properties

    // region Getters and setters
    get name() {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }
    get cardCategories() {
        return this._cardCategories;
    }
    set cardCategories(categories: CardCategory[]) {
        this._cardCategories = categories;
    }
    get deckSize() {
        return this.cardCategories
            .filter(n => n.addToDeckSize)
            .map(n => n.size)
            .reduce((acc, cur) => acc + cur, 0);
    }
    // endregion

    public preferredHandTrapSize() {
        return (this.deckSize * 0.3).toPrecision(3);
    }

    public deckSummary(min?: number, max?: number, customHandSize?: number): any {
        const deckSummary: any = {
            name: this.name,
            deckSize: this.deckSize
        }

        for (const cardCategory of this.cardCategories) {
            deckSummary[`${cardCategory.name} Probability`]
                = `${(Deck.calculateCardCategoryProb(this.deckSize, cardCategory, min, max, customHandSize) * 100).toPrecision(4)}%`;
        }
        // deckSummary.preferredHandTrapSize = this.preferredHandTrapSize();

        return deckSummary;
    }

    // region Hand probabilities
    public static calculateCardCategoryProb(
        deckSize: number,
        cardCategory: CardCategory,
        min: number = 1,
        max: number = 5,
        customHandSize?: number): number {
        return FactorialMath.hypergeometricDistribution(deckSize, cardCategory.size, min, max, customHandSize)
    }
    // endregion

    public static ComparisonTable(decks: Deck[], min?: number, max?: number, customHandSize?: number, ) {
        if (max === undefined) {
            max = customHandSize;
        }
        console.table([...decks.map(d => d.deckSummary(min, max, customHandSize))]);
    }
}

export default Deck;
