const tileset = prompt("Which tileset do you want?")
const tiles = [];
const grid = [];
let canCollapse;
const DIM = Number(prompt("Dimensions"));
let loopPaused = false

function mousePressed(){
  if(loopPaused==false){
    noLoop();
    loopPaused=true;
  }else{
    loop();
    loopPaused = false;
  }
}

// // Trying to rotate image rn unable to rotate sockets 
// function rotateImage(imageToRotate, num) {
//   let finalTileObject = {sockets: [], image: imageToRotate}
//   const w = imageToRotate.image.width;
//   const h = imageToRotate.image.height;
//   const newImg = createGraphics(w, h);
//   newImg.imageMode(CENTER);
//   newImg.translate(w / 2, h / 2);
//   newImg.rotate(HALF_PI * num);
//   newImg.image(imageToRotate.image, 0, 0);
//   finalTileObject.image = newImg

//   oldSockets = imageToRotate.sockets
//   for (let i = 0; i < num; i++) {
//     oldSockets.unshift(oldSockets.pop())
//   }  
//   finalTileObject.sockets = oldSockets
//   return finalTileObject
// }


function preload() {
  tiles[0] = { sockets: [0,0,0,0], image: loadImage(`tiles/${tileset}/blank.png`) }
  tiles[1] = { sockets: [1,1,0,1], image: loadImage(`tiles/${tileset}/up.png`) }
  tiles[2] = { sockets: [1,1,1,0], image: loadImage(`tiles/${tileset}/right.png`) }
  tiles[3] = { sockets: [0,1,1,1], image: loadImage(`tiles/${tileset}/down.png`) }
  tiles[4] = { sockets: [1,0,1,1], image: loadImage(`tiles/${tileset}/left.png`) }
}

function checkAdjacencyUp(adjacentCell, collapsedCell){
  if (adjacentCell.collapsed) return true
  if (!adjacentCell.options.length) return false
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
  if(!up.options.length){
    return false
  } else {
    return true
  }
}

function checkAdjacencyRight(adjacentCell, collapsedCell){
  if (adjacentCell.collapsed) return true
  if (!adjacentCell.options.length) return false
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
  if(!right.options.length){
    return false
  } else {
    return true
  }
}

function checkAdjacencyDown(adjacentCell, collapsedCell){
  if (adjacentCell.collapsed) return true
  if (!adjacentCell.options.length) return false
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
  if(!down.options.length){
    return false
  } else {
    return true
  }
}

function checkAdjacencyLeft(adjacentCell, collapsedCell){
  if (adjacentCell.collapsed) return true
  if (!adjacentCell.options.length) return false
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
  if(!left.options.length){
    return false
  } else {
    return true
  }
}

function observe(cellPosition) {
  collapsedCell = grid[cellPosition]
  up = grid[cellPosition - DIM]
  right = grid[cellPosition + 1]
  down = grid[cellPosition + DIM]
  left = grid[cellPosition - 1]
  if (cellPosition === 0){
    return checkAdjacencyRight(right, collapsedCell) && checkAdjacencyDown(down, collapsedCell) ? true : false
  } else if (cellPosition === DIM - 1) {
    return checkAdjacencyLeft(left, collapsedCell) && checkAdjacencyDown(down, collapsedCell) ? true : false
  } else if (cellPosition === DIM*DIM - DIM) {
    return checkAdjacencyUp(up, collapsedCell) && checkAdjacencyRight(right, collapsedCell) ? true : false
  } else if (cellPosition === DIM*DIM - 1) {
    return checkAdjacencyUp(up, collapsedCell) && checkAdjacencyLeft(left, collapsedCell) ? true : false
  } else if (cellPosition < DIM) {
    return checkAdjacencyRight(right, collapsedCell) && checkAdjacencyDown(down, collapsedCell) && checkAdjacencyLeft(left, collapsedCell) ? true : false
  } else if (cellPosition % DIM === DIM - 1) {
    return checkAdjacencyDown(down, collapsedCell) && checkAdjacencyUp(up, collapsedCell) && checkAdjacencyLeft(left, collapsedCell) ? true : false
  } else if (cellPosition > DIM*DIM - (DIM + 1)) {
    return checkAdjacencyUp(up, collapsedCell) && checkAdjacencyRight(right, collapsedCell) && checkAdjacencyLeft(left, collapsedCell) ? true : false
  } else if (cellPosition % DIM === 0) {
    return checkAdjacencyUp(up, collapsedCell) && checkAdjacencyRight(right, collapsedCell) && checkAdjacencyDown(down, collapsedCell) ? true : false
  } else {
    return checkAdjacencyUp(up, collapsedCell) && checkAdjacencyRight(right, collapsedCell) && checkAdjacencyDown(down, collapsedCell) && checkAdjacencyLeft(left, collapsedCell) ? true : false
  }
}

function collapseCell(cellPosition, grid){
  realCell = grid[cellPosition]
  realCell.collapsed = true
  finalChoice = random(realCell.options)
  realCell.options = [finalChoice]
  observeNotFine = !observe(cellPosition)
  if (observeNotFine){
    console.log("Eliminated")
  }
}

function setup() {
  let canvas = createCanvas(850, 850);
  canvas.position(windowWidth / 2 - 450, windowHeight / 2 - 425)
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
      image(tiles[cell.options[0]].image, (width/DIM)*(i%DIM), (Math.floor(i/DIM))*(height/DIM), width/DIM, height/DIM)
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
