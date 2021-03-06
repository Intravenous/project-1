function setUpNewGame() {
  const width = 10 //original 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const scoreDisplay = document.querySelector('#score-display')
  const cells = []
  let snakeDirection = ''

  //Sounds
  // munch.volume between 0 - 1 - to change vol levels
  const munch = new Audio()
  munch.src = 'sounds/Cartoon-crunching-bite.mp3'
  const gameOverSound = new Audio()
  gameOverSound.src = 'sounds/game-over-arcade.wav'
  const themeTune = new Audio() //Main Theme (freesound)
  themeTune.src = 'sounds/main-theme.mp3'
  themeTune.loop = true
  

  let food
  const snake = [22, 23] //original 5 long
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
    startButton.style.display = 'none'
    scoreDisplay.innerHTML = 0
    foodGenerator()
    snake.forEach((segment) => {
      cells[segment].classList.add('snake')
    })
  })
  // }

  // Snake wall logic - To Do later for snake 1
  // Left wall is true if the head of the snake is divisible by width. e.g if the snakehead is 42 then / 21 = true
  // const leftWall = cells[snake[snake.length - 1]] % width === 0
  // Right wall is true if snakehead in array is divisible by width and leaves a remainder of width -1 (because width array starts at 0) 
  // const rightWall = cells[snake[snake.length - 1]] % width === width - 1  

  // Movement variables
  // Think about refactoring this using a switch statement
  let startInterval
  let rightInterval
  let leftInterval
  let upInterval
  let downInterval
  let setIntervalSnakeSpeed = 200

  // Snake Movement Keys Logic
  document.addEventListener('keydown', (event) => {
    themeTune.play()
    if (event.key === 'ArrowRight') {
      if (snakeDirection === 'left') {
        return
      }
      snakeDirection = 'right'
      clearInterval(startInterval)
      clearInterval(leftInterval)
      clearInterval(downInterval)
      clearInterval(upInterval)
      clearInterval(rightInterval)
      rightInterval = setInterval(() => {
        if (snake[snake.length - 1] % width === width - 1) { //here
          cells[snake[0]].classList.remove('snake')
          for (let segment = 0; segment < snake.length - 1; segment++) {
            snake[segment] = snake[segment + 1]
            cells[snake[segment]].classList.add('snake')
          }
          snake[snake.length - 1] -= width - 1
          cells[snake[snake.length - 1]].classList.add('snake')
        } else {
          cells[snake[0]].classList.remove('snake')
          for (let segment = 0; segment < snake.length - 1; segment++) {
            snake[segment] = snake[segment + 1]
            cells[snake[segment]].classList.add('snake')
          }
          snake[snake.length - 1] += 1
          cells[snake[snake.length - 1]].classList.add('snake')
          snakeAttack()
        }
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowLeft') {
      if (snakeDirection === 'right') {
        return
      }
      snakeDirection = 'left'
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(upInterval)
      clearInterval(leftInterval)
      leftInterval = setInterval(() => {
        if (snake[snake.length - 1] % width === 0) { // width === x position //here removed -1
          cells[snake[0]].classList.remove('snake')
          for (let segment = 0; segment < snake.length - 1; segment++) {
            snake[segment] = snake[segment + 1]
            cells[snake[segment]].classList.add('snake')
          }
          snake[snake.length - 1] += width - 1  //here removed -1
          cells[snake[snake.length - 1]].classList.add('snake')
          // console.log(snake)
        } else {
          cells[snake[0]].classList.remove('snake')
          for (let segment = 0; segment < snake.length - 1; segment++) {
            snake[segment] = snake[segment + 1]
            cells[snake[segment]].classList.add('snake')
          }
          snake[snake.length - 1] -= 1 //change to minus from plus
          cells[snake[snake.length - 1]].classList.add('snake')
          snakeAttack()
        }
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowUp') {
      if (snakeDirection === 'down') {
        return
      }
      snakeDirection = 'up'
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(leftInterval)
      clearInterval(upInterval)
      upInterval = setInterval(() => {

        if (snake[snake.length - 1] <= 9) { //original 19
          cells[snake[0]].classList.remove('snake')
          for (let segment = 0; segment < snake.length - 1; segment++) {
            snake[segment] = snake[segment + 1]
            cells[snake[segment]].classList.add('snake')
          }
          snake[snake.length - 1] += 90  //original 380
          cells[snake[snake.length - 1]].classList.add('snake')
        } else {
          cells[snake[0]].classList.remove('snake')
          for (let segment = 0; segment < snake.length - 1; segment++) {
            snake[segment] = snake[segment + 1]
            cells[snake[segment]].classList.add('snake')
          }
          snake[snake.length - 1] -= width
          cells[snake[snake.length - 1]].classList.add('snake')
          snakeAttack()
        }
      }, setIntervalSnakeSpeed)
    }

    if (event.key === 'ArrowDown') {
      if (snakeDirection === 'up') {
        return
      }
      snakeDirection = 'down'
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(upInterval)
      clearInterval(leftInterval)
      clearInterval(downInterval)
      downInterval = setInterval(() => {
        if (snake[snake.length - 1] >= 90) { //original 380
          cells[snake[0]].classList.remove('snake')
          for (let segment = 0; segment < snake.length - 1; segment++) {
            snake[segment] = snake[segment + 1]
            cells[snake[segment]].classList.add('snake')
          }
          snake[snake.length - 1] -= 90  //original 380
          cells[snake[snake.length - 1]].classList.add('snake')
          // console.log(snake)
        } else {
          cells[snake[0]].classList.remove('snake')
          for (let segment = 0; segment < snake.length - 1; segment++) {
            snake[segment] = snake[segment + 1]
            cells[snake[segment]].classList.add('snake')
          }
          snake[snake.length - 1] += width
          cells[snake[snake.length - 1]].classList.add('snake')
          snakeAttack()
        }
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
      munch.play()
      foodGenerator()
      setIntervalSnakeSpeed -= 5
      playerScore += 10
      scoreDisplay.innerHTML = playerScore
    }
  }, 30)

  // Snake Collision Detection
  // If the snake hits itelf, then the game should end
  // When the statement is true, the snake has hit itself and so game ends
  const snakeAttack = function () {
    console.log(cells[snake[snake.length - 1]])
    console.log((new Set(snake).size) !== snake.length)
    if ((new Set(snake).size) !== snake.length) {
      gameOverSound.play()
      themeTune.pause()
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
    location.reload()
    return
  }

}

window.addEventListener('DOMContentLoaded', setUpNewGame)