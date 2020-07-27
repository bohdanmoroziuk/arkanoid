const FPS = 1000 / 60;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
const paddleX = (canvas.width - paddleWidth) / 2;

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2

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

function clearCanvas(context, width, height) {
  context.clearRect(0, 0, width, height);
} 

function draw() {
  clearCanvas(context, canvas.width, canvas.height);

  drawBall(context, x, y, ballRadius);
  drawPaddle(context, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
}

setInterval(draw, FPS);