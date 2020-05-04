import {
  randomIntFromRange,
  randomColor,
  distance,
  resolveCollision
} from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#D4EDFF", "#0C92FA", "#043098", "#140545"];

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Particles
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCenter = randomIntFromRange(80, 120)
  this.lastMouse = { x, y }

  this.draw = ({ x, y }) => {
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(this.x, this.y);
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.stroke()
    c.closePath();
  };

  this.update = particles => {
    const lastCord = {
      x: this.x,
      y: this.y,
    }

    //Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    //Circular moution
    this.x = this.lastMouse.x + Math.sin(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.cos(this.radians) * this.distanceFromCenter;
    this.radians += this.velocity;

    this.draw(lastCord);
  };
}

// Implementation
let particles;
function init() {
  particles = Array(50)
    .fill("")
    .map((item, i) => {
      const defaultRadius = randomIntFromRange(2, 5);
      const x = innerWidth / 2;
      const y = innerHeight / 2;

      return new Particle(
        x,
        y,
        defaultRadius,
        colors[randomIntFromRange(0, colors.length - 1)]
      );
    });
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255, 255, 255, 0.05)'
  // c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((element, i, self) => {
    element.update(self);
  });
}

init();
animate();
