let base2 = document.querySelector('.base2');

createBoard2();

let mouseOn = false;
let colourValue;
let source = 'pick';
let slider = document.querySelector('.slider');
let sliderText = document.querySelector('.sliderText');
let submit = document.querySelector('#submit');
let colourButton = document.querySelector('#ColorInput');
let randomButton = document.querySelector('#random');
let greyScaleButton = document.querySelector('#greyScale');
let eraserButton = document.querySelector('#eraser');

main()

function main(){
    let boardSquare = document.querySelectorAll('.square');
    let clearButton = document.querySelector('#clear')
    let toggleGridButton = document.querySelector('#toggleGrid');
    sliderText.textContent = `${slider.value} x ${slider.value}`;
    boardSquare.forEach((element) => {
        element.addEventListener('mouseover', startDrawing); 
    });
    boardSquare.forEach(element => {
        element.addEventListener('click', activateBoard);
    });
    clearButton.addEventListener('click', clearBoard);
    toggleGridButton.addEventListener('click', toggleGrid);
    submit.addEventListener('click', remakeBoard);
    randomButton.addEventListener('click', randomColour);
    colourButton.addEventListener('click', pickColour);
    greyScaleButton.addEventListener('click', greyScale);
    eraserButton.addEventListener('click', eraser);
}

// Create grid for board
function createBoard2(length) {
    if (length == undefined) {
        length = 16;
    }  
    const board2 = document.createElement('div');
    board2.classList = 'board2';
    board2.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
    base2.appendChild(board2);

    for (let i = 0; i < length * length; i++) {
        const square = document.createElement('div');
        square.classList.add('square', 'grid');
        square.setAttribute('id', `square${i}`);
        square.style.padding = '0px';
        square.style.backgroundColor = '#ffffff';
        board2.appendChild(square);
    }
}

// Changes colour of square when moused over
function startDrawing(e) {
    if (!mouseOn) {
        return;
    }
    const squareActive = document.querySelector(`#${e.target.id}`);

    if (source == 'pick') {
        squareActive.classList.remove('grey');
        squareActive.style.backgroundColor = `${colourButton.value}`;
    }
    else if (source == 'random') {
        squareActive.classList.remove('grey');
        let randColour = Math.round(0xffffff * Math.random()).toString(16);
        squareActive.style.backgroundColor = `#${randColour}`;
    }
    else if (source == 'grey') {
        let squareClass = squareActive.getAttribute('class');
        if (squareActive.style.backgroundColor.match(/rgba/)) {
            let opacity = +(squareActive.style.backgroundColor.slice(-4, -1));
            if (opacity <= 0.9) {
                squareActive.classList.add('grey');
                squareActive.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`;
            }
        }
        else if (squareClass.includes('grey') && squareActive.style.backgroundColor == 'rgb(0, 0, 0)') {
            return;
        }
        else {
            squareActive.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
    }
    else if (source == 'white') {
        squareActive.classList.remove('grey')
        squareActive.style.backgroundColor = '#ffffff';
    }
}

// Turns the mouse on 
function activateBoard() {
    if (mouseOn) {
        mouseOn = false;
    }
    else {
        mouseOn = true;
    }
}

// Wipes the board
function clearBoard() {
    let boardSquare = document.querySelectorAll('.square');
    boardSquare.forEach(element => {
        element.style.backgroundColor = '#ffffff';
    });
}

// Turn the grid lines on or off
function toggleGrid() {
    let boardSquare = document.querySelectorAll('.square');
    boardSquare.forEach(element => {
        element.classList.toggle('grid');
    });
}

slider.oninput = function() {
    sliderText.textContent = `${this.value} x ${this.value}`;
}

colourButton.oninput = function() {
    colourValue = colourButton.value;
}

// Creates board size specified by slider
function remakeBoard() {
    const board2 = document.querySelector('.board2');
    base2.removeChild(board2);
    createBoard2(slider.value);
    let boardSquare = document.querySelectorAll('.square');
    boardSquare.forEach((element) => {
        element.addEventListener('mouseover', startDrawing); 
    });
    boardSquare.forEach(element => {
        element.addEventListener('click', activateBoard);
    });
}

function randomColour() {
    source = 'random';
}

function pickColour() {
    source = 'pick';
}

function greyScale() {
    source = 'grey';
}

function eraser() {
    source = 'white';
}
