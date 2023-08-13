const tiles = [];
const grid = [];
const DIM = 2;

function preload() {
  tiles[0] = { sockets: [0,0,0,0], image: loadImage("tiles/demo/blank.png") }
  tiles[1] = { sockets: [1,1,0,1], image: loadImage("tiles/demo/up.png") }
  tiles[2] = { sockets: [1,1,1,0], image: loadImage("tiles/demo/right.png") }
  tiles[3] = { sockets: [0,1,1,1], image: loadImage("tiles/demo/down.png") }
  tiles[4] = { sockets: [1,0,1,1], image: loadImage("tiles/demo/left.png") }
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < DIM*DIM; i++) {
    grid[i] = {
      collapsed: false
    }
  }
  grid[1].collapsed = true
}

function draw() {
  background(100);
  for (let i  = 0; i < DIM; i++){
    for (let j = 0; j < DIM; j++){
      let cell = grid[i * DIM + j];
      if (!cell.collapsed) {
        //IF cell is not collapsed, look at neighbors and collapse
      }
    }
  }
  noLoop()
}