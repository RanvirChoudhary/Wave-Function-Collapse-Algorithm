const tiles = [];
const grid = [];
const DIM = 2;

const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

function preload() {
  tiles[0] = loadImage("tiles/demo/blank.png");
  tiles[1] = loadImage("tiles/demo/up.png");
  tiles[2] = loadImage("tiles/demo/right.png");
  tiles[3] = loadImage("tiles/demo/down.png");
  tiles[4] = loadImage("tiles/demo/left.png");
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < DIM**2; i++) {
    grid[i] = {
      collapsed: false,
      options: [BLANK, UP, RIGHT, DOWN, LEFT]
    }
  }

  grid[0].collapsed = true;
  grid[0].options = [UP]
}

function draw() {
  background(0);

  const w = width / DIM;
  const h = height / DIM
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let cell = grid[j + i * DIM];
      if(cell.collapsed) {
         let index = cell.options[0];
         image(tiles[index], i*w, j*h, w, h)
      } else {
        fill(255, 0, 0);
        rect(i*w, j*h, w, h)
      }
    }
  }
}