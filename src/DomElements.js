// DOM ELEMENTS
// main field
const field = document.querySelector('#field');
const allNumbers = document.getElementsByClassName('number');
const missing = document.querySelector('#missing-numbers');
const incorrect = document.querySelector('#wrong-numbers');
const setSize = document.querySelector('#size');
const selectDifficulty = document.querySelector('input[name="difficulty"]');
const play = document.querySelector('#play');

// Stopwatch Dom Elements
const minElem = document.getElementById('min');
const secElem = document.getElementById('sec');

play.onclick = () => startGame();

function startGame() {
    const findNums = new Game(setSize.value, selectDifficulty.checked, field, allNumbers,
        missing, incorrect, minElem, secElem);

    findNums.matrix.shuffle();
    findNums.showPlayground();
    findNums.selectElem();
}