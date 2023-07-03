class Matrix {
    constructor(size) {
        this.size = size;
        this.rangeMax = Math.pow(size, 2);
        this.numbers = [...Array(this.rangeMax).keys()];
        this.shuffledNums = [...Array(this.rangeMax).keys()];
    }

    getSize() {
        return this.size;
    }

    shuffle = () => {
        const listLen = this.shuffledNums.length;
        for (let i = 0; i < listLen; i++) {
            let b = Math.floor(Math.random() * (listLen - 1));

            let tmp = this.shuffledNums[i];
            this.shuffledNums[i] = this.shuffledNums[b];
            this.shuffledNums[b] = tmp;
        }
        return this.shuffledNums;
    }
}