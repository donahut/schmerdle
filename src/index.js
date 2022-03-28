const fs = require('fs').promises;
const wordListPath = require('word-list');

async function initWordlist() {
    const data = await fs.readFile(wordListPath, 'utf8');
    const buffer = new Buffer.from(data);
    const words = buffer.toString().split('\n');
    return words.filter(word => word.length === 5);
}

async function main() {
    // Load all 5-letter words
    const fivers = await initWordlist();

    // Choose game word
    const secret = fivers[Math.floor(Math.random() * fivers.length)];
    console.log(secret);
    // Make initial guess
    const initial = fivers[Math.floor(Math.random() * fivers.length)];
    console.log(initial)
    // Loop up to 5 times
        // Give feedback
        // Make updates guess

    console.log("Wordle, schmerdle");
}

(async () => {
    try {
        await main();
    } catch (e) {
        throw e;
    }
})();