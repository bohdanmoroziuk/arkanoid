const FPS = 1000 / 60;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
const paddleSpeed = 7;

let paddleX = (canvas.width - paddleWidth) / 2;

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];

let rightPressed = false;
let leftPressed = false;

let interval = null;

let score = 0;

function drawBall(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI*2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

function drawPaddle(context, x, y, width, height) {
  context.beginPath();
  context.rect(x, y, width, height);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

function createBricks() {
  for (let column = 0; column < brickColumnCount; column++) {
    bricks[column] = [];

    for (let row = 0; row < brickRowCount; row++) {
      bricks[column][row] = { 
        x: 0, 
        y: 0,
        status: 1 
      };
    }
  }
}

function drawBricks() {
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      if (bricks[column][row].status === 1) {
        const brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (row * (brickHeight+brickPadding)) + brickOffsetTop;

        bricks[column][row].x = brickX;
        bricks[column][row].y = brickY;

        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = '#0095dd';
        context.fill();
        context.closePath();
      }
    }
  }
}

function clearCanvas(context, width, height) {
  context.clearRect(0, 0, width, height);
} 

function detectCollision() {
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      const brick = bricks[column][row];
        
      if (brick.status === 1) {
        if (
          x > brick.x && 
          x < brick.x + brickWidth && 
          y > brick.y && 
          y < brick.y + brickHeight
        ) {
          dy = -dy;
          brick.status = 0;
          score++;
        }
      }
    }
  }
}

function drawScore() {
  context.font = '1rem Arial';
  context.fillStyle = '#0095dd';
  context.fillText(`Score: ${score}`, 8, 20);
}

function draw() {
  clearCanvas(context, canvas.width, canvas.height);

  drawBricks();
  drawBall(context, x, y, ballRadius);
  drawPaddle(context, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  drawScore();

  detectCollision();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert('Game Over');
      location.reload();
      clearInterval(interval);
    }
  }

  if (rightPressed) {
    paddleX += paddleSpeed;

    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  }

  if (leftPressed) {
    paddleX -= paddleSpeed;

    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
}

function keyDownHandler({ key }) {
  if (['Right', 'ArrowRight'].includes(key)) {
    rightPressed = true;
  }
  if (['Left', 'ArrowLeft'].includes(key)) {
    leftPressed = true;
  }
}

function keyUpHandler({ key }) {
  if (['Right', 'ArrowRight'].includes(key)) {
    rightPressed = false;
  }
  if (['Left', 'ArrowLeft'].includes(key)) {
    leftPressed = false;
  }
}

function start() {
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  createBricks();

  interval = setInterval(draw, FPS);
}

start();