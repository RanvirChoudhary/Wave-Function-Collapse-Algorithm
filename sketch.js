const tiles = [];
const grid = [];
let canCollapse;
const DIM = 10;

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
    //right
    for (let i = 0; i < right.options.length; i++) {
      const option = right.options[i];
      let collapsedRightSocket = tiles[collapsedCell.options[0]].sockets[1]
      let rightLeftSocket = tiles[option].sockets[3]
      if (collapsedRightSocket != rightLeftSocket) {
        right.options.splice(i, 1)
        i -= 1
      }
    }
    // down
    for (let i = 0; i < down.options.length; i++) {
      const option = down.options[i];
      let collapsedDownSocket = tiles[collapsedCell.options[0]].sockets[2]
      let downUpSocket = tiles[option].sockets[0]
      if (collapsedDownSocket != downUpSocket) {
        down.options.splice(i, 1)
        i -= 1
      }
    }
  } else if (cellPosition === DIM - 1) {
    // left
    for (let i = 0; i < left.options.length; i++) {
      const option = left.options[i];
      let collapsedLeftSocket = tiles[collapsedCell.options[0]].sockets[3]
      let leftRightSocket = tiles[option].sockets[1]
      if (collapsedLeftSocket != leftRightSocket) {
        left.options.splice(i, 1)
        i -= 1
      }
    }
    // down
    for (let i = 0; i < down.options.length; i++) {
      const option = down.options[i];
      let collapsedDownSocket = tiles[collapsedCell.options[0]].sockets[2]
      let downUpSocket = tiles[option].sockets[0]
      if (collapsedDownSocket != downUpSocket) {
        down.options.splice(i, 1)
        i -= 1
      }
    }
  } else if (cellPosition === DIM*DIM - DIM) {
    //up
    for (let i = 0; i < up.options.length; i++) {
      const option = up.options[i];
      let collapsedUpSocket = tiles[collapsedCell.options[0]].sockets[0]
      let upDownSocket = tiles[option].sockets[2]
      if (collapsedUpSocket != upDownSocket) {
        up.options.splice(i, 1)
        i -= 1
      }
    }
    //right
    for (let i = 0; i < right.options.length; i++) {
      const option = right.options[i];
      let collapsedRightSocket = tiles[collapsedCell.options[0]].sockets[1]
      let rightLeftSocket = tiles[option].sockets[3]
      if (collapsedRightSocket != rightLeftSocket) {
        right.options.splice(i, 1)
        i -= 1
      }
    }
  } else if (cellPosition === DIM*DIM - 1) {
    //up
    for (let i = 0; i < up.options.length; i++) {
      const option = up.options[i];
      let collapsedUpSocket = tiles[collapsedCell.options[0]].sockets[0]
      let upDownSocket = tiles[option].sockets[2]
      if (collapsedUpSocket != upDownSocket) {
        up.options.splice(i, 1)
        i -= 1
      }
    }
    // left
    for (let i = 0; i < left.options.length; i++) {
      const option = left.options[i];
      let collapsedLeftSocket = tiles[collapsedCell.options[0]].sockets[3]
      let leftRightSocket = tiles[option].sockets[1]
      if (collapsedLeftSocket != leftRightSocket) {
        left.options.splice(i, 1)
        i -= 1
      }
    }
  } else if (cellPosition < DIM) {
    //right
    for (let i = 0; i < right.options.length; i++) {
      const option = right.options[i];
      let collapsedRightSocket = tiles[collapsedCell.options[0]].sockets[1]
      let rightLeftSocket = tiles[option].sockets[3]
      if (collapsedRightSocket != rightLeftSocket) {
        right.options.splice(i, 1)
        i -= 1
      }
    }
    // down
    for (let i = 0; i < down.options.length; i++) {
      const option = down.options[i];
      let collapsedDownSocket = tiles[collapsedCell.options[0]].sockets[2]
      let downUpSocket = tiles[option].sockets[0]
      if (collapsedDownSocket != downUpSocket) {
        down.options.splice(i, 1)
        i -= 1
      }
    }
    // left
    for (let i = 0; i < left.options.length; i++) {
      const option = left.options[i];
      let collapsedLeftSocket = tiles[collapsedCell.options[0]].sockets[3]
      let leftRightSocket = tiles[option].sockets[1]
      if (collapsedLeftSocket != leftRightSocket) {
        left.options.splice(i, 1)
        i -= 1
      }
    }
  } else if (cellPosition % DIM === cellPosition - 1) {
    //up
    for (let i = 0; i < up.options.length; i++) {
      const option = up.options[i];
      let collapsedUpSocket = tiles[collapsedCell.options[0]].sockets[0]
      let upDownSocket = tiles[option].sockets[2]
      if (collapsedUpSocket != upDownSocket) {
        up.options.splice(i, 1)
        i -= 1
      }
    }
    // down
    for (let i = 0; i < down.options.length; i++) {
      const option = down.options[i];
      let collapsedDownSocket = tiles[collapsedCell.options[0]].sockets[2]
      let downUpSocket = tiles[option].sockets[0]
      if (collapsedDownSocket != downUpSocket) {
        down.options.splice(i, 1)
        i -= 1
      }
    }
    // left
    for (let i = 0; i < left.options.length; i++) {
      const option = left.options[i];
      let collapsedLeftSocket = tiles[collapsedCell.options[0]].sockets[3]
      let leftRightSocket = tiles[option].sockets[1]
      if (collapsedLeftSocket != leftRightSocket) {
        left.options.splice(i, 1)
        i -= 1
      }
    }
  } else if (cellPosition > DIM*DIM - (DIM + 1)) {
    //up
    for (let i = 0; i < up.options.length; i++) {
      const option = up.options[i];
      let collapsedUpSocket = tiles[collapsedCell.options[0]].sockets[0]
      let upDownSocket = tiles[option].sockets[2]
      if (collapsedUpSocket != upDownSocket) {
        up.options.splice(i, 1)
        i -= 1
      }
    }
    //right
    for (let i = 0; i < right.options.length; i++) {
      const option = right.options[i];
      let collapsedRightSocket = tiles[collapsedCell.options[0]].sockets[1]
      let rightLeftSocket = tiles[option].sockets[3]
      if (collapsedRightSocket != rightLeftSocket) {
        right.options.splice(i, 1)
        i -= 1
      }
    }
    // left
    for (let i = 0; i < left.options.length; i++) {
      const option = left.options[i];
      let collapsedLeftSocket = tiles[collapsedCell.options[0]].sockets[3]
      let leftRightSocket = tiles[option].sockets[1]
      if (collapsedLeftSocket != leftRightSocket) {
        left.options.splice(i, 1)
        i -= 1
      }
    }
  } else if (cellPosition % DIM === 0) {
    //up
    for (let i = 0; i < up.options.length; i++) {
      const option = up.options[i];
      let collapsedUpSocket = tiles[collapsedCell.options[0]].sockets[0]
      let upDownSocket = tiles[option].sockets[2]
      if (collapsedUpSocket != upDownSocket) {
        up.options.splice(i, 1)
        i -= 1
      }
    }
    //right
    for (let i = 0; i < right.options.length; i++) {
      const option = right.options[i];
      let collapsedRightSocket = tiles[collapsedCell.options[0]].sockets[1]
      let rightLeftSocket = tiles[option].sockets[3]
      if (collapsedRightSocket != rightLeftSocket) {
        right.options.splice(i, 1)
        i -= 1
      }
    }
    // down
    for (let i = 0; i < down.options.length; i++) {
      const option = down.options[i];
      let collapsedDownSocket = tiles[collapsedCell.options[0]].sockets[2]
      let downUpSocket = tiles[option].sockets[0]
      if (collapsedDownSocket != downUpSocket) {
        down.options.splice(i, 1)
        i -= 1
      }
    }
  } else {
    //up
    for (let i = 0; i < up.options.length; i++) {
      const option = up.options[i];
      let collapsedUpSocket = tiles[collapsedCell.options[0]].sockets[0]
      let upDownSocket = tiles[option].sockets[2]
      if (collapsedUpSocket != upDownSocket) {
        up.options.splice(i, 1)
        i -= 1
      }
    }
    //right
    for (let i = 0; i < right.options.length; i++) {
      const option = right.options[i];
      let collapsedRightSocket = tiles[collapsedCell.options[0]].sockets[1]
      let rightLeftSocket = tiles[option].sockets[3]
      if (collapsedRightSocket != rightLeftSocket) {
        right.options.splice(i, 1)
        i -= 1
      }
    }
    // down
    for (let i = 0; i < down.options.length; i++) {
      const option = down.options[i];
      let collapsedDownSocket = tiles[collapsedCell.options[0]].sockets[2]
      let downUpSocket = tiles[option].sockets[0]
      if (collapsedDownSocket != downUpSocket) {
        down.options.splice(i, 1)
        i -= 1
      }
    }
    // left
    for (let i = 0; i < left.options.length; i++) {
      const option = left.options[i];
      let collapsedLeftSocket = tiles[collapsedCell.options[0]].sockets[3]
      let leftRightSocket = tiles[option].sockets[1]
      if (collapsedLeftSocket != leftRightSocket) {
        left.options.splice(i, 1)
        i -= 1
      }
    }
  }
}

function collapseCell(cellPosition, grid){
  realCell = grid[cellPosition]
  realCell.collapsed = true
  realCell.options = [random(realCell.options)]
  observe(cellPosition)
}

function setup() {
  createCanvas(800, 800);
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
  canCollapse = structuredClone(grid)
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
  let lowestEntropy;
  for (const cell of canCollapse) {
    if (cell.options.length != 1){
      lowestEntropy = cell.options.length
      break
    }
  }
  canCollapse = canCollapse.filter(cell => cell.options.length === lowestEntropy)
  console.log(canCollapse)
  collapseCell(random(canCollapse).position, grid)
  noLoop()
}