const fs = require('fs').promises;
const wordListPath = require('word-list');

/**
 * Validate all provided arguments
 */
function validate() {
    const args = require('minimist')(process.argv.slice(2));

    if (args.verbose && typeof args.verbose !== 'boolean') {
        console.error("Provided --verbose flag must be boolean");
        process.exit();
    }

    /* if (args.nyt && typeof args.nyt !== 'boolean') {
        console.error("Provided --nyt flag must be boolean");
        process.exit();
    } */

    if (args.word && typeof args.word !== 'string') {
        console.error("Provided --word must be of type string");
        process.exit();
    }

    /* if (args.word && args.nyt) {
        console.error("Provided --nyt and --word; pick one");
        process.exit();
    } */

    return args;
}

async function initWordlist() {
    const data = await fs.readFile(wordListPath, 'utf8');
    const buffer = new Buffer.from(data);
    const words = buffer.toString().split('\n');
    return words.filter(word => word.length === 5);
}

async function retrieveSecret(args, fivers) {
    if (args.word) {
        return args.word;
    }/*  else if (args.nyt) {

    } */
    return fivers[Math.floor(Math.random() * fivers.length)];
}

function makeGuess(fivers, round) {
    return fivers[Math.floor(Math.random() * fivers.length)];
}

function generateFeedback(secret, guess) {
    const letters = Array.from(secret);
    const greens = Array(5).fill();
    const yellows = Array(5).fill();
    const blacks = new Set(guess);
    // Find all greens
    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) {
            greens[i] = secret[i];
            letters.splice(letters.indexOf(guess[i]),1);
            blacks.delete(guess[i]);
        }
    }
    //console.log(`L:${letters}-B:${Array.from(blacks)}`)
    // Find all yellows
    for (let i = 0; i < secret.length; i++) {
        if (!greens[i] && letters.includes(guess[i])) {
            yellows[i] = guess[i];
            letters.splice(letters.indexOf(guess[i]), 1);
            blacks.delete(guess[i]);
        }
    }
    //console.log(`G:${greens}-Y:${yellows}-B:${Array.from(blacks)}`);
    return {
        greens: greens,
        yellows: yellows,
        blacks: blacks
    };
}

function pruneWordlist(fivers, greens, yellows, blacks) {
    const valids = greens.filter(green => !!green).concat(yellows.filter(yellows => !!yellows));
    return fivers.filter(word => {
        // Filter all words that don't have all known letters
        const letters = Array.from(word);
        for (let i = 0; i < valids.length; i++) {
            if (letters.includes(valids[i])) {
                letters.splice(letters.indexOf(valids[i]), 1);
            } else {
                return false;
            }
        }
        // Filter all that don't match all greens
        for (let i = 0; i < greens.length; i++) {
            if (greens[i] && greens[i] != word[i]) {
                return false;
            }
        }
        // Filter all that match yellows (because thye must move)
        for (let i = 0; i < yellows.length; i++) {
            if (yellows[i] && yellows[i] == word[i]) {
                return false;
            }
        }
        // Filter any word that contains a letter we've blacked out
        for (const letter of blacks) {
            if (word.includes(letter))
                return false;
        }
        return true;
    });
}

async function main() {
    // CLI
    const args = validate();
    // Load all 5-letter words
    let fivers = await initWordlist();
    // Choose game word
    const secret = await retrieveSecret(args, fivers);

    // Initialize game state
    const grid = [];
    let graveyard = [];
    let solved = false;
    let round = 1;

    do {
        const guess = makeGuess(fivers, round);
        if (args.verbose)
            console.log(`🤔 ${guess}`);

            // Generate feedback and grid
        const { greens, yellows, blacks } =  generateFeedback(secret, guess);
        grid.push(greens.map((green, i) => green ? '🟩' : (yellows[i] ? '🟨' : '⬜')).join(''));
        graveyard.push(...blacks);

        if (args.verbose) {
            console.log(grid[grid.length - 1]);
        }

        // Check for valid solution
        solved = greens.every(letter => !!letter)
        if (!solved) {
            // Prune all words from guess pool that are incompatible with the feedback
            fivers =  pruneWordlist(fivers, greens, yellows, blacks);
            if (args.verbose) {
                console.log(`💀 ${graveyard}`);
                console.log('🗃️');
                console.log(fivers);
            }
            round++;
        }
        if (args.verbose) {
            console.log('-----');
        }
    } while (!solved && round <= 6);

    console.log(`Wordle TDY ${solved ? round : 'X'}/6*\n`);
    console.log(grid.map(guess => `${guess}\n`).join(''));

    if (solved) {
        console.log("Wordle, schmerdle");
    } else {
        if (!args.word && !args.nyt) {
            console.log(`${secret.toUpperCase()}\n`);
        }
        console.log("Wordle, more like turdle");
    }
}

(async () => {
    try {
        await main();
    } catch (e) {
        throw e;
    }
})();