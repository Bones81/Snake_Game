document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')
  
  const widthOfGrid = 10
  let currentIndex = 0 //so first div in our grid
  let appleIndex = 0 //so first div in our grid
  let currentSnake = [2,1,0] //so the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1s being the body from now on)
  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0

  //to start, and restart the game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

  //function that deals with ALL the outcomes of the Snake
  function moveOutcomes() {
    //deals with snake hitting border and snake hitting self
    if (
      (currentSnake[0] + widthOfGrid >= (widthOfGrid * widthOfGrid) && direction === widthOfGrid) || //if snake hits bottom
      (currentSnake[0] % widthOfGrid === widthOfGrid - 1 && direction === 1) || //if snake hits right wall (if location modulo 10 === 9 (bc of zero-index), you're at the right wall)
      (currentSnake[0] - widthOfGrid < 0 && direction === -widthOfGrid) || //if snake hits top wall
      (currentSnake[0] % widthOfGrid === 0 && direction === -1) || //if snake hits left wall
      (squares[currentSnake[0] + direction].classList.contains('snake'))//if snake hits itself
    ) {
      return clearInterval(interval) //this will clear the interval if any of the above happen (i.e. STOP the game, I think)
    }

    const tailLoc = currentSnake.pop() //removes the last item of the array and shows it
    squares[tailLoc].classList.remove('snake') //removes the class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
    squares[currentSnake[0]].classList.add('snake') //is there a reason this assigning of snake class to the new head occurs here instead of before the snake-getting-the-apple code??? I don't think so. Will test later.


    //deal with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tailLoc].classList.add('snake')
      currentSnake.push(tailLoc)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }

  }

  //generate new apple once apple is eaten
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) //making sure apple is not in a snake square
    squares[appleIndex].classList.add('apple')
  }

  //assign functions to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake') //we are removing the class of snake from ALL the squares

    if(e.keyCode === 39) {
      direction = 1 //if we press the right arrow on our keyboard, the snake will move right one div
    } else if (e.keyCode === 38) {
      direction = -widthOfGrid //if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1 //if we press the left arrow, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +widthOfGrid //if we press down, the snake head will instantly appear in the div 10 spaces forward, appearing to go down
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)




})