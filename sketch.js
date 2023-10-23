const tiles = [];
const grid = [];
let canCollapse;
const DIM = 4;

function collapseCell(cell, x, y, width, height){
  image(random(tiles).image, x, y, width, height)
}

function preload() {
  tiles[0] = { sockets: [0,0,0,0], image: loadImage("tiles/polka/blank.png") }
  tiles[1] = { sockets: [1,1,0,1], image: loadImage("tiles/polka/up.png") }
  tiles[2] = { sockets: [1,1,1,0], image: loadImage("tiles/polka/right.png") }
  tiles[3] = { sockets: [0,1,1,1], image: loadImage("tiles/polka/down.png") }
  tiles[4] = { sockets: [1,0,1,1], image: loadImage("tiles/polka/left.png") }
}

function observe(cellPosition) {
  let collapsedCell = grid[cellPosition]
  let up = grid[cellPosition - DIM]
  let right = grid[cellPosition + 1]
  let down = grid[cellPosition + DIM]
  let left = grid[cellPosition - 1]
  if (cellPosition === 0){
    for (let i = 0; i < right.options.length; i++) {
      const option = right.options[i];
      collapsedRightSocket = tiles[collapsedCell.options[0]].sockets[1]
      rightLeftSocket = tiles[option].sockets[3]
      if (collapsedRightSocket != rightLeftSocket) {
        right.options.splice(i, 1)
        i -= 1
      }
    }
    
  } else if (cellPosition === DIM - 1) {
    // check left and down
  } else if (cellPosition === DIM*DIM - DIM) {
    // check up and right
  } else if (cellPosition === DIM*DIM - 1) {
    // check up and left
  } else if (cellPosition < DIM) {
    // check everything except up
  } else if (cellPosition % DIM === cellPosition - 1) {
    // check everything except right
  } else if (cellPosition > DIM*DIM - (DIM + 1)) {
    // check everything except down
  } else if (cellPosition % DIM === 0) {
    // check everything except left
  }
}

function collapseCell(cellPosition, canCollapse, grid){
  console.log(cellPosition)
  realCell = grid[cellPosition]
  realCell.collapsed = true
  realCell.options = [random(realCell.options)]
  canCollapse.shift()
  observe(cellPosition)
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < DIM*DIM; i++) {
    grid[i] = {
      position: i,
      collapsed: false,
      options: [0,1,2,3,4]
    }
  }
  canCollapse = structuredClone(grid)
}

function mousePressed(){
  redraw()
}

function draw() {
  background(0);
  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    if (cell.collapsed){
      image(tiles[cell.options[0]].image, (width/DIM)*(i%DIM), (Math.floor(i/DIM))*(height/DIM), width/DIM, height/DIM)
    } else {
      noFill();
      stroke(255);
      rect((width/DIM)*(i%DIM), (Math.floor(i/DIM))*(height/DIM), width/DIM, height/DIM)
    }
  }
  canCollapse.sort((cellA, cellB) => cellA.options.length - cellB.options.length)
  console.log(canCollapse)
  collapseCell(canCollapse[0].position, canCollapse, grid)
  noLoop()
}