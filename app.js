function setUpNewGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const cells = []


  let snake = [4, 5, 6, 7, 8, 9]
  let snakeBody = 4  // each time sanke eats, this needs to increase
  let food = 40
  let score = 0


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div') //create a div in a variable of cell
    cell.classList.add('cell') //for each cell (div), add the class of cell
    // cell.innerHTML = i  // view grid numbers
    grid.appendChild(cell) //add the div's (each cell) to the div grid
    cells.push(cell)  //push each div (cell) into the cells array
  }
  console.log(cells)

  // create snake
  // for (let i = 0; i < snakeBody; i++) {
  //   snake.push(i)
  //   cells[snake[i]].classList.add('snake')
  // }


  snake.forEach((segment) => {
    cells[segment].classList.add('snake')
  })



  // move the snake
  // let snakeHead = snake.length
  // let snakeTail = snake[0]

  // console.log(snakeHead)
  // console.log(snakeTail)

  // console.log(snake)
  // snake.shift()
  // console.log(snake)
  // snake.push(snakeHead)
  // console.log(snake)


  // let t = 0
  // do {
  //   console.log(snake)
  //   snake.shift()
  //   console.log(snake)
  //   snake.push(snakeHead)
  //   console.log(snake)
  //   t++
  // }
  // while (t < 5)


  //Start Game & Move snake
  // startButton.addEventListener('click', () => {
  //   startInterval = setInterval(() => {
  //     if (cells[snake].classList.contains('snake')) {
  //       cells[snake].classList.remove('snake')
  //       snake += 1
  //       cells[snake].classList.add('snake')
  //     }
  //   }, 200)
  // })

  // Think about refactoring this using a switch statement
  let startInterval
  let rightInterval
  let leftInterval
  let upInterval
  let downInterval

  // Snake Movement Keys Logic
  document.addEventListener('keydown', (event) => {
    // clearInterval(setInterval)
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


    // if (event.key === 'ArrowUp') {
    //   clearInterval(startInterval)
    //   clearInterval(rightInterval)
    //   clearInterval(downInterval)
    //   clearInterval(leftInterval)
    //   upInterval = setInterval(() => {
    //     if (snake < width) {
    //       return
    //     }

    // }
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

  cells[food].classList.add('food')

  //if snake in the same square as food, then remove food from square and add new food
  //if food removed, add 10 points to players score
  // if (cells.classList.contains('food') && (cells.classList.contains('snake'))) {
  //   cells.classList.remove('food')
  //   score += 100
  // }



  //if snake hits boundry, then stop - clearInterval(All)
  //if snake hits itself, then stop - clearInterval(All)







  // Food Logic.  For now is set on a timed loop, but will change that to appear at the start and then remain on screen until eaten.  Might actually call t
  // const foodLogic = setInterval(() => { 
  //   const randomFood = Math.floor(Math.random() * cells.length)
  //   console.log(randomFood)
  //   cells[randomFood].classList.add('food')
  //   setInterval(() => {
  //     cells[randomFood].classList.remove('food')
  //   }, 1000)
  // }, 1000)

  // foodLogic //used to call and start foodlogic.  why don't i need the brackets?

}

window.addEventListener('DOMContentLoaded', setUpNewGame)