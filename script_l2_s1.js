// Session 1: draw a sky (gradient + sun + a few clouds)

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  drawSkyGradient();
  drawSun(width * 0.78, height * 0.25, min(width, height) * 0.07);
  drawCloud(width * 0.25, height * 0.28, 1.1);
  drawCloud(width * 0.42, height * 0.20, 1.5);
  drawCloud(width * 0.62, height * 0.35, 1.2);

  noLoop(); // static sky for Session 1
}

function drawSkyGradient() {
  // top → bottom: deep blue to very light blue
  const topC = color(80, 150, 255);
  const botC = color(225, 245, 255);
  for (let y = 0; y < height; y++) {
    const t = y / (height - 1);
    stroke(lerpColor(topC, botC, t));
    line(0, y, width, y);
  }
  noStroke();
}

function drawSun(x, y, r) {
  // simple radial glow using concentric circles
  for (let i = r; i > 0; i--) {
    const t = i / r;
    fill(lerpColor(color(255, 220, 120, 30), color(255, 200, 0, 220), 1 - t));
    circle(x, y, i * 2);
  }
}

function drawCloud(x, y, s = 1) {
  fill(255, 255, 255, 235);
  // four overlapping ellipses
  ellipse(x, y, 90 * s, 55 * s);
  ellipse(x + 35 * s, y - 12 * s, 80 * s, 50 * s);
  ellipse(x - 35 * s, y - 10 * s, 80 * s, 50 * s);
  ellipse(x, y - 22 * s, 70 * s, 45 * s);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  loop();   // redraw once after resize
}
