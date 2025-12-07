class FactorialMath {

    private static DEFAULT_HAND_SIZE: number = 5;

    // f[n] = n! as bigint
    private static f: bigint[] = [1n]; // f[0] = 1n

    constructor() {
        throw new Error('Cannot instantiate static class.');
    }

    /**
     * Calculates the factorial of a non-negative integer n.
     * Uses memoization to cache previously computed factorials.
     * @param n - The non-negative integer to compute the factorial of.
     * @returns The factorial of n as a BigInt.
     */
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

    /**
     * Calculates the number of combinations (n choose k).
     * @param n - Total number of items.
     * @param k - Number of items to choose.
     * @returns The number of combinations as a BigInt.
     */
    static combinations(n: number, k: number): bigint {
        if (k < 0 || k > n) return 0n;

        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
    }

    /**
     * Computes the probability of a certain range of desired cards in a draw
     * from a deck based on the hypergeometric distribution.
     * @param deckSize - Total number of cards in the deck.
     * @param desiredCards - Total number of desired cards in the deck.
     * @param min - Minimum number of desired cards to draw.
     * @param max - Maximum number of desired cards to draw.
     * @param cardsDrawn - Number of cards drawn (defaults to DEFAULT_HAND_SIZE).
     * @returns The probability as a number.
     */
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
