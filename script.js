const defaultColor = '#62addf'
const defaultMode = 'color'
const defaultSize = 16

let currentColor = defaultColor
let currentMode = defaultMode
let currentSize = defaultSize

//Variables Declarations
const colorPicker = document.querySelector('.colorPicker');
const colorBtn = document.querySelector('.color');
const rainbowBtn = document.querySelector('.rainbow');
//const randomBtn = document.querySelector('.random');
const eraserBtn = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear');
const sizeValue = document.querySelector('.sizeValue');
const sizeSlider = document.querySelector('.sizeSlider');
const grid = document.querySelector('.grid');

//DOM Manipulation
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
//randomBtn.onclick = () => setCurrentMode('random')
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//Functions
function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function clearGrid() {
    grid.innerHTML = ''
}

function reloadGrid() {
    clearGrid()
    makeGrid(currentSize)
}

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function makeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', pickColor())
        gridElement.addEventListener('mousedown', pickColor())
        grid.appendChild(gridElement)
    }
} 

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})` 
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

//function randomColor() {

//}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active') 
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active') 
    } else if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }
}

window.onload = () => {
    makeGrid(defaultSize)
    activateButton(defaultMode)
}
// //Picking a Color Function
// function pickColor() {
//     let colors = document.querySelector('color').value;
//     document.body.style.backgroundColor = colors;
// }
// color.addEventListener('click', pickColor());

// //Rainbow Color


// //Random Color
// random.addEventListener('click', () => { 
//     Math.floor(Math.random() * 16777215);
// })

// //Eraser 
// eraser.addEventListener('click', () => {
//     context.globalCompositeOperation = 'destination-out';
// })

// //Clear
// clear.addEventListener('click', () => {
//     context.clearRect(0, 0, canvas.width, canvas.height);
// })