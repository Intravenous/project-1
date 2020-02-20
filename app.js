function setUpNewGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const cells = []
  let snake = 4 //will be 3
  let food =  40
  let score = 0


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell)
  }

  console.log(cells)

  //Start Game & Move snake
  startButton.addEventListener('click', () => {
    const startInterval = setInterval(() => {
      if (cells[snake].classList.contains('snake')) {
        cells[snake + 1].classList.add('snake')
        cells[snake].classList.remove('snake')
        cells[snake + 1].classList.add('snake')
      } 
    }, 10)
  })


  // Snake Movement Keys Logic
  document.addEventListener('keydown', (event) => {
    console.log(event.key) // how you identify the name of the key that has been pressed
    if (event.key === 'ArrowRight') {
      if (snake === cells.length - 1) { // what is this doing exactley?
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

  // //NEW - snake logic - create a loop to change the snake array by one
  // for (let i = 0; i < gridCellCount; i++) {
  //   cells[i].classList.add('snake')
  //   console.log(snake)
  // }



  // Snake Logic
  // cells[snake].classList.add('snake')
  // // myArray.push('Another thing')
  // // snake.push(1)
  // snake = 1
  // console.log(snake)
  // cells[snake].classList.add('snake')
  // snake = 2
  // console.log(snake)
  cells[snake].classList.add('snake')
  // cells[snake].classList.add('snake')
  // cells[1].classList.add('snake')
  // cells[2].classList.add('snake')
  // cells[3].classList.add('snake')

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