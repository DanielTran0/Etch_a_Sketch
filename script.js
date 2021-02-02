let base = document.querySelector('.base');
createBoard();

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
function createBoard(length) {
    if (length == undefined) {
        length = 16;
    }
    const boardSize = 500;
    let squareHeight = boardSize / length;
    let squareWidth = 1 / length * 100;   
    const board = document.createElement('div');
    board.classList.add('board', 'container-fluid');
    base.appendChild(board);

    for (let i = 0; i < length; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        board.appendChild(row);

        for (let j = 0; j < length; j++) {
            const square = document.createElement('div');
            square.classList.add('square', 'grid');
            square.setAttribute('id', `square${i}-${j}`);
            square.style.padding = '0px';
            square.style.height = `${squareHeight}px`;
            square.style.width = `${squareWidth}%`;
            square.style.backgroundColor = '#ffffff';
            row.appendChild(square);
        }
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
        console.log(squareActive.style.backgroundColor)
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
    const board = document.querySelector('.board');
    base.removeChild(board);
    createBoard(slider.value);
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

