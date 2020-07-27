const FPS = 1000 / 60;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

const dx = 2;
const dy = -2

function drawBall(context, x, y) {
  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI*2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

function clearCanvas(context, width, height) {
  context.clearRect(0, 0, width, height);
} 

function draw() {
  clearCanvas(context, canvas.width, canvas.height);
  drawBall(context, x, y);

  x += dx;
  y += dy;
}

setInterval(draw, FPS);