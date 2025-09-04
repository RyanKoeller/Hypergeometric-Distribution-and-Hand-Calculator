import FactorialMath from "./FactorialMath";

class Deck {
    // region Properties
    constructor(
        private _name: string,
        private _starters: number,
        private _handTraps: number,
        private _utility: number,
        private _bricks: number
    ) {}
    // endregion Properties

    // region Getters and setters
    get deckSize() {
        return this._starters + this._handTraps + this._utility + this._bricks;
    }
    get name() {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }
    get starters() {
        return this._starters;
    }
    set starters(starters: number) {
        this._starters = starters;
    }
    get handTraps() {
        return this._handTraps;
    }
    set handTraps(handTraps: number) {
        this._handTraps = handTraps;
    }
    get utility() {
        return this._utility;
    }
    set utility(utility: number) {
        this._utility = utility;
    }
    get bricks() {
        return this._bricks;
    }
    set bricks(bricks: number) {
        this._bricks = bricks;
    }
    // endregion

    // region Hand probabilities
    public calculateStarterProb(min: number = 1, max: number = 5, customHandSize?: number) {
        return FactorialMath.hypergeometricDistribution(this.deckSize, this._starters, min, max, customHandSize);
    }

    public calculateHandTrapProb(min: number = 1, max: number = 5, customHandSize?: number) {
        return FactorialMath.hypergeometricDistribution(this.deckSize, this._handTraps, min, max, customHandSize);
    }

    public calculateUtilityProb(min: number = 1, max: number = 5, customHandSize?: number) {
        return FactorialMath.hypergeometricDistribution(this.deckSize, this._utility, min, max, customHandSize);
    }

    public calculateBrickProb(min: number = 1, max: number = 5, customHandSize?: number) {
        return FactorialMath.hypergeometricDistribution(this.deckSize, this._bricks, min, max, customHandSize);
    }
    // endregion

    public preferredHandTrapSize() {
        return (this.deckSize * 0.3).toPrecision(3);
    }

    public deckSummary(min?: number, max?: number, customHandSize?: number) {
        return {
            name: this.name,
            deckSize: this.deckSize,
            starterProbability: `${(this.calculateStarterProb(min, max, customHandSize) * 100).toPrecision(4)}%`,
            handTrapProbability: `${(this.calculateHandTrapProb(min, max, customHandSize) * 100).toPrecision(4)}%`,
            utilityProbability: `${(this.calculateUtilityProb(min, max, customHandSize) * 100).toPrecision(4)}%`,
            brickProbability: `${(this.calculateBrickProb(min, max, customHandSize) * 100).toPrecision(4)}%`,
            preferredHandTrapSize: `${this.preferredHandTrapSize()}`,
        }
    }

    public static ComparisonTable(decks: Deck[], min?: number, max?: number, customHandSize?: number, ) {
        if (max === undefined) {
            max = customHandSize;
        }
        console.table([...decks.map(d => d.deckSummary(min, max, customHandSize))]);
    }
}

export default Deck;
