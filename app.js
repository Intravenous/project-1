function setUpNewGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const playAgainButton = document.querySelector('#play-again')
  const scoreDisplay = document.querySelector('#score-display')
  const cells = []
  let snakeDirection = ''

  let food
  let snake = [22, 23, 24, 25, 26]
  let playerScore = 0



  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    // cell.innerHTML = i  // view grid numbers
    grid.appendChild(cell)
    cells.push(cell)
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

  // Snake Collision Detection
  // If the snake hits itelf, then the game should end
  // when the statement is true, the snake has hit itself and so i need to end the game from there
  const snakeAttack = function () {
    console.log(cells[snake[snake.length - 1]])
    console.log((new Set(snake).size) !== snake.length)
    if ((new Set(snake).size) !== snake.length) {
      console.log('Is this working?')
      gameOver()
    }
  }

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
    return
  }

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
  // const snakeDirection = ['right', 'left', 'up', 'down']
  let direction

  // Snake Movement Keys Logic
  //BUG -  SHOULD NOT BE ABLE TO GO BACK ON YOURSELF
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (snakeDirection === 'left') {
        return
      }
      snakeDirection = 'right'
      // direction = snakeDirection[0]
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
        snakeAttack()
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowLeft') {

      if (snakeDirection === 'right') {
        return
      }
      // if (event.key === 'ArrowLeft') && (snakeDirection === 'right') {
      //     return
      //   }
      snakeDirection = 'left'
      // direction = snakeDirection[1]
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
        snakeAttack()
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowUp') {



      if (snakeDirection === 'down') {
        return
      }

      snakeDirection = 'up'
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
        snakeAttack()
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowDown') {

      if (snakeDirection === 'up') {
        return
      }
      // direction = snakeDirection[3]
      snakeDirection = 'down'
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
        snakeAttack()
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
      setIntervalSnakeSpeed -= 10
      playerScore += 10
      scoreDisplay.innerHTML = playerScore
    }
  }, 100)


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




  //Play again
  playAgainButton.addEventListener('click', () => {
    // startButton()
  })

  // console.log(cells)

}

window.addEventListener('DOMContentLoaded', setUpNewGame)