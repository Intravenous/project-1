### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

---
## Land of the Snake

## Overview

Land of the Snake was the first project of my Software Engineering Immersive at General Assembly and also my first front-end project utilising ‘vanilla’ JavaScript, HTML and CSS.

At a high level, the task was to build a grid-based game, chosen from a list of eleven options, that would be rendered in the browser.

Given the options, I chose to re-create the classic arcade game snake and base the games look and feel around a classic Nokia phone of the 90s. A period in time which saw the popularity of the game reach its peak.

In essence, the game was an opportunity for me to consolidate the learning of the first few weeks of my immersive course and further my learning.

If you’d like to see the finished product, you can do so [here](https://intravenous.github.io/project-1/).

---

## The Brief 

* **Render a game in the browser**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

---

## The Technologies Used 

- HTML5
- CSS3
- JavaScript (ES6)
- Git and GitHub
- Google Fonts


## User Experience

I deliberately gave the game an 8-bit and retro aesthetic, to fit in with the theme of a 90s Nokia phone.

<img  src=images/project-1-Readme-Pic-1.png height=500> 

 
## The Approach 

**The Grid**

The foundation of the game is built on a 10 x 10 JavaScript grid. A for loop is used to create the HTML divs, which are appended as children of the grid.

```js
  const width = 10
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell)
  }

```

The below screenshot displays the grid approach and although the gridlines are not kept in the final game, they were often used along with the cell numbers during the game development process.

<img  src=images/project-1-Readme-Pic-2.png height=500> 


**Snake Food**

A function was created to handle the creation and placement of food on the game board.

```js
  let food
  //Food Function
  function foodGenerator() {
    const randomFood = Math.floor(Math.random() * cells.length)
    if (cells[randomFood].classList.contains('snake')) {
      foodGenerator()
    } else {
      cells[randomFood].classList.add('food')
    }
    food = randomFood
  }

```

* The variable randomFood was created to handle the task of randomly generating a number, which was equal to a cell on the grid, using the Math.random() function.  A class would then be added to the cell and thus place food on the grid.
* If the random cell already had a class of ‘snake’, however, the foodGenerator function would be called again.  This prevented food from being placed on the grid in a cell that already contained the snake.


**Snake Growth**

An arrow function was created to handle the task of snake growth after food was eaten.

```js

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
``` 

* An if statement checked if the snakehead (first cell of the snake array), was in a cell that had a class of ‘food’.  If that was the case, then that cell would have the food class removed and using the unShift method, an extra ‘body part’ would be added to the snake array.
* More food would then be generated, by calling the foodGenerator function, the speed of the snake would be increased, ten points would be added to the players score and the scoreboard would be updated.
* The function was wrapped in a setInterval to enable the function to continually run and update the required elements as required.


**Snake Movement**

Snake movement was handled by a number of variables, a setInterval and event listeners.

```js
  // Movement variables
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

```

* The movement variables in conjunction with the clearIntervals, where both used to set the snake speed and clear the snake speed as the snake direction changed.  The clearIntervals were required to stop the issue of the snakes’ speed increasing exponentially as the snake changed direction.
* The snake direction was captured using an event listener.
* To prevent the snake from immediately going in the opposite direction, an if statement was used.

* After setting the interval for the travel of direction, further logic was required to handle the issue of the snake coming into contact with the grid border.

```js
      rightInterval = setInterval(() => {
        if (snake[snake.length - 1] % width === width - 1) {
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

```
* An if statement along with a for loop was created to handle the issue of the snake coming into contact with the outer grid wall.
* If this happened, a segment of the snake would be removed from the tail and added to the front of the snake.
* The snake would then appear on the opposite side of the grid on the same line that it had exited on.


**Snake Collision Detection**

In my version of snake a player doesn’t die if the player hits the border of the grid, they do die if they hit themselves, however.  As a result, I chose to write a function to deal with this functionality.

```js
  const snakeAttack = function () {
    if ((new Set(snake).size) !== snake.length) {
      gameOverSound.play()
      themeTune.pause()
      gameOver()
    }
  }

```
* A new snake array was created using a set.  This new array would be compared to the original snake array.
* If the new array length ever differed from the original snake array, this would indicate that the ‘snake head’ occupied the same grid position as a part of the snake body and thus the new array would differ in size to the original array and the game could be ended.


## Challenges

* I found the process of getting started when faced with a brief and little else, rather daunting initially. Although we had been taught the skills and tools that were needed to build the game, having to start from a blank page was definitely a challenge.  Taking the time to think and plan on paper, enabled me to face and overcome this challenge. Looking back over my code I can see that some of it could be re-factored (i.e. the snake movement), to make it DRY, however, due to the time constraints and given that it was my first project, I was happy with the outcome.
* Without doubt, there were two main challenges for me during the project; getting the snake movement to work correctly in all circumstances and combining this with ‘snake growth’ after food had been eaten.  Although, actually getting the snake to move in a given direction didn’t prove too difficult initially, combining these features to work correctly in all circumstances, proved a challenge. 


## Victories

* Getting a game that worked as specified and getting the game look and feel correct.
* Consolidating and furthering my knowledge of the languages that I had learnt to date, JavaScript, HTML and CSS. 


## Potential Future Features

* Adding a leader-bored using local storage.  Ideally, I would have liked to have created a leader-board so that a player would have been able to see what their ultimate high score had been and where they ranked in the all-time list.  Unfortunately, the time pressure of the project deadline meant that I was unable to implement this feature.
* I would also have liked to have implemented two modes of the game to replicate the two classic versions of the game.  My version of the game allows the snake to pass through the walls, ala Snake II, however, in the first version of the game, a player would die if they collided with the wall.


## Lessons Learned

* Planning and Pseudo code is key.  Although it’s always tempting to start coding once you have the brief, taking time up front to plan, can save you a lot of time and pain as you progress in the coding phase.