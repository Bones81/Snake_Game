document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('button');
  const scoreDisplay = document.querySelector('score')
  const squares = document.querySelectorAll('#grid div')

  let score = 0
  let currentSnake = [2, 1, 0] 
  //first element of currentSnake will always be the location of the head, represented as a div index within the const 'squares' 
  //last element will always be the tail location
  //So, the snake starts with its head in squares[2]. The middle of the snake starts in squares[1]. And the tail starts in squares[0].

  let gridWidth = 10 //this variable will help when we need to move the snake up or down, as it represents how many squares forward or backward in 'squares' one needs to move in order to effect a down or up movement, respectively

  




})