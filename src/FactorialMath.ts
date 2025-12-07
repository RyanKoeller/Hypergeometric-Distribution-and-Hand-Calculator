class FactorialMath {

    private static DEFAULT_HAND_SIZE: number = 5;

    // f[n] = n! as bigint
    private static f: bigint[] = [1n]; // f[0] = 1n

    constructor() {
        throw new Error('Cannot instantiate static class.');
    }

    static factorial(n: number): bigint {
        if (n < 0) {
            throw new Error("Factorial not defined for negative numbers.");
        }

        const f = this.f;

        // Already computed? Return from memo.
        if (f[n] !== undefined) {
            return f[n];
        }

        // Compute missing values iteratively from the highest known value.
        let start = f.length;        // first value not yet computed
        let result = f[start - 1];   // last computed factorial

        for (let i = start; i <= n; i++) {
            result *= BigInt(i);
            f[i] = result;
        }

        return f[n];
    }

    static combinations(n: number, k: number): bigint {
        if (k < 0 || k > n) return 0n;

        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
    }

    static hypergeometricDistribution(
        deckSize: number,
        desiredCards: number,
        min: number,
        max: number,
        cardsDrawn?: number
    ): number {

        if (min < 0 || max < 0) {
            throw "You cannot draw negative cards.";
        }
        if (max < min) max = min;
        if (cardsDrawn === undefined) cardsDrawn = this.DEFAULT_HAND_SIZE;

        if (max > desiredCards) max = desiredCards;
        if (max > cardsDrawn) max = cardsDrawn;

        if (desiredCards > deckSize) {
            throw new Error("desiredCards cannot exceed deckSize.");
        }
        if (cardsDrawn > deckSize) {
            throw new Error("cardsDrawn cannot exceed deckSize.");
        }

        let totalProbability = 0;

        const denominator = Number(this.combinations(deckSize, cardsDrawn));

        for (let i = min; i <= max; i++) {
            const numerator =
                Number(this.combinations(desiredCards, i)) *
                Number(this.combinations(deckSize - desiredCards, cardsDrawn - i));

            totalProbability += numerator / denominator;
        }

        return totalProbability;
    }
}

export default FactorialMath;
