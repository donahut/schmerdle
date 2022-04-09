# Schmerdle

Schmerdle is a [Wordle](https://www.nytimes.com/games/wordle/index.html)-playing bot that's just doing his best.

## Tell Me More!

**Does he always solve it optimally?** No.

**Does he even always solve it?** Again, no.

**Does he at least do OK for himself?** You bet.

Schmerdle will also help you analyze how your game went, if you ask him nicely.

## What else?

- Schmerdle doesn't use the same word-list as real Wordle, he just uses an easy one pulled from NPM
- Schmerdle can't play the official Wordle of the Day (yet)
  - You can tell him it though, if you want (don't worry he wont cheat)
- Schmerdle treats all words equally and doesn't play favorites or do fancy things like "apply heuristics"
- Schmerdle plays "Hard Mode" style, 'cause that's all he knows

## How can I hang with Schmerdle, too?

1. Be cool, man
2. Clone him
3. Have `node` and `npm` on your computer
4. `npm install`
5. Interact like so:
   1. Let him play a random game
    ```
    node src/index.js --verbose
    ```
   2. Give him a word to play
    ```
    node src/index.js --word shall --verbose
    ```
   3. Replay a game of yours
    ```
    node src/index.js --replay audio,steam,shark,shawl,shall --word shall --verbose
    ```

Here's an example:
```
node src/index.js --verbose

🤔 imago
⬜⬜⬜⬜⬜
💀 i,m,a,g,o
🗃️  1851
[
  'becke', 'becks', 'bedel', 'bedes', 'bedew', 'bedye', 'beech',
  'beefs', 'beefy', 'beeps', 'beers', 'beery', 'beets', 'belch',
  'belee', 'belle', 'bells', 'belly', 'belts', 'bench', 'bends',
  'bendy', 'benes', 'benet', 'benne', 'benny', 'bents', 'benty',
  'beres', 'beret', 'berks', 'berry', 'berth', 'beryl', 'besee',
  'beses', 'beset', 'bests', 'beted', 'betel', 'betes', 'beths',
  'betty', 'bevel', 'bever', 'bevue', 'bevvy', 'bewet', 'bezel',
  'bezes', 'bhels', 'bhuts', 'blebs', 'bleed', 'bleep', 'blees',
  'blend', 'blent', 'blert', 'bless', 'blest', 'blets', 'bleys',
  'blubs', 'blude', 'bludy', 'blued', 'bluer', 'blues', 'bluet',
  'bluey', 'bluff', 'blunk', 'blunt', 'blurb', 'blurs', 'blurt',
  'blush', 'blype', 'brede', 'breds', 'breed', 'breer', 'brees',
  'brens', 'brent', 'brere', 'brers', 'breve', 'brews', 'breys',
  'brule', 'brunt', 'brush', 'brusk', 'brust', 'brute', 'bruts',
  'bubby', 'bubus',
  ... 1751 more items
]
-----
🤔 sexer
⬜🟨⬜🟩⬜
💀 i,m,a,g,o,s,x,r
🗃️  36
[
  'bleed', 'bleep', 'cheek', 'cheep',
  'cleek', 'cleep', 'cuvee', 'dweeb',
  'ebbed', 'ebbet', 'eched', 'effed',
  'elfed', 'elpee', 'ended', 'endew',
  'etwee', 'euked', 'ewked', 'fleet',
  'fuzee', 'kneed', 'kneel', 'lycee',
  'queen', 'theed', 'theek', 'tutee',
  'tweed', 'tweel', 'tween', 'tweet',
  'undee', 'wheel', 'wheen', 'wheep'
]
-----
🤔 ebbed
🟨⬜⬜🟩⬜
💀 i,m,a,g,o,s,x,r,b,d
🗃️  18
[
  'cheek', 'cheep', 'cleek',
  'cleep', 'cuvee', 'fleet',
  'fuzee', 'kneel', 'lycee',
  'queen', 'theek', 'tutee',
  'tweel', 'tween', 'tweet',
  'wheel', 'wheen', 'wheep'
]
-----
🤔 wheen
⬜⬜🟩🟩⬜
💀 i,m,a,g,o,s,x,r,b,d,w,h,n
🗃️  3
[ 'cleek', 'cleep', 'fleet' ]
-----
🤔 fleet
🟩🟩🟩🟩🟩
-----
Wordle ANY 5/6*

⬜⬜⬜⬜⬜
⬜🟨⬜🟩⬜
🟨⬜⬜🟩⬜
⬜⬜🟩🟩⬜
🟩🟩🟩🟩🟩

Wordle, schmerdle
```

Have fun!