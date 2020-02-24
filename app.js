function setUpNewGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const playAgainButton = document.querySelector('#play-again')
  const scoreDisplay = document.querySelector('#score-display')
  const cells = []


  let snake = [0, 1, 2, 3, 4, 5]
  // let snakeBody = 4  // each time snake eats, this needs to increase.  Think will just use snake now
  let food = 40
  let score = 0
  let playerScore = 0
  let snakeSpeed = 0


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div') //create a div in a variable of cell
    cell.classList.add('cell') //for each cell (div), add the class of cell
    // cell.innerHTML = i  // view grid numbers
    grid.appendChild(cell) //add the div's (each cell) to the div grid
    cells.push(cell)  //push each div (cell) into the cells array
  }
  console.log(cells)

  // Start Game & Move snake
  startButton.addEventListener('click', () => {
    scoreDisplay.innerHTML = ''
    foodGenerator()
    // create snake
    snake.forEach((segment) => {
      cells[segment].classList.add('snake')
    })
    //start snake moving code
  })


  // Think about refactoring this using a switch statement
  let startInterval
  let rightInterval
  let leftInterval
  let upInterval
  let downInterval

  // Snake Movement Keys Logic
  document.addEventListener('keydown', (event) => {
    // console.log(event.key) // how you identify the name of the key that has been pressed //new
    if (event.key === 'ArrowRight') {
      clearInterval(startInterval)
      clearInterval(leftInterval)
      clearInterval(downInterval)
      clearInterval(upInterval)
      clearInterval(rightInterval)
      rightInterval = setInterval(() => {
        if (snake === cells.length - 1) {
          return
        }

        for (let segment = snake.length - 1; segment >= 0; --segment) {
          cells[snake[segment]].classList.remove('snake')
          snake[segment] += 1
          cells[snake[segment]].classList.add('snake')
        }
      }, 200)
    }

    if (event.key === 'ArrowLeft') {
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(upInterval)
      clearInterval(leftInterval)
      leftInterval = setInterval(() => {
        if (snake === 0) {
          return
        }
        for (let segment = 0; segment < snake.length; segment++) {
          cells[snake[segment]].classList.remove('snake')
          snake[segment] -= 1
          cells[snake[segment]].classList.add('snake')
        }
      }, 200)
    }

    if (event.key === 'ArrowUp') {
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(leftInterval)
      clearInterval(upInterval)
      upInterval = setInterval(() => {
        if (snake < width) {
          return
        }
        for (let segment = 0; segment < snake.length; segment++) {
          cells[snake[segment]].classList.remove('snake')
          snake[segment] -= width
          cells[snake[segment]].classList.add('snake')
        }
      }, 200)
    }

    if (event.key === 'ArrowDown') {
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(upInterval)
      clearInterval(leftInterval)
      clearInterval(downInterval)
      downInterval = setInterval(() => {
        if (snake > cells.length - width - 1) {
          return
        }
        for (let segment = snake.length - 1; segment >= 0; --segment) {
          cells[snake[segment]].classList.remove('snake')
          snake[segment] += width
          cells[snake[segment]].classList.add('snake')
        }
      }, 200)
    }
  })


  //Eat food function
  //If the same cell has both the snake class (first cell) & the food class, then the food is eaten & the food class should be removed from that cell
  //The food fuunction should be called, which will generate new food
  //The length of the snake should grow by one cell
  //The playerScore should increase by 10 points
  //The speed of the snake should increase by x
  function eatFood() {
    if (cells.classList.contains('food') && cells.classList.contains('snake')) {
      snake.push(snake.length)
      // foodGenerator()
      playerScore += 10
      snakeSpeed += 100
    }
  }

  console.log(snake.length - 1)
  console.log(snake)
  console.log(playerScore)
  console.log(snakeSpeed)

  //Collision Detection Function
  //If the snake is minus 0 or greater than 399, then game should end
  //If snake in top row (0 to 19) or bottom row (380 to 399), then + or minus width should result in game end
  // If the snake hits itelf, then the game should end
  //if snake hits boundry, then stop - clearInterval(All)
  //if snake hits itself, then stop - clearInterval(All)
  //Game end Function should be called   
  // function collisionDetection() {
  //   if ((cells[randomCell()].classList.add('food')) === (cells[food].classList.contains('snake'))) {
  //     eatFood()
  //   } else if (code concerning boundy)
  // }



  //Food Function
  //There can only ever be one piece of food on the board at any one time
  //Food should be randomly placed on the game board, when the existing food has been removed
  //If the snake occupies a cell, then food cannot be placed on that cell
  //if ranndom cell class is blank, then add food class.  If not blank run random cell again
  function foodGenerator() {
    const randomFood = Math.floor(Math.random() * cells.length)
    cells[randomFood].classList.add('food')
    console.log(randomFood)
  }
  
  
  //End Game Function
  //Display Game Over sign
  //Display playerScore
  //Display Pay again button


  //Play again
  playAgainButton.addEventListener('click', () => {
  // call start game function
  })

}

window.addEventListener('DOMContentLoaded', setUpNewGame)