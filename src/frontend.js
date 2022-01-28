/* Source for stopwatch logic:
https://dev.to/gspteck/create-a-stopwatch-in-javascript-2mak
*/
class Stopwatch{
    constructor(minElem, secElem) {
        this.secElem = secElem;
        this.minElem = minElem;
        this.min = '0';
        this.sec = '0';
        this.haltTimer = true;
    }

     startTime = () => {
        if(this.haltTimer === true){
            this.haltTimer = false;
            this.timerCycle();
        }
    }

     stopTime = () => {
        if (this.haltTimer === false) {
            this.haltTimer = true;
        }
    }

     resetTime = () => {
        this.min = 0;
        this.sec = 0;
        this.minElem.innerHTML = '00'; // DOM for minutes
        this.secElem.innerHTML = '00'; // DOM for seconds
    }

     timerCycle = () => {
        // convert time digits to numbers
        if(this.haltTimer === false){
            this.min = parseInt(this.min);
            this.sec = parseInt(this.sec);

            console.log(this.sec);

            // after every second the sec var is incremented by one
            ++this.sec;

            if(this.sec === 60){
                // when sec hits 60, it's reset and min is incremented by one
                ++this.min;
                this.sec = 0;
            }

            // reset the timer after one hour
            if(this.min === 60){
                this.min = 0;
            }

            if(this.sec < 10 || this.sec === 0){
                this.sec = '0' + this.sec;
            }

            if (this.min < 10 || this.min === 0) {
                this.min = '0' + this.min;
            }

            // DOM Mapping for the stopwatch digits
            this.minElem.innerHTML = this.min; // DOM for minutes
            this.secElem.innerHTML = this.sec; // DOM for seconds

            setTimeout(this.timerCycle, 1000);

        }
    }
}

class Matrix {
    constructor(size) {
        this.size = size;
        this.rangeMax = Math.pow(size,2);
        this.numbers = [...Array(this.rangeMax).keys()];
        this.shuffledNums = [...Array(this.rangeMax).keys()];
    }
    
    getSize(){
        return this.size;
    }

    shuffle = () => {
        const listLen = this.shuffledNums.length;
        for (let i = 0; i < listLen; i++){
            let b = Math.floor(Math.random() * (listLen - 1));

            let tmp = this.shuffledNums[i];
            this.shuffledNums[i] = this.shuffledNums[b];
            this.shuffledNums[b] = tmp;
        }
        return this.shuffledNums;
    }
}

class DisplayMatrix{
    constructor(matrix) {
        this.matrix = matrix;
    }
    
    display = () => {
        // set grid template according to matrix size
        field.style.gridTemplateColumns = `repeat(${this.matrix.getSize()}, 1fr)`;
        // creates a tile for every number in the list
        return this.matrix.shuffledNums.map(num => {
            return `<div class="tile">
                        <div class="number" >${num}</div>
                    </div>`;
        }).join(''); // join = [...] -> '...'
    }
    
    hide = (elem) => elem.classList.add('hide');
    
    show = (elem) => {
        elem.classList.remove('hide');
        elem.classList.add('show');
    }
    
    markRed = (elem) => {
        elem.classList.add('wrong');
    }
    
    hideAll = (numbersHtmlElem) => {
        setTimeout(() => {
            for(let num of numbersHtmlElem){
                this.hide(num);
            }
        },5000);
    }
    
    showAll = (numbersHtmlElem) => {
        setTimeout(() => {
            for(let num of numbersHtmlElem){
                this.show(num);
            }
        },2000);
    }

}

class Game {
    constructor(size, difficult, field, numbers, displayMissing,
                displayIncorrect, minElem, secElem) {
        this.matrix = new Matrix(size); // Matrix class
        this.numbers = numbers; // numbers elems from DOM, not numbers array
        this.displayM = new DisplayMatrix(this.matrix); // Display field class
        this.difficult = difficult; // boolean/numbers disappear if true 
        this.field = field; // field elem from DOM
        this.counter = 0; // keeps track of the next numbers
        this.missingNums = (size*size); // number that weren't clicked yet
        this.displayMissing = displayMissing; // shows missing Nums in DOM
        this.displayIncorrect = displayIncorrect; // display falsely clicked nums in DOM
        this.incorrectNums = 0;
        this.stopwatch = new Stopwatch(minElem, secElem);
        this.stopwatch.startTime();
    }

    // Display Methods
    showPlayground = () => {
        this.field.innerHTML = this.displayM.display();
        if (this.difficult) {
            this.displayM.hideAll(this.numbers);
        } else {
            this.field.innerHTML = this.displayM.display();
        }
    }
    
    showMissingNumbers = () => {
        this.displayMissing.innerHTML = this.missingNums;
    }    
    
    updateMissingNum = () => --this.missingNums;

    showIncorrect = () => {
        this.displayIncorrect.innerHTML = this.incorrectNums;
    }

    updateIncorrect = () => ++this.incorrectNums;
    
    reveal = () => {
        this.displayM.showAll(this.numbers);
    }

    // Logic Methods
    checkSelected = selected => {
        return selected === this.matrix.numbers[this.counter];
    }
     
    checkIfDone = () => {
/*        this.stopwatch.stopTime();
        this.stopwatch.resetTime();*/
        return this.matrix.rangeMax === this.counter;
    }

    selectElem = () => {
        for (let elem of this.numbers) {
            elem.addEventListener('click', () => {
                const elemValue = parseInt(elem.innerHTML);
                if (this.checkSelected(elemValue)) {
                    this.updateMissingNum();
                    ++this.counter;
                    if (this.difficult) {
                        this.displayM.show(elem);
                    } else {
                        this.displayM.hide(elem);
                    }
                } else {
                    this.updateIncorrect();
                    this.displayM.markRed(elem);
                }
                if(this.checkIfDone()){
                    console.log('Done')
                    this.stopwatch.stopTime();
                    this.stopwatch.resetTime();
                    this.reveal();
                }
                this.showMissingNumbers();
                this.showIncorrect();
            });
        }
    }
}

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

function startGame(){
    const findNums = new Game(setSize.value, selectDifficulty.checked, field, allNumbers,
        missing, incorrect, minElem, secElem);

    findNums.matrix.shuffle();
    findNums.showPlayground();
    findNums.selectElem();
}