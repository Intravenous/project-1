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

  // Snake Movement Keys Logic
  document.addEventListener('keydown', (event) => {
    console.log(event.key) // how you identify the name of the key that has been pressed //new
    if (event.key === 'ArrowRight') {
      rightInterval = setInterval(() => {
        if (snake === cells.length - 1) { // what is this doing exactly?  Stopping the snake from going outside the boundry at the end of the array?
          return
        }
        cells[snake].classList.remove('snake')
        snake += 1
        cells[snake].classList.add('snake')

      }, 200)
    }
    if (event.key === 'ArrowLeft') {
      leftInterval = setInterval(() => {

        if (snake === 0) {  //stopping the snake from going out the boundry if it's at the begining of the array
          return
        }
        clearInterval(rightInterval)
        console.log('hello')
        cells[snake].classList.remove('snake')
        snake -= 1
        cells[snake].classList.add('snake')
      }, 200)
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


  // // Snake Movement Keys Logic
  // document.addEventListener('keydown', (event) => {
  //   console.log(event.key) // how you identify the name of the key that has been pressed
  //   if (event.key === 'ArrowRight') {
  //     if (snake === cells.length - 1) { // what is this doing exactly?  Stopping the snake from going outside the boundry at the end of the array?
  //       return
  //     }
  //     cells[snake].classList.remove('snake')
  //     snake += 1
  //     cells[snake].classList.add('snake')
  //   } else if (event.key === 'ArrowLeft') {
  //     if (snake === 0) {  //stopping the snake from going out the boundry if it's at the begining of the array
  //       return
  //     }
  //     cells[snake].classList.remove('snake')
  //     snake -= 1
  //     cells[snake].classList.add('snake')
  //   } else if (event.key === 'ArrowUp') {
  //     if (snake < width) {
  //       return
  //     }
  //     cells[snake].classList.remove('snake')
  //     snake -= width
  //     cells[snake].classList.add('snake')
  //   } else if (event.key === 'ArrowDown') {
  //     if (snake > cells.length - width - 1) {
  //       return
  //     }
  //     cells[snake].classList.remove('snake')
  //     snake += width
  //     cells[snake].classList.add('snake')
  //   }
  // })

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