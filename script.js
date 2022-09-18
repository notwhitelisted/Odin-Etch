const context = canvas.getContext('2d');
const container = document.querySelector('container');

//Making Rows
function makeRow(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement('div');
        cell.innerText = (c + 1);
        container.appendChild(cell).className = 'grid-item';
    };
};

makeRows(16, 16);

//Making Columns

//Picking a Color
function pickColor() {
    let colors = document.querySelector('color').value;
    document.body.style.backgroundColor = colors;
}
const color = document.querySelector('color');
color.addEventListener('click', pickColor());

//Rainbow Color
const rainbow = document.querySelector('rainbow');


//Random Color
const random = document.querySelector('random');
random.addEventListener('click', () => { 
    Math.floor(Math.random() * 16777215);
})

//Eraser 
const eraser = document.querySelector('eraser');
eraser.addEventListener('click', () => {
    context.globalCompositeOperation = 'destination-out';
})

//Clear
const clear = document.querySelector('clear');
clear.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
})

const sizing = document.querySelector('sizing');