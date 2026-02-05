const board = document.getElementById('game-board');
const message = document.getElementById('message');
const cards = ['❤️', '🐻', '❤️', '🐻', '💕', '🎁', '💕', '🎁'];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = cards[this.dataset.index];
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    if (flippedCards[0].textContent === flippedCards[1].textContent) {
        flippedCards.forEach(card => card.classList.add('matched'));
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            message.textContent = "You won! Happy Valentine's Day! 💕";
        }
    } else {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.textContent = '';
        });
    }
    flippedCards = [];
}

createBoard();