const tiles = [];
const grid = [];
const DIM = 20;

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
      entropy: 5
    }
  }
  grid[1].collapsed = true
}

function draw() {
  background(100);
  let gridCopy = structuredClone(grid)
  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    let minEntropy = 5;
    if (cell.entropy < minEntropy) {
      minEntropy = cell.entropy;
    }
    gridCopy = gridCopy.map((cell) => {
      if (cell.entropy === minEntropy){
        cell.collapseThisIteration = true
      }
      return cell
    })
    indexesToCollapse = []
    for (let i = 0; i < gridCopy.length; i++) {
      const cell = gridCopy[i];
      if (cell.collapseThisIteration === true) {
        indexesToCollapse.push(i)
      }
    }
    chosenIndex = random(indexesToCollapse)
    collapseCell(grid[chosenIndex], (chosenIndex % DIM)*(width/DIM), (Math.floor(chosenIndex / DIM))*(height/DIM), width/DIM, height/DIM)
  }
  noLoop()
}