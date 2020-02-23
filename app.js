function setUpNewGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const cells = []
  // const boundry = grid
  let snake = 3
  let snakeBody = []
  let food = 40
  let score = 0


  // if (boundry === snake)

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    // cell.innerHTML = i  // view grid numbers
    grid.appendChild(cell)
    cells.push(cell)
  }

  console.log(cells)

  //Snake starting position
  cells[snake].classList.add('snake')

  
  //Start Game & Move snake
  startButton.addEventListener('click', () => {
    startInterval = setInterval(() => {
      if (cells[snake].classList.contains('snake')) {
        cells[snake].classList.remove('snake')
        snake += 1
        cells[snake].classList.add('snake')
      }
    }, 200)
  })

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
      rightInterval = setInterval(() => {
        if (snake === cells.length - 1) {
          return
        }
        cells[snake].classList.remove('snake')
        snake += 1
        cells[snake].classList.add('snake')
      }, 200)
    }
    if (event.key === 'ArrowLeft') {
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(upInterval)
      leftInterval = setInterval(() => {
        if (snake === 0) {
          return
        }
        cells[snake].classList.remove('snake')
        snake -= 1
        cells[snake].classList.add('snake')
      }, 200)
    }
    if (event.key === 'ArrowUp') {
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(leftInterval)
      upInterval = setInterval(() => {
        if (snake < width) {
          return
        }
        cells[snake].classList.remove('snake')
        snake -= width
        cells[snake].classList.add('snake')
      }, 200)
    }
    if (event.key === 'ArrowDown') {
      clearInterval(startInterval)
      clearInterval(rightInterval)
      clearInterval(upInterval)
      clearInterval(leftInterval)
      downInterval = setInterval(() => {
        if (snake > cells.length - width - 1) {
          return
        }
        cells[snake].classList.remove('snake')
        snake += width
        cells[snake].classList.add('snake')
      }, 200)
    }
  })

  ///////////////example/////////////
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cells.push(cell)
    cell.addEventListener('click', () => {
      if (cell.classList.contains('mole')) {
        score += 100
        cell.classList.remove('mole')
      }
    })
    grid.appendChild(cell)
  }

  cells[food].classList.add('food')

  //if snake in the same square as food, then remove food from square and add new food
  //if food removed, add 10 points to players score
  if (cells.classList.contains('food') && (cells.classList.contains('snake'))) {
    cells.classList.remove('food')
    score += 100
  }



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