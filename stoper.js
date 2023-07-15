let isWorking = false, limit = false;
let seconds = JSON.parse(localStorage.getItem('seconds')) || 0; 
let milliseconds = JSON.parse(localStorage.getItem('milliseconds')) || 0;
let minutes = JSON.parse(localStorage.getItem('minutes')) || 0;
let millisecondstxt = '00', secondstxt = ':00:', minutestxt = '00';
let timeId;
let laps = JSON.parse(localStorage.getItem('laps')) || [];

actualTime();
lapsDisplay();

function lapsDisplay() {
    let htmlDisplay = '';
    laps.forEach((lap, i) => {
        htmlDisplay += `
        <div class='laps-button'>
            <p>Time${i + 1}: ${lap}</p>
            <button class='delete-button js-delete'>Delete</button>
        </div>
        `
    })
    document.querySelector('.js-times')
        .innerHTML = htmlDisplay;
    
    document.querySelectorAll('.js-delete')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                laps.splice(index, 1);
                lapsDisplay();
                localStorage.setItem('laps', JSON.stringify(laps));
            })
        } )
} 

document.querySelector('.lap-button')
    .addEventListener('click', () => {
        let lap = `${minutestxt}${secondstxt}${millisecondstxt}`;
        laps.push(lap);
        localStorage.setItem('laps', JSON.stringify(laps));
        lapsDisplay();
    });

function actualTime() {
    if (milliseconds < 10) {
        document.querySelector('.js-milliseconds')
        .innerHTML = `0${milliseconds}`;
        millisecondstxt = `0${milliseconds}`;
    } else {
        document.querySelector('.js-milliseconds')
        .innerHTML = `${milliseconds}`;
        millisecondstxt = `${milliseconds}`;
    }
    if (seconds < 10) {
        document.querySelector('.js-seconds')
        .innerHTML = `:0${seconds}:`;
        secondstxt = `:0${seconds}:`;
    } else {
        document.querySelector('.js-seconds')
        .innerHTML = `:${seconds}:`;
        secondstxt = `:${seconds}:`;
    }
    if (minutes < 10) {
        document.querySelector('.js-minutes')
        .innerHTML = `0${minutes}`;
        minutestxt = `0${minutes}`;
    } else {
        document.querySelector('.js-minutes')
        .innerHTML = `${minutes}`;
        minutestxt = `${minutes}`;
    }
}

function stoper() {
    if (!isWorking && !limit) {
        document.querySelector('.js-start-stop')
            .innerHTML = 'Stop';
        timeId = setInterval(() => {
            if (milliseconds === 99) {
                milliseconds = 0;
                seconds++;
                if (seconds === 59) {
                    minutes++;
                    seconds = 0;
                    if (minutes === 60) {
                        clearInterval(timeId);
                        limit = true;
                    }
                }
            } else {
                milliseconds++;
            }
            localStorage.setItem('milliseconds', milliseconds);
            localStorage.setItem('seconds', seconds);
            localStorage.setItem('minutes', minutes);
            actualTime();
        }, 10);
        isWorking = true;
    } else {
        clearInterval(timeId);
        document.querySelector('.js-start-stop')
            .innerHTML = 'Start';
        isWorking = false;
    }
}

document.querySelector('.js-start-stop')
    .addEventListener('click', stoper);

function reset() {
    clearInterval(timeId);
    document.querySelector('.js-start-stop')
        .innerHTML = 'Start';
    document.querySelector('.js-minutes')
        .innerHTML = '00';
    document.querySelector('.js-seconds')
        .innerHTML = ':00:';
    document.querySelector('.js-milliseconds')
        .innerHTML = '00';
    limit = false;
    isWorking = false;
    laps = [];
    lapsDisplay();
    localStorage.removeItem('laps');
    millisecondstxt = '00';
    secondstxt = ':00:';
    minutestxt = '00';
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    localStorage.setItem('milliseconds', milliseconds);
    localStorage.setItem('seconds', seconds);
    localStorage.setItem('minutes', minutes);
}

document.querySelector('.js-reset')
    .addEventListener('click', reset);