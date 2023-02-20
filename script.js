'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player1El = document.querySelector('.player--1');
const player0El = document.querySelector('.player--0');


const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;

// Starting conditions
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    diceEl.classList.add('hidden');

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    document.querySelector('.winner--0').classList.add('hidden');
    document.querySelector('.winner--1').classList.add('hidden');
}

init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if(playing){
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${dice}.png`;

        // 3. Check the rolled dice 1: if true , switch to next player
        if(dice !== 1){
            // Add dice to the current
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } 
        else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if(playing){
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score >= 100
        if(scores[activePlayer] >= 100){
            // Finish the game
            playing = false;
            document.querySelector(`.winner--${activePlayer}`).classList.add('winner');
            document.querySelector(`.winner--${activePlayer}`).classList.remove('hidden');
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            // 3. Switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
