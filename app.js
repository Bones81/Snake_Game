document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('#grid div');
  const scoreDisplay = document.querySelector('span');
  const btn = document.querySelector('#start-btn');

  let gridWidth = 10 //this variable will help when we need to move the snake up or down, as it represents how many squares forward or backward in 'squares' one needs to move in order to effect a down or up movement, respectively

  let score = 0
  let currentSnake = [2, 1, 0] 
  //first element of currentSnake will always be the location of the head, represented as a div index within the const 'squares' 
  //last element will always be the tail location
  //So, the snake starts with its head in squares[2]. The middle of the snake starts in squares[1]. And the tail starts in squares[0].
  
  let direction = 1 //this will represent the movement direction of the snake. Value of 1 means one square to the right. -1 means one square left. 10 means 1 row down (i.e. 10 squares right). -10 means 1 square up (i.e. 10 squares left)

  let appleIndex = 0 //this just declares the variable
  let interval = 0 //this just declares the variable
  let intervalTime = 0 //this just declares the variable
  const speedAdjust = 0.9 //the factor by which speed will be adjusted each time the snake eats an apple

  function startGame() {
    currentSnake.forEach(sq => squares[sq].classList.remove('snake')) //remove snake class from any existing snake on the board
    squares[appleIndex].classList.remove('apple') //remove any existing apple from the board
    clearInterval(interval) // stop any interval that had been running
    randomApple(); //generate an apple on the board
    score = 0 // reset the score to 0
    scoreDisplay.textContent = score
    direction = 1 //reset the direction
    currentSnake = [2,1,0] //reset the opening snake indexes
    currentSnake.forEach(sq => squares[sq].classList.add('snake'))
    intervalTime = 1000 //reset the interval length
    interval = setInterval(moveOutcomes, intervalTime) //start a new interval (begin the game)
  }

  //generate apple at random location in grid
  function randomApple() {
    squares[appleIndex].classList.remove('apple');
    appleIndex = Math.floor(Math.random() * squares.length)
    if (currentSnake.includes(appleIndex)) {
      return randomApple();
    }   
    squares[appleIndex].classList.add('apple')
  }

  
  
  function moveOutcomes() {
    if (direction === 1 && currentSnake[0] % gridWidth === gridWidth - 1 || //if going right and hit right wall
      direction === -1 && currentSnake[0] % gridWidth === 0 || //if going left and hit left wall
      direction === -gridWidth && currentSnake[0] - gridWidth < 0 || //if going up and hit upper wall
      direction === gridWidth && currentSnake[0] + gridWidth >= gridWidth * gridWidth || //if going down and hit lower wall
      squares[currentSnake[0] + direction].classList.contains('snake')) {
        return clearInterval(interval)
      } 
      //if the above is not true we can move snake forward by doing the following:  
    squares.forEach(sq => sq.classList.remove('snake')); //first remove snake class from all squares to prevent accidental extra snake squares
    const tailIndex = currentSnake.pop() //pop off the last element of currentSnake
    squares[tailIndex].classList.remove('snake') //remove snake class from former tail location
    const nextHeadIndex = currentSnake[0] + direction //determine next square index by adding direction to head of snake
    currentSnake.unshift(nextHeadIndex) //unshift (i.e. insert) new head of snake index. 
    if (squares[currentSnake[0]].classList.contains('apple')) { //what happens when snake reaches an apple:
      score++ //update score
      scoreDisplay.textContent = score //update scoreDisplay
      currentSnake.push(tailIndex)  //push tailIndex back into currentSnake
      randomApple();  //run randomApple(), which should clear apple from existing square and randomly assign it to a new square that does not have snake class
      clearInterval(interval) //stop the current interval
      intervalTime *= speedAdjust //set the new intervalTime
      interval = setInterval(moveOutcomes, intervalTime) //start a new interval with the new intervalTime
    }    
    currentSnake.forEach(idx => squares[idx].classList.add('snake')) //this adds snake class to all currentSnake squares
  }
    
    //how snake responds to keystrokes
    function control(e) {
      if (e.keyCode === 39) {
        direction = 1 //right arrow 
      } else if (e.keyCode === 37) {
        direction = -1 //left arrow
      } else if (e.keyCode === 38) {
        direction = -gridWidth //up arrow
      } else if (e.keyCode === 40) {
        direction = gridWidth //down arrow
      }
    }
    
    document.addEventListener('keyup', control)
    btn.addEventListener('click', startGame);

});