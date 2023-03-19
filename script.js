// "use strict";

var canvas = document.getElementById('snake');
var ctx = canvas.getContext('2d');
var h = 500;
w = 1000;
var size = 10;
var snake = [];
var snake_length = 10;
var dir = 'right';
var color = '#222';
var score = 0;
var lvl = 1;
var sc = document.querySelector('.score');
var speed = 100;
var count = 0;

canvas.height = h;
canvas.width = w;

function drawCanvas(){
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,w,h);
}


/************* SNAKE ****************/
function buildSnake(){
  for(var i = snake_length; i >= 0; i--){
    snake.push({x:i, y:0});
  }
}
function drawSnake(){
  for(var i = 0; i < snake.length; i++){
    var s = snake[i];
    ctx.fillStyle = color;
    ctx.fillRect(s.x * size, s.y * size, size, size);
  }
}
function updateSnake(){
  var headX = snake[0].x;
  var headY = snake[0].y;

  if(dir == 'right'){ headX++; }
  if(dir == 'left'){headX--; }
  if(dir == 'up'){headY--; }
  if(dir == 'down'){headY++; }
  snake.pop();
  snake.unshift({x: headX, y: headY});

  /***** Wall Collision *******/
  if(headX >= (w/size) || headX == "-1" || headY >= (h/size) || headY == "-1" ){ gameOver(); }

  /***** Food Collision *******/
  if(fd.x == headX && fd.y == headY){
    if(dir == 'right'){ headX++; }
    if(dir == 'left'){headX--; }
    if(dir == 'up'){headY--; }
    if(dir == 'down'){headY++; }
    snake.unshift({x: headX, y: headY});

    score += 10;
    count++;
    fd = new food();
  }

  /***** Self Collision *******/
  for(var j = 1; j <= (snake.length-1); j++){
    var tail = snake[j];
    if(headX == tail.x && headY == tail.y){
      gameOver();
    }
  }
  sc.innerHTML = 'Score: ' + score + ", ";
  sc.innerHTML += 'Level: ' + lvl;
}

/************* FOOD ****************/
var food = function(){
  this.x = Math.round(Math.random() * (w - size)/size);
  this.y = Math.round(Math.random() * (h - size)/size);
  this.draw = function(){
    ctx.fillStyle = color;
    ctx.fillRect(this.x * size, this.y * size, size, size);
  }
}
var fd = new food();


/************** KEYBOARD EVENTS ****************/
document.onkeydown = function(e){
  var key = e.keyCode;
  if(key == "37" && dir !== "right"){ setTimeout(function(){ dir = "left"; }, 30) }
  if(key == "38" && dir !== "down"){ setTimeout(function(){ dir = "up"; }, 30) }
  if(key == "39" && dir !== "left"){ setTimeout(function(){ dir = "right"; }, 30) }
  if(key == "40" && dir !== "up"){ setTimeout(function(){ dir = "down"; }, 30) }

  if(key == "27" || key == "80"){ fnPause(); } /* Key 'ESC' or 'P' */

  if(key){ e.preventDefault(); }
}


/*************** FUNCTIONS ******************/
var go = document.querySelector('.gameOver');
function gameOver(){
  clearInterval(loopGame);
  go.style.display = "block";
}

var poz = document.querySelector('.pause');
var pause = false;
function fnPause(){
  if(pause){
    loopGame = setInterval(loop, speed);
    poz.style.display = "none";
    pause = false;
  }else{
    clearInterval(loopGame);
    poz.style.display = "block";
    pause = true;
  }
}

function updateLvl(){
  if(count == 10){
    lvl++;
    count = 0;
    speed--;
    loopGame = setInterval(loop, speed);
  };
  
}

function init(){
  snake = [];
  dir = 'right';
  speed = 100;
  score = 0;
  lvl = 1;
  count = 0;
  fd = new food();
  go.style.display = 'none';
  buildSnake();
  loopGame = setInterval(loop, speed);
}

buildSnake();
function loop(){
  drawCanvas();
  drawSnake();
  updateSnake();
  updateLvl();
  fd.draw();
}
loopGame = setInterval(loop, speed);