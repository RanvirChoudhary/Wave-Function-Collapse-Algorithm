const tiles = [];
const grid = [];
const DIM = 3;

function collapseCell(cell, x, y, width, height){
  image(random(tiles).image, x, y, width, height)
}

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
      collapsed: false,
      options: [0,1,2,3,4]
    }
  }
}

function draw() {
  background(0);
  let canCollapse = structuredClone(grid)
  let lowEntropy = 5;
  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    if (cell.options.length < lowEntropy && !cell.collapsed){
      lowEntropy = cell.options.length
    }
  }

  canCollapse = canCollapse.filter((cell) => cell.options.length === lowEntropy && !cell.collapsed)
  toCollapse = random(canCollapse)
  collapseCell(toCollapse, )

  noLoop()
}