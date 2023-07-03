/* Source for stopwatch logic:
https://dev.to/gspteck/create-a-stopwatch-in-javascript-2mak
*/
class Stopwatch {
    constructor(minElem, secElem) {
        this.secElem = secElem;
        this.minElem = minElem;
        this.min = '0';
        this.sec = '0';
        this.haltTimer = true;
    }

    startTime = () => {
        if (this.haltTimer === true) {
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
        if (this.haltTimer === false) {
            this.min = parseInt(this.min);
            this.sec = parseInt(this.sec);

            console.log(this.sec);

            // after every second the sec var is incremented by one
            ++this.sec;

            if (this.sec === 60) {
                // when sec hits 60, it's reset and min is incremented by one
                ++this.min;
                this.sec = 0;
            }

            // reset the timer after one hour
            if (this.min === 60) {
                this.min = 0;
            }

            if (this.sec < 10 || this.sec === 0) {
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