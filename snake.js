function gameSetup() {
  //Grid Variables (Game Board)
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const playAgainButton = document.querySelector('#play-again')
  const scoreDisplay = document.querySelector('#score-display')
  const cells = []

  // Game Variables
  let snake = []
  let snakeBody = 4  // each time sanke eats, this needs to increase
  let food = 219
  let playerScore = 0
  let snakeSpeed = 0


  //Create Grid (Game Board)
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.id = i + 1
    // cell.innerHTML = i  // view grid numbers
    grid.appendChild(cell)
    cells.push(cell)
  }


  //Start the game and set the board up
  //Code will be linked to startButton
  //Board should have the food placed randomly
  //The snake started at a fixed or random position and four cells in length
  startButton.addEventListener('click', () => {
    foodGenerator()
    cells[snake].classList.add('snake')
    //function to make the snake move
  })


  // // Generate snake
  // create snake
  for (let i = 0; i < snakeBody; i++) {
    snake.push(i)
    cells[snake[i]].classList.add('snake')
  }


  //Snake creation and movement code
  //Not sure if that will be in a function at the moment, but likley to be
  //The snake is always moving forward
  // cells[190].style.background = 'red'
  // cells[snake].classList.add('snake')
  // snake.pop()
  // snake.unshift(snakeHead)
  // for (let i = 3; i >= 0; i -- ) {
  //   snake.push( { x: i, y: 0 })
  // }

  //Player control of snake
  //The snake can be moved up, down left and right usiing the arrow keys
  //Snake to move right is += 1, left -= 1, up += width & down -= width
  //if (snake === 0) { return } - can't move out of grid on the left first cell
  //if (snake > cells.length - width - 1) { return } - can't move out of grid on the right last cell
  //if (snake === 399) { return } - can't move out of grid
  //if (snake < width) { return } - can't move out of grid on the top row
  //if (snake > cells.length - width - 1) { return } - can't move out of grid on the bottom row
  //if (snake > cells.length - width - 1) { return } - can't move out of grid on the right row
  //if (snake > cells.length - width - 1) { return } - can't move out of grid on the left row
  document.addEventListener('keydown', (event) => {
    console.log(event.key) // how you identify the name of the key that has been pressed //new
    if (event.key === 'ArrowRight') {
      if (snake === cells.length - 1) {
        return
      }
      cells[snake].classList.remove('snake')
      snake += 1
      cells[snake].classList.add('snake')
    } else if (event.key === 'ArrowLeft') {
      if (snake === 0) {
        return
      }
      cells[snake].classList.remove('snake')
      snake -= 1
      cells[snake].classList.add('snake')
    } else if (event.key === 'ArrowUp') {
      if (snake < width) {
        return
      }
      cells[snake].classList.remove('snake')
      snake -= width
      cells[snake].classList.add('snake')
    } else if (event.key === 'ArrowDown') {
      if (snake > cells.length - width - 1) {
        return
      }
      cells[snake].classList.remove('snake')
      snake += width
      cells[snake].classList.add('snake')
    }
  })

  //Create Random cell Number
  function randomCell() {
    const randomNumber = Math.floor(Math.random() * cells.length)
    // const randomNumber = 18 //to test out function
    console.log(randomNumber)
    return randomNumber
  }
  // randomCell()
  // console.log(randomCell())


  //Food Function
  //There can only ever be one piece of food on the board at any one time
  //Food should be randomly placed on the game board, when the existing food has been removed
  //If the snake occupies a cell, then food cannot be placed on that cell
  //if ranndom cell class is blank, then add food class.  If not blank run random cell again
  function foodGenerator() {
    if (cells[randomCell()].classList.contains('snake')) { //don't think this works properly.  i.e. doesn't prevent food being randomly put in a cell if snake is already on that cell.  How would I de-bug this?
      randomCell()
    }
    (cells[randomCell()].classList.add('food'))
  }


  //Eat food function
  //If the same cell has both the snake class (first cell) & the food class, then the food is eaten & the food class should be removed from that cell
  //The food fuunction should be called, which will generate new food
  //The length of the snake should grow by one cell
  //The playerScore should increase by 10 points
  //The speed of the snake should increase by x
  function eatFood() {
    if (cells.classList.contains('food') && cells.classList.contains('snake')) {
      snake.push('body') //need to add body to snake
      foodGenerator()
      playerScore += 10
      snakeSpeed += 100
    }

  }


  //Collision Detection Function
  //If the same cell has both the snake class (first cell) & the food class, then the food is eaten & the food class should be removed from that cell
  //If the snake is minus 0 or greater than 399, then game should end
  //If snake in top row (0 to 19) or bottom row (380 to 399), then + or minus width should result in game end
  //Game end Function should be called   
  // function collisionDetection() {
  //   if ((cells[randomCell()].classList.add('food')) === (cells[food].classList.contains('snake'))) {
  //     eatFood()
  //   } else if (code concerning boundy)
  // }


  //End Game Function
  //Display Game Over sign
  //Display playerScore
  //Display Pay again button


  //Play again
  playAgainButton.addEventListener('click', () => {
    scoreDisplay.innerHTML = ''
    foodGenerator()
    cells[snake].classList.add('snake')
    //snake move function
  })

  console.log(cells)

}

window.addEventListener('DOMContentLoaded', gameSetup)