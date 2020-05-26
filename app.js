document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0


  // The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0, width, width+1,width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1,width*2+1],
    [width+1, width+2, width*2, width*2+1]
  ]

  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]

  const iTetromino = [
    [1, width+1,width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1,width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]
  // arrays with the layout design for the rotation of tetrominoes


const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

// tetromino will start from the square with index 4
let currentPosition = 4
let currentRotation = 0

// randomly slect a Tetromino and its first rotation
let random = Math.floor(Math.random()*theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]

//draw the tetromino
function draw() {
  console.log(current)
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino')
  })
}

//undraw the Tetromino
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino')
  })
}

// make the tetromino move down every second
timerId = setInterval(moveDown, 500)

//assign functions to keyCodes
function control(e) {
  if(e.keyCode === 37) {
    moveLeft()
  } else if (e.keyCode === 38) {
    rotate()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 40) {
    moveDown()
  }
}
document.addEventListener('keyup', control)

//move down function
function moveDown() {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

// freeze fucntion
function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    // start a new tetromino falling
    console.log(nextRandom)
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    console.log(nextRandom)
    draw()
    displayShape()
  }
}

//move the tetromino left, unless is at the edge or there is a blockage
function moveLeft() {
  undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -= 1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
}


//move the tetromino right, unless is at the edge or there is a blockage
function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

  if(!isAtRightEdge) currentPosition += 1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }
  draw()
}


//rotate the tetromino
function rotate() {
  undraw()
  currentRotation ++ // we use the increment operator to move down to the next item in our array, which is the layout we added for th ecurrent tetromino
  if(currentRotation === current.length) { //if the current rotation(index) gets to 4, make it go back to 0(the initial shape of that tetromino)
    currentRotation = 0
  }
  current = theTetrominoes[random][currentRotation] //if the above is false then we pass on the next shape for our tetromino
  draw()
}

// show up next tetromino in mini-grid display
const displaySquares= document.querySelectorAll('.mini-grid div') //we use querySelectorAll because we want all the divs in the mini-grid class 
const displayWidth = 4 // this tells our JS how big the width of our mini-grid is
let displayIndex = 0 // this tells JS to talk to the mini-grid only


//the Tetrominoes without rotation (the first shape of each tetromino)
const upNextTetrominoes = [
  [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
  [0, displayWidth, displayWidth+1,displayWidth*2+1], //zTetromino
  [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
  [0, 1, displayWidth, displayWidth+1], //oTetromino
  [1, displayWidth+1,displayWidth*2+1, displayWidth*3+1] //iTetromino
]

//display the shape in the mini-grid
function displayShape() {
  //remove any trace of a tetromino from the entire grid
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
  })
  upNextTetrominoes[nextRandom].forEach( index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
  })
}












})