const canvas = document.querySelector("canvas");

// console.log(``);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

// c.fillStyle = "red";
c.fillRect(100, 200, 100, 100); // Draws a red rectangle at (100, 200) with width 100 and height 100
c.fillRect(200, 100, 100, 100); // Draws another red rectangle at (250, 100) with width 50 and height 150

//drawing lines
c.beginPath();
c.moveTo(50, 500);
c.lineTo(500, 500);
c.lineTo(50, 50);
c.lineTo(500, 50);

c.moveTo(600, 500);
c.lineTo(600, 100);
c.stroke();

//Drawing arcs
for (let i = 0; i <= 800; i++) {
  c.beginPath();
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  c.arc(x, y, 50, 0, Math.PI * 2, false);
  c.strokeStyle = `rgba(${r},${g}, ${b},1)`;
  c.stroke();
}

// Animating Arcs
const mouse = {
  x: undefined,
  y: undefined,
};
const maxRadius = 40;
// const minRadius = 2;
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  // console.log(mouse);
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Circle {
  constructor(x, y, dx, dy, r, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minRadius = this.r;
    this.color = color[Math.floor(Math.random() * color.length)];
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.r > innerWidth || this.x - this.r < 0) this.dx = -this.dx;
    if (this.y + this.r > innerHeight || this.y - this.r < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
      if (this.r < maxRadius) this.r += 1;
    } else if (this.r > this.minRadius) {
      this.r -= 1;
    }

    this.draw();
  }
}

// const circle = new Circle(100, 100, 4, 4, 30);
let circleArr = [];
let colorArr = ["#253659", "#03A696", "#04BF9D", "#F27457", "#BF665E"];
function init() {
  circleArr = [];
  for (let i = 0; i <= 800; i++) {
    let x = Math.random() * (window.innerWidth - 2 * radius) + radius;
    let y = Math.random() * (window.innerHeight - 2 * radius) + radius;
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;
    var radius = Math.random() * 3 + 1;
    circleArr.push(new Circle(x, y, dx, dy, radius, colorArr));
    console.log(Math.floor(Math.random() * colorArr.length));
  }
}
init();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  circleArr.forEach((circle) => {
    circle.update();
  });
}

animate();
