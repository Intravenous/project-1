function gameSetup() {
  //Grid Variables (Game Board)
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const cells = []

  // Game Variables
  // let snake = [{ x: 0, y: 1 }]
  let snake = 0
  let food = 219
  let playerScore = 0
  let snakeSpeed = 0



  //Create Grid (Game Board)
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.innerHTML = i  // view grid numbers
    grid.appendChild(cell)
    cells.push(cell)
  }

  //Create Random cell Number
  function randomCell() {
    const randomNumber = Math.floor(Math.random() * cells.length)
    // const randomNumber = 18 //to test out function
    console.log(randomNumber)
    return randomNumber
  }
  // randomCell()
  // console.log(randomCell())

  console.log(snake)


  //Start the game and set the board up
  //Code will be linked to startButton
  //Board should have the food placed randomly
  //The snake started at a fixed or random position and four cells in length
  startButton.addEventListener('click', () => {
    foodGenerator()
    cells[snake].classList.add('snake')
  })

  //Snake creation and movement code
  //Not sure if that will be in a function at the moment, but likley to be
  //The snake is always moving forward
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
    // console.log(event.key) // how you identify the name of the key that has been pressed //new
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

  //Food Function
  //There can only ever be one piece of food on the board at any one time
  //Food should be randomly placed on the game board, when the existing food has been removed
  //If the snake occupies a cell, then food cannot be placed on that cell
  function foodGenerator() {
    if (cells[food].classList.contains('snake')) { //don't think this works properly.  i.e. doesn't prevent food being randomly put in a cell if snake is already on that cell
      return
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
    foodGenerator()
    snake.push('body') //need to add body to snake
    playerScore += 10
    snakeSpeed += 100
  }


  //Collision Detection Function
  //If the same cell has both the snake class (first cell) & the food class, then the food is eaten & the food class should be removed from that cell
  //If the snake is minus 0 or greater than 399, then game should end
  //If snake in top row (0 to 19) or bottom row (380 to 399), then + or minus width should result in game end
  //Game end Function should be called   
  function collisionDetection() {
    if ((cells[randomCell()].classList.add('food')) === (cells[food].classList.contains('snake'))) {
      eatFood()
    } else if (code concerning boundy)
  }

  //End Game Function
  //Display Game Over sign
  //Display playerScore
  //Display Pay again button

  console.log(cells)

}

window.addEventListener('DOMContentLoaded', gameSetup)