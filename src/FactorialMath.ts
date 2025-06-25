class FactorialMath {

    static f: number[] = [];

    constructor() {
        throw new Error('Cannot instantiate static class.');
    }

    static factorial (n: number): number {
        if (n === 0 || n === 1)
            return 1;
        if (this.f[n] > 0)
            return this.f[n];
        return this.f[n] = this.factorial(n-1) * n;
    }

    static combinations(n: number, k: number): number {
        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
    }

    static hypergeometricDistribution(deckSize: number, desiredCards: number, cardsDrawn: number, min: number, max: number): number {
        if (min < 0 || max < 0) {
            throw "You cannot draw negative cards.";
        }
        if (max <  min) {
            max = min;
        }
        if (max > desiredCards) {
            max = desiredCards;
        }

        let totalProbability = 0;

        for (let i = min; i <= max; i++) {
            const numerator = this.combinations(desiredCards, i) * this.combinations(deckSize - desiredCards, cardsDrawn - i);
            const denominator = this.combinations(deckSize, cardsDrawn);
            totalProbability += numerator / denominator;
        }

        return totalProbability;
    }
}

export default FactorialMath;
