const tileset = prompt("Which tileset do you want?")
const tiles = [];
const grid = [];
let canCollapse;
const DIM = 10;

function preload() {
  tiles[0] = { sockets: [0,0,0,0], image: loadImage(`tiles/${tileset}/blank.png`) }
  tiles[1] = { sockets: [1,1,0,1], image: loadImage(`tiles/${tileset}/up.png`) }
  tiles[2] = { sockets: [1,1,1,0], image: loadImage(`tiles/${tileset}/right.png`) }
  tiles[3] = { sockets: [0,1,1,1], image: loadImage(`tiles/${tileset}/down.png`) }
  tiles[4] = { sockets: [1,0,1,1], image: loadImage(`tiles/${tileset}/left.png`) }
}

function checkAdjacencyUp(adjacentCell, collapsedCell){
  up = adjacentCell
  for (let i = 0; i < up.options.length; i++) {
    const option = up.options[i];
    let collapsedUpSocket = tiles[collapsedCell.options[0]].sockets[0]
    let upDownSocket = tiles[option].sockets[2]
    if (collapsedUpSocket != upDownSocket) {
      up.options.splice(i, 1)
      i -= 1
    }
  }
  if ( ( Array.isArray(up.options) && !up.options.length ) || ( Array.isArray(up.options) && up.options[0] === undefined ) ) {
    return { up }
  } else {
    return true
  }
}

function checkAdjacencyRight(adjacentCell, collapsedCell){
  right = adjacentCell
  for (let i = 0; i < right.options.length; i++) {
    const option = right.options[i];
    let collapsedRightSocket = tiles[collapsedCell.options[0]].sockets[1]
    let rightLeftSocket = tiles[option].sockets[3]
    if (collapsedRightSocket != rightLeftSocket) {
      right.options.splice(i, 1)
      i -= 1
    }
  }
  if ( ( Array.isArray(right.options) && !right.options.length ) || ( Array.isArray(right.options) && right.options[0] === undefined ) ) {
    return { right }
  } else {
    return true
  }
}

function checkAdjacencyDown(adjacentCell, collapsedCell){
  down = adjacentCell
  for (let i = 0; i < down.options.length; i++) {
    const option = down.options[i];
    let collapsedDownSocket = tiles[collapsedCell.options[0]].sockets[2]
    let downUpSocket = tiles[option].sockets[0]
    if (collapsedDownSocket != downUpSocket) {
      down.options.splice(i, 1)
      i -= 1
    }
  }
  if ( (Array.isArray(down.options) && !down.options.length ) || ( Array.isArray(down.options) && down.options[0] === undefined )) {
    return { down }
  } else {
    return true
  }
}

function checkAdjacencyLeft(adjacentCell, collapsedCell){
  left = adjacentCell
  for (let i = 0; i < left.options.length; i++) {
    const option = left.options[i];
    let collapsedLeftSocket = tiles[collapsedCell.options[0]].sockets[3]
    let leftRightSocket = tiles[option].sockets[1]
    if (collapsedLeftSocket != leftRightSocket) {
      left.options.splice(i, 1)
      i -= 1
    }
  }
  if ( ( Array.isArray(left.options) && !left.options.length ) || ( Array.isArray(left.options) && left.options[0] === undefined )) {
    return { left }
  } else {
    return true
  }
}

function observe(cellPosition) {
  let collapsedCell = grid[cellPosition]
  up = grid[cellPosition - DIM]
  right = grid[cellPosition + 1]
  down = grid[cellPosition + DIM]
  left = grid[cellPosition - 1]
  if (cellPosition === 0){
    if (!checkAdjacencyRight(right, collapsedCell) || !checkAdjacencyDown(down, collapsedCell)) return false

  } else if (cellPosition === DIM - 1) {
    if (!checkAdjacencyLeft(left, collapsedCell) || !checkAdjacencyDown(down, collapsedCell)) return false

  } else if (cellPosition === DIM*DIM - DIM) {
    if (!checkAdjacencyUp(up, collapsedCell) || !checkAdjacencyRight(right, collapsedCell)) return false

  } else if (cellPosition === DIM*DIM - 1) {
    if (!checkAdjacencyUp(up, collapsedCell) || !checkAdjacencyLeft(left, collapsedCell)) return false

  } else if (cellPosition < DIM) {
    if (!checkAdjacencyRight(right, collapsedCell) || !checkAdjacencyDown(down, collapsedCell) || !checkAdjacencyLeft(left, collapsedCell)) return false

  } else if (cellPosition % DIM === DIM - 1) {
    if (!checkAdjacencyDown(down, collapsedCell) || !checkAdjacencyUp(up, collapsedCell) || !checkAdjacencyLeft(left, collapsedCell)) return false

  } else if (cellPosition > DIM*DIM - (DIM + 1)) {
    if (!checkAdjacencyUp(up, collapsedCell) || !checkAdjacencyRight(right, collapsedCell) || !checkAdjacencyLeft(left, collapsedCell)) return false

  } else if (cellPosition % DIM === 0) {
    if (!checkAdjacencyUp(up, collapsedCell) || !checkAdjacencyRight(right, collapsedCell) || !checkAdjacencyDown(down, collapsedCell)) return false

  } else {
    if (!checkAdjacencyUp(up, collapsedCell) || !checkAdjacencyRight(right, collapsedCell) || !checkAdjacencyDown(down, collapsedCell) || !checkAdjacencyLeft(left, collapsedCell)) return false

  }
  return true
}

function collapseCell(cellPosition, grid){
  realCell = grid[cellPosition]
  realCell.collapsed = true
  finalChoice = random(realCell.options)
  realCell.options = [finalChoice]
  output = observe(cellPosition)
  if ( output ) {
    return true
  } else {
    realCell.options = [0,1,2,3,4]
    realCell.options.splice(finalChoice, 1)
    if (collapseCell(realCell.position, grid)) return true
  }
}

function setup() {
  let canvas = createCanvas(850, 850);
  canvas.position(windowWidth / 2 - 450,16)
  for (let i = 0; i < DIM*DIM; i++) {
    grid[i] = {
      position: i,
      collapsed: false,
      options: [0,1,2,3,4]
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    if (cell.collapsed){

      try {
        image(tiles[cell.options[0]].image, (width/DIM)*(i%DIM), (Math.floor(i/DIM))*(height/DIM), width/DIM, height/DIM)
      } catch (err) {
        console.log(cell, "Error! This is the cell that could not be collapsed")
        console.log(canCollapse, "Error This is the canCollapse at that time")
      }
    } else {
      noFill();
      stroke(255);
      rect((width/DIM)*(i%DIM), (Math.floor(i/DIM))*(height/DIM), width/DIM, height/DIM)
    }
  }
  canCollapse = structuredClone(grid)
  canCollapse.sort((cellA, cellB) => cellA.options.length - cellB.options.length)
  canCollapse = canCollapse.filter(cell => !cell.collapsed && cell.options.length !== 0)
  canCollapse = canCollapse.filter(cell => cell.options.length === canCollapse[0].options.length)
  collapseCell(random(canCollapse).position, grid)
  // noLoop() 
}