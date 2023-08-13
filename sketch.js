const tiles = [];
const grid = [];
const DIM = 2;

const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

const rules = {
  BLANK: [
    [BLANK, UP],
    [BLANK, RIGHT]
    [BLANK, DOWN]
    [BLANK, LEFT]
  ],
  UP: [
    [RIGHT, LEFT, DOWN],
    [LEFT, UP, DOWN],
    [BLANK, DOWN]
    [RIGHT, UP, DOWN],
  ],
  RIGHT: [
    [RIGHT, LEFT, DOWN],
    [LEFT, UP, DOWN],
    [RIGHT, LEFT, UP],
    [BLANK, LEFT]
  ],
  DOWN: [
    [BLANK, UP],
    [LEFT, UP, DOWN],
    [RIGHT, LEFT, UP],
    [RIGHT, UP, DOWN]
  ],
  LEFT: [
    [RIGHT, LEFT, DOWN],
    [BLANK, RIGHT],
    [RIGHT, LEFT, UP],
    [UP, DOWN, RIGHT]
  ]
}

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
}

function draw() {
  background(0);
  let sortedGrid = grid.slice();
  sortedGrid.sort((a, b) => a.options.length - b.options.length)
  sortedGrid = sortedGrid.filter((tileObject) => tileObject.options.length === sortedGrid[0].options.length )

  const tile = random(sortedGrid);
  tile.collapsed = true;
  const chosenTile = random(tile.options);
  tile.options = [chosenTile];

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

  const nextTiles = []
  for(let i = 0; i < DIM; i++){
    for(let j = 0; j < DIM; j++){
      let index = j + i * DIM;
      if(grid[index].collapsed) {
        nextTiles[index] = grid[index]
      } else {
        
      }
    }
  }
  noLoop()
}