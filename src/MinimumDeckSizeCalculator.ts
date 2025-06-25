// hypergeometric distribution deck size
import FactorialMath from "./FactorialMath";

function calculateMinK(N: number, n: number, targetProb: number) {
    if (targetProb > 1 || targetProb < 0 ) {
        throw new Error('Invalid target probability');
    }

    // start with K = 10 to skip a few loop iterations
    for (let K = 10; K <= N; K++) {
        // Probability of no success
        const probNoSuccess = FactorialMath.combinations(N - K, n) / FactorialMath.combinations(N, n);
        // Probability of at least one success
        const probAtLeastOneSuccess = 1 - probNoSuccess;
        if (probAtLeastOneSuccess >= targetProb) {
            return {deckSize: N, starters: K, achievedProb: +(probAtLeastOneSuccess * 100).toPrecision(4)  + '%', utility: +(N * 0.3).toPrecision(3) };
        }
    }
    return null; // If no K satisfies the condition
}

const deckMax = 60;

// N total number of cards
for (let N = 40; N <= deckMax; N++) {
    // Given values
    const n = 5;  // number of draws
    const targetProb = 0.85; // target probability

    const result = calculateMinK(N, n, targetProb);
    console.log(result);
}
