// ---------------------------GLOBAL VARIABLES----------------------------------

// List of cards
const cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

// List of flipped cards that will be used in match logic
let flippedCards = [];

// How many flipped cards were correct matches
let matchedCards = 0;

let moves = 0;

let stars = 3;

let seconds = 0;

// Returns time in digital-clock format -- for timer
let timerTime = function(value) {
  if (value > 9) {
    return value;
  } else {
    return "0" + value;
  }
};

// Returns time in basic values --  for congrats-popup
let congratsTime = function (value) {
  return value;
};

let timer;

// ------------------------SECONDARY FUNCTIONS----------------------------------

// Searches for any matches and updates moves and stars
function matchLogic() {
  if (flippedCards.length === 2) {
    if (flippedCards[0].classList[2] === flippedCards[1].classList[2]) {
      correct();
    } else {
      wrong();
    }

  updateMoves();
  updateStars();
  }
}

// Runs if user makes a correct match
function correct(){
  flippedCards[0].classList.add('match');
  flippedCards[1].classList.add('match');
  matchedCards += 1;
  moves += 1;
  setTimeout(resetFlippedCards, 1000);
  win();
}

// Runs if user makes a wrong match
function wrong() {
  flippedCards[0].classList.add('wrong');
  flippedCards[1].classList.add('wrong');
  moves += 1;
  setTimeout(resetFlippedCards, 1000);
}

// Reveals popup and stops timer if user makes 8 correct matches
function win() {
  if (matchedCards === 8) {
    document.querySelector('.congrats-popup').style.display = 'flex';
    document.querySelector('.congrats-background').style.display = 'flex';

    document.querySelector('.congrats-seconds').innerHTML = congratsTime(seconds += 1 -1 % 60);
    document.querySelector('.congrats-minutes').innerHTML = congratsTime(parseInt(seconds / 60, 10));

    document.querySelector('.congrats-stars').innerText = stars;
    if (stars === 1) {
      document.querySelector('.congrats-stars-text').innerText = ' Star';
    } else {
      document.querySelector('.congrats-stars-text').innerText = ' Stars';
    }

    document.querySelector('.congrats-moves').innerText = moves;

    document.querySelector('.congrats-button').addEventListener('click', function() {
      window.location.reload(true);
    });

    clearInterval(timer);
  }
}

function updateMoves() {
  if (moves === 1) {
    document.querySelector('.moves-text').innerText = 'Move';
  } else {
    document.querySelector('.moves-text').innerText = 'Moves';
  }

  document.querySelector('.moves-number').innerText = moves.toString();
}

function updateStars() {
  if (moves > 0 && moves < 15) {
    stars = 3;
  } else if (moves >= 15 && moves <= 22) {
    document.querySelector('#star1').classList.remove('fa-star');
    stars = 2;
  } else if (moves > 22) {
    document.querySelector('#star2').classList.remove('fa-star');
    stars = 1;
  }
}

// Removes current pair of flipped cards if user makes a correct match
function resetFlippedCards() {
  if (flippedCards.length === 2) {
    if (flippedCards[0].classList[2] === flippedCards[1].classList[2]) {
      flippedCards = [];
    } else {
      // Removes classes from all cards if user makes a wrong match (correct matches are ignored).
      flippedCards[0].classList.remove('open', 'show', 'wrong');
      flippedCards[1].classList.remove('open', 'show', 'wrong');
      flippedCards = [];
    }
  }
}

// --------------------------PRIMARY FUNCTIONS----------------------------------

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Creates the cards
function createCard() {
  let shuffCards = shuffle(cards);

  shuffCards.forEach(function(card) {
    let cardItem = document.createElement('li');
    cardItem.setAttribute('class', 'card');
    cardItem.innerHTML = '<i class="card fa ' + card + '">';
    document.querySelector('.deck').appendChild(cardItem);
  });
}

// Flip cards on click and calls matchLogic()
function flipCard() {
  document.querySelector('.deck').addEventListener('click', function(event) {
    if (event.target.nodeName === 'I' && flippedCards.length < 2) {
      if (event.target.classList.contains('card') && event.target.classList.contains('open') && event.target.classList.contains('show')) {
        return;
      } else {
        event.target.classList.add('open', 'show');
        flippedCards.push(event.target);
        matchLogic();
      }
    }
  });
}

// Starts timer on first card flip
function startTimer() {
  let clicks = 0;
  document.querySelector('.deck').addEventListener('click', function(event) {
    if (event.target.nodeName === 'I') {
      clicks += 1;
      if (clicks === 1) {
        // Incraments seconds by 1 every 1 second and displays visual time output
        timer = setInterval(function() {
          document.querySelector('.timer-seconds').innerHTML = timerTime(seconds += 1 % 60);
          document.querySelector('.timer-minutes').innerHTML = timerTime(parseInt(seconds / 60, 10));
        }, 1000);
      }
    }
  });
}

// Reloads the game if the swirly icon is clicked
function swirlyIcon() {
  document.querySelector('.restart').addEventListener('click', function() {
    window.location.reload(true);
  });
}

// -------------------------CALL PRIMARY FUNCTIONS------------------------------

shuffle(cards);
createCard();
flipCard();
startTimer();
swirlyIcon();