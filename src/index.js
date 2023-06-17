const game = document.getElementById('game');

const words = [
    { en: 'have breakfast', gif: 'src/gifs/breakfast.gif' },
    { en: 'brush your teeth', gif: 'src/gifs/brush.gif' },
    { en: 'feed the dog', gif: 'src/gifs/feed.gif' },
    { en: 'chat to friends', gif: 'src/gifs/friends.gif' },
    { en: 'do my homework', gif: 'src/gifs/homework.gif' },
    { en: 'climb a tree', gif: 'src/gifs/tree.gif' },
    { en: 'play chess', gif: 'src/gifs/chess.gif' },
    { en: 'play the guitar', gif: 'src/gifs/guitar.gif' },
    { en: 'listen to music', gif: 'src/gifs/music.gif' },
    { en: 'take a photo', gif: 'src/gifs/photograph.gif' },
    { en: 'use a computer', gif: 'src/gifs/computer.gif' },
    { en: 'do gymnastics', gif: 'src/gifs/gymnastics.gif' },
    { en: 'litter', gif: 'src/gifs/littering.gif' },
    { en: 'build a sandcastle', gif: 'src/gifs/sandcastle.gif' },
    { en: 'stand on one leg', gif: 'src/gifs/standon.gif' },
    { en: 'watch TV', gif: 'src/gifs/tv.gif' },
    { en: 'touch toes', gif: 'src/gifs/touchtoes.gif' },
    { en: 'wear sunglasses', gif: 'src/gifs/sunglasses.gif' },

    // add more word pairs here with respective gif URLs
];

let chosenWords = [];
let foundPairs = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGame() {
    game.innerHTML = '';
    chosenWords = [];
    foundPairs = 0;

    // Create pairs of {type, value, id} and shuffle
    const pairs = words
        .map((wordPair, id) => [
            { type: 'text', value: wordPair.en, id },
            { type: 'gif', value: wordPair.gif, id },
        ])
        .flat();
    shuffleArray(pairs);

    for (let i = 0; i < pairs.length; i++) {
        let box = document.createElement('div');
        box.classList.add('box');

        if (pairs[i].type === 'gif') {
            let img = document.createElement('img');
            img.src = pairs[i].value;
            img.width = 640;
            img.height = 360;
            box.appendChild(img);
        } else {
            let word = document.createElement('p');
            word.innerText = pairs[i].value;
            box.appendChild(word);
        }

        box.addEventListener('click', () => {
            if (chosenWords.length === 0) {
                chosenWords.push({ box, id: pairs[i].id });
                box.style.opacity = '0.5';
            } else if (chosenWords.length === 1 && chosenWords[0].box !== box) {
                if (chosenWords[0].id === pairs[i].id) {
                    chosenWords.push({ box, id: pairs[i].id });
                    box.style.opacity = '0.5';
                    chosenWords.forEach(({ box }) => box.remove());
                    foundPairs++;
                    if (foundPairs === words.length) {
                        let winText = document.createElement('div');
                        winText.style.fontSize = '2rem';
                        winText.style.marginTop = '2rem';
                        winText.innerText = 'YOU WIN!';
                        game.appendChild(winText);
                    }
                } else {
                    createGame();
                }
                chosenWords = [];
            }
        });
        game.appendChild(box);
    }
}

createGame();
