function setUpNewGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const playAgainButton = document.querySelector('#play-again')
  const scoreDisplay = document.querySelector('#score-display')
  const cells = []


  let food
  let snake = [22, 23, 24, 25, 26]
  let playerScore = 0



  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div') //create a div in a variable of cell
    cell.classList.add('cell') //for each cell (div), add the class of cell
    // cell.innerHTML = i  // view grid numbers
    grid.appendChild(cell) //add the div's (each cell) to the div grid
    cells.push(cell)  //push each div (cell) into the cells array
  }

  // Start Game
  // function StartGame() { // How do I put this in a function so that it can be called by the playAgain button?
  startButton.addEventListener('click', () => {
    scoreDisplay.innerHTML = 0
    foodGenerator()
    snake.forEach((segment) => {
      cells[segment].classList.add('snake')
    })
    // cells[snake[snake.length - 1]].classList.add('snakeHead')
  })
  // }

  // console.log(cells[snake[snake.length - 1]])


  // when the statement is true, the snake has hit itself and so i need to end the game from there
  const snakeAttack = function () {

    console.log(cells[snake[snake.length - 1]])

    console.log((new Set(snake).size) !== snake.length)

    // snake.includes((element) => {
    //   if (cells[snake[snake.length - 1]] === element) {
    //     console.log('you have bumped into yourself you big eejit')
    //   }
  }
  //   )
  // }


  //Mike's example to show me working it.  Not required
  // setInterval (() => {
  // console.log((new Set(snake).size))
  // console.log(snake.length)
  // }, 500)


  // Think about refactoring this using a switch statement
  let startInterval
  let rightInterval
  let leftInterval
  let upInterval
  let downInterval
  let setIntervalSnakeSpeed = 200
  const snakeDirection = ['right', 'left', 'up', 'down']
  let direction

  // Snake Movement Keys Logic
  //BUG -  SHOULD NOT BE ABLE TO GO BACK ON YOURSELF
  document.addEventListener('keydown', (event) => {
    snakeAttack()
    if (event.key === 'ArrowRight') {
      if (snakeDirection === 'left') {
        return
      }
      direction = snakeDirection[0]
      // console.log(direction)
      clearInterval(startInterval)
      clearInterval(leftInterval)
      clearInterval(downInterval)
      clearInterval(upInterval)
      clearInterval(rightInterval)
      rightInterval = setInterval(() => {
        if (snake === cells.length - 1) {
          return
        } /////////////Below doesn't work
        // if (snake[snake.length - 1] === snake[snake.length - 1]) {
        //   console.log(snake)
        //   console.log('Game Over')
        // }

        cells[snake[0]].classList.remove('snake')
        for (let segment = 0; segment < snake.length - 1; segment++) {
          snake[segment] = snake[segment + 1]
          cells[snake[segment]].classList.add('snake')
        }
        snake[snake.length - 1] += 1
        cells[snake[snake.length - 1]].classList.add('snake')
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowLeft') {
      snakeAttack()
      if (snakeDirection === 'right') {
        return
      }
      // if (event.key === 'ArrowLeft') && (snakeDirection === 'right') {
      //     return
      //   }
      direction = snakeDirection[1]
      // console.log(direction)
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(upInterval)
      clearInterval(leftInterval)
      leftInterval = setInterval(() => {
        if (snake === 0) {
          return
        }

        cells[snake[0]].classList.remove('snake')
        for (let segment = 0; segment < snake.length - 1; segment++) {
          snake[segment] = snake[segment + 1]
          cells[snake[segment]].classList.add('snake')
        }
        snake[snake.length - 1] -= 1
        cells[snake[snake.length - 1]].classList.add('snake')
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowUp') {
      snakeAttack()
      direction = snakeDirection[2]
      // console.log(direction)
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(leftInterval)
      clearInterval(upInterval)
      upInterval = setInterval(() => {
        if (snake < width) {
          return
        }

        cells[snake[0]].classList.remove('snake')
        for (let segment = 0; segment < snake.length - 1; segment++) {
          snake[segment] = snake[segment + 1]
          cells[snake[segment]].classList.add('snake')
        }
        snake[snake.length - 1] -= width
        cells[snake[snake.length - 1]].classList.add('snake')
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowDown') {
      snakeAttack()
      direction = snakeDirection[3]
      // console.log(direction)
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(upInterval)
      clearInterval(leftInterval)
      clearInterval(downInterval)
      downInterval = setInterval(() => {
        if (snake > cells.length - width - 1) {
          return
        }

        cells[snake[0]].classList.remove('snake')
        for (let segment = 0; segment < snake.length - 1; segment++) {
          snake[segment] = snake[segment + 1]
          cells[snake[segment]].classList.add('snake')
        }
        snake[snake.length - 1] += width
        cells[snake[snake.length - 1]].classList.add('snake')
      }, setIntervalSnakeSpeed)
    }
  })

  //Food Function (Example of Recursion)
  function foodGenerator() {
    const randomFood = Math.floor(Math.random() * cells.length)
    if (cells[randomFood].classList.contains('snake')) {
      foodGenerator()
    } else {
      cells[randomFood].classList.add('food')
    }
    food = randomFood
  }

  //Eat food function
  setInterval(() => {
    if (cells[snake[snake.length - 1]].classList.contains('food')) {
      cells[snake[snake.length - 1]].classList.remove('food')
      snake.unshift(snake[0] - 1)
      foodGenerator()
      setIntervalSnakeSpeed -= 5
      playerScore += 10
      scoreDisplay.innerHTML = playerScore
    }
  }, 100)



  // if (snake[5] === snake.splice(1, -100).forEach(element) => {
  //   return element
  // })


  // console.log(snake.classList)
  // console.log(cells)

  // Collision Detection Snake
  // If the snake hits itelf, then the game should end
  // Snake head [0] needs to hit another cell whithin the snake
  // if (cells[snake[snake.length - 1]].classList.contains('snake')) {
  // // if (cells[snake[snake.length - 1]] === snake[0]) {
  //   console.log('Game Over')
  //   // gameOver()
  // }

  //Will likely introduce bugs for foodGen function as it does not cater for the class snakeHead & also snake direction logic i.e. arrowup and down
  // if (cells[snake[snake.length - 1]].classList.contains('snake')) {
  //   cells[snake[snake.length - 1]].classList.replace('snakeHead')
  // }


  //Collision Detection Wall
  //If the snake is minus 0 or greater than 399, then game should end
  //If snake in top row (0 to 19) or bottom row (380 to 399), then + or minus width should result in game end
  //if snake hits boundry, then stop - clearInterval(All)
  //if snake hits itself, then stop - clearInterval(All)
  //Game end Function should be called   
  // function collisionDetection() {
  //   if ((cells[randomCell()].classList.add('food')) === (cells[food].classList.contains('snake'))) {
  //     eatFood()
  //   } else if (code concerning boundy)
  // }

  // cells[snake[snake.length - 1].classList.add('snakeHead')
  // cells[snake[0]].classList.remove('snake')
  // cells[snake[0]].classList.remove('snake')




  //End Game Function
  //Display Game Over sign
  //Display Pay again button
  function gameOver() {
    clearInterval(startInterval)
    clearInterval(rightInterval)
    clearInterval(leftInterval)
    clearInterval(downInterval)
    clearInterval(upInterval)
    alert(`Game Over!! You Scored ${playerScore}`)
  }


  //Play again
  playAgainButton.addEventListener('click', () => {
    // startButton()
  })

}

window.addEventListener('DOMContentLoaded', setUpNewGame)