class DisplayMatrix {
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
            for (let num of numbersHtmlElem) {
                this.hide(num);
            }
        }, 5000);
    }

    showAll = (numbersHtmlElem) => {
        setTimeout(() => {
            for (let num of numbersHtmlElem) {
                this.show(num);
            }
        }, 2000);
    }
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