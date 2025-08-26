let n = 10; // rows
let m = 15; // columns
let matrix = [];

function setup() {
  createCanvas(600, 400);
  textSize(20);
  textAlign(CENTER, CENTER);
  noLoop();

  // fill matrix with random 0/1
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < m; j++) {
      matrix[i][j] = int(random(2)); // 0 or 1
    }
  }
}

function draw() {
  background(240);

  let cellW = width / m;
  let cellH = height / n;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      fill(0);
      text(matrix[i][j], j * cellW + cellW / 2, i * cellH + cellH / 2);
    }
  }
}
