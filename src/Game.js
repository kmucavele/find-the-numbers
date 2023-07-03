class Game {
    constructor(size, difficult, field, numbers, displayMissing,
                displayIncorrect, minElem, secElem) {
        this.matrix = new Matrix(size); // Matrix class
        this.numbers = numbers; // numbers elems from DOM, not numbers array
        this.displayM = new DisplayMatrix(this.matrix); // Display field class
        this.difficult = difficult; // boolean/numbers disappear if true
        this.field = field; // field elem from DOM
        this.counter = 0; // keeps track of the next numbers
        this.missingNums = (size * size); // number that weren't clicked yet
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
                if (this.checkIfDone()) {
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

