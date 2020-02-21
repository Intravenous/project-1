function setUpNewGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const cells = []
  let snake = 3
  let food = 40
  let score = 0


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    // cell.innerHTML = i
    grid.appendChild(cell)
    cells.push(cell)
  }

  console.log(cells)

  //Snake starting position
  cells[snake].classList.add('snake')

  //Start Game & Move snake
  startButton.addEventListener('click', () => {
    const startInterval = setInterval(() => {
      if (cells[snake].classList.contains('snake')) {
        cells[snake].classList.remove('snake')
        snake += 1
        cells[snake].classList.add('snake')
      }
    }, 200)
  })


  // Think about refactoring this using a switch statement
  let rightInterval
  let leftInterval
  let upInterval
  let downInterval

  // Snake Movement Keys Logic
  document.addEventListener('keydown', (event) => {
    // clearInterval(setInterval)
    console.log(event.key) // how you identify the name of the key that has been pressed //new
    if (event.key === 'ArrowRight') {
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
      clearInterval(rightInterval)
      clearInterval(downInterval)
      clearInterval(leftInterval)
      upInterval = setInterval(() => {
        if (snake < width) {
          return
        }
        clearInterval(leftInterval)
        cells[snake].classList.remove('snake')
        snake -= width
        cells[snake].classList.add('snake')
      }, 200)
    }
    if (event.key === 'ArrowDown') {
      clearInterval(rightInterval)
      clearInterval(upInterval)
      clearInterval(leftInterval)
      downInterval = setInterval(() => {
        if (snake > cells.length - width - 1) {
          return
        }
        clearInterval(upInterval)
        cells[snake].classList.remove('snake')
        snake += width
        cells[snake].classList.add('snake')
      }, 200)
    }
  })

  // cells[food].classList.add('food')



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