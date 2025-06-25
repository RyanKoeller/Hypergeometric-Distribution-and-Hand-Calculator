import FactorialMath from "./FactorialMath";

// Change to see the odds of drawing a card in a given sample size
const STARTING_HAND_SIZE: number = 5;

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
    public calculateStarterProb(min: number = 1, max: number = 5) {
        return FactorialMath.hypergeometricDistribution(this.deckSize, this._starters, STARTING_HAND_SIZE, min, max);
    }

    public calculateHandTrapProb(min: number = 1, max: number = 5) {
        return FactorialMath.hypergeometricDistribution(this.deckSize, this._handTraps, STARTING_HAND_SIZE, min, max);
    }

    public calculateUtilityProb(min: number = 1, max: number = 5) {
        return FactorialMath.hypergeometricDistribution(this.deckSize, this._utility, STARTING_HAND_SIZE, min, max);
    }

    public calculateBrickProb(min: number = 1, max: number = 5) {
        return FactorialMath.hypergeometricDistribution(this.deckSize, this._bricks, STARTING_HAND_SIZE, min, max);
    }
    // endregion

    public preferredHandTrapSize() {
        return (this.deckSize * 0.3).toPrecision(3);
    }

    public deckSummary() {
        return {
            name: this.name,
            deckSize: this.deckSize,
            starterProbability: `${(this.calculateStarterProb() * 100).toPrecision(4)}%`,
            handTrapProbability: `${(this.calculateHandTrapProb() * 100).toPrecision(4)}%`,
            utilityProbability: `${(this.calculateUtilityProb() * 100).toPrecision(4)}%`,
            brickProbability: `${(this.calculateBrickProb() * 100).toPrecision(4)}%`,
            preferredHandTrapSize: `${this.preferredHandTrapSize()}`,
        }
    }

    public static ComparisonTable(decks: Deck[]) {
        console.table([...decks.map(d => d.deckSummary())]);
    }
}

export default Deck;
