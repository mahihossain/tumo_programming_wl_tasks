/// <reference path="./lib/Intellisense/js-turtle_hy.ts" />
//DOCUMENTATION: https://hanumanum.github.io/js-turtle/
/*
showGrid(20);      
forward(distance)  
right(angle)       
left(angle) 	   
goto(x,y) 	       
clear() 	       
penup() 	       
pendown() 	       
reset() 	       
angle(angle)	   
width(width)       

color(r,g,b)
color([r,g,b])
color("red")
color("#ff0000")
*/


// showGrid(50); 
// setSpeed(200);

// width(5);
// color("blue");
// forward(120);

// width(1);
// left(65);
// color("red");
// forward(150);

// goto(184,-208);
// width(2);
// right(100);
// color("green");
// forward(150);



// Task level 1 session 2

// // Show a grid so placement is easy (optional)
// showGrid(50);

// // Helper: draw a regular n-gon with side length `len`
// function polygon(n, len) {
//   for (var i = 0; i < n; i++) {
//     forward(len);
//     right(360 / n);
//   }
// }

// width(3);

// // Triangle
// penup(); goto(-250, 120); pendown();
// color("dodgerblue");
// polygon(3, 110);

// // Square
// penup(); goto(50, 120); pendown();
// color("seagreen");
// polygon(4, 100);

// // Pentagon
// penup(); goto(-250, -160); pendown();
// color("orange");
// polygon(5, 90);

// // Hexagon
// penup(); goto(50, -160); pendown();
// color("purple");
// polygon(6, 80);



// Task Level 1 Session 3a


// clear(); // clear once

// function drawStar(cx, cy, spokes, length, col) {
//   color(col);
//   for (let i = 0; i < spokes; i++) {
//     penup(); goto(cx, cy); pendown();  // start each spoke at the center
//     forward(length);
//     left(360 / spokes);                // same accumulated rotation as your working code
//   }
// }

// // Three stars
// drawStar(0, 0, 36, 200, "red");
// drawStar(-180, -180, 36, 120, "limegreen");
// drawStar(220, 200, 36, 85, "royalblue");


// Task Level 1 Session 3b

// goto(305, -309)
// color("black")
// forward(600)
// left(90)
// forward(600)
// left(90)
// forward(550)
// left(90)
// forward(500)
// left(90);              // turn to face right for the next run
// let len = 480;         // continue decreasing by 20 each side
// while (len >= 20) {
//   forward(len);
//   left(90);
//   len -= 20;
// }


// Task Level 1 Final

// === Helpers ===
function moveTo(x, y) { penup(); goto(x, y); pendown(); }

function polygon(n, side) {
  for (let i = 0; i < n; i++) { forward(side); left(360 / n); }
}

function regularCircle(x, y, r) {        // circle via polygon
  const n = 60, side = 2 * Math.PI * r / n;
  moveTo(x - r, y);
  angle(0);
  for (let i = 0; i < n; i++) { forward(side); left(360 / n); }
}

function squareAt(x, y, s) {
  moveTo(x - s/2, y - s/2); angle(0);
  for (let i = 0; i < 4; i++) { forward(s); left(90); }
}

function starburst(x, y, spokes, len, rotDeg) {
  for (let i = 0; i < spokes; i++) {
    moveTo(x, y);
    angle(rotDeg + i * (360 / spokes));
    forward(len);
  }
}

function triangleAt(x, y, s, rotDeg) {
  moveTo(x, y); angle(rotDeg);
  // draw an equilateral triangle centered at (x,y)
  // position turtle to one vertex first
  penup(); angle(rotDeg); goto(x, y); forward(-s / Math.sqrt(3)); pendown();
  for (let i = 0; i < 3; i++) { forward(s); left(120); }
}

// === Characters (state + draw/update) ===
const bounds = { minX: -280, maxX: 280, minY: -280, maxY: 280 };

// Boxy: bouncing square
const boxy = {
  x: -230, y: -180, vx: 3.2, vy: 2.1, size: 70,
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x - this.size/2 < bounds.minX || this.x + this.size/2 > bounds.maxX) this.vx *= -1;
    if (this.y - this.size/2 < bounds.minY || this.y + this.size/2 > bounds.maxY) this.vy *= -1;
  },
  draw() {
    color("#333"); width(2); squareAt(this.x, this.y, this.size);
    // eyes
    color("#333"); regularCircle(this.x - this.size*0.2, this.y + this.size*0.15, 4);
    regularCircle(this.x + this.size*0.2, this.y + this.size*0.15, 4);
  }
};

// Spinner: rotating star
const spinner = {
  x: 160, y: 160, spokes: 36, len: 90, rot: 0, speed: 3,
  update() { this.rot = (this.rot + this.speed) % 360; },
  draw() { color("#6a5acd"); width(2); starburst(this.x, this.y, this.spokes, this.len, this.rot); }
};

// Walker: triangle moving on a circular path
const walker = {
  t: 0, radius: 140, speed: 0.03, size: 50,
  pos() { return { x: this.radius * Math.cos(this.t), y: this.radius * Math.sin(this.t) }; },
  update() { this.t += this.speed; },
  draw() {
    const p = this.pos();
    color("seagreen"); width(2);
    triangleAt(p.x, p.y, this.size, (this.t * 180 / Math.PI) + 90);
  }
};

// Optional: a subtle square spiral background
function squareSpiral(centerX, centerY, segments, start, step) {
  moveTo(centerX, centerY); angle(0);
  let len = start;
  for (let i = 0; i < segments; i++) { forward(len); left(90); len += step; }
}

// === Main loop ===
function drawFrame() {
  clear();

  // Background spiral (light)
  color("#ddd"); width(1.5);
  moveTo(-220, -220); angle(0);
  squareSpiral(-220, -220, 24, 10, 20);

  // Update + draw characters
  boxy.update(); spinner.update(); walker.update();
  boxy.draw(); spinner.draw(); walker.draw();

  // Frame
  color("#e66"); width(1);
  moveTo(bounds.minX - 10, bounds.minY - 10); angle(0);
  for (let i = 0; i < 4; i++) { forward((bounds.maxX - bounds.minX) + 20); left(90); }

  requestAnimationFrame(drawFrame);
}

drawFrame();



