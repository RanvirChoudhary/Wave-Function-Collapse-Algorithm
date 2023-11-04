const tileset = prompt("Which tileset do you want?")
const tiles = [];
const grid = [];
let canCollapse;
const DIM = Number(prompt("Dimensions"));
let pause = false

function mousePressed(){
  if(pause==false){
    noLoop();
    pause=true;
  }else{
    loop();
    pause = false;
  }
}

// Trying to rotate image rn unable to rotate sockets 
function rotateImage(num, imageToRotate) {
  let finalTileObject = {sockets: [], image: imageToRotate}
  const w = imageToRotate.image.width;
  const h = imageToRotate.image.height;
  const newImg = createGraphics(w, h);
  newImg.imageMode(CENTER);
  newImg.translate(w / 2, h / 2);
  newImg.rotate(HALF_PI * num);
  finalTileObject.image = newImg.image(imageToRotate.image, 0, 0);

  oldSockets = imageToRotate.sockets
  for (let i = 0; i < num; i++) {
    oldSockets.unshift(oldSockets.pop())
  }  
  finalTileObject.sockets = oldSockets
  return finalTileObject
}

function preload() {
  tiles[0] = { sockets: [0,0,0,0], image: loadImage(`tiles/${tileset}/blank.png`) }
  tiles[1] = { sockets: [1,1,0,1], image: loadImage(`tiles/${tileset}/up.png`) }
  tiles[2] = rotateImage(1, tiles[1])
  tiles[3] = rotateImage(2, tiles[1])
  tiles[4] = rotateImage(3, tiles[1])
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
}

function observe(cellPosition) {
  collapsedCell = grid[cellPosition]
  up = grid[cellPosition - DIM]
  right = grid[cellPosition + 1]
  down = grid[cellPosition + DIM]
  left = grid[cellPosition - 1]
  if (cellPosition === 0){
    checkAdjacencyRight(right, collapsedCell) 
    checkAdjacencyDown(down, collapsedCell)
  } else if (cellPosition === DIM - 1) {
    checkAdjacencyLeft(left, collapsedCell) 
    checkAdjacencyDown(down, collapsedCell)
  } else if (cellPosition === DIM*DIM - DIM) {
    checkAdjacencyUp(up, collapsedCell) 
    checkAdjacencyRight(right, collapsedCell)
  } else if (cellPosition === DIM*DIM - 1) {
    checkAdjacencyUp(up, collapsedCell) 
    checkAdjacencyLeft(left, collapsedCell)
  } else if (cellPosition < DIM) {
    checkAdjacencyRight(right, collapsedCell) 
    checkAdjacencyDown(down, collapsedCell) 
    checkAdjacencyLeft(left, collapsedCell)
  } else if (cellPosition % DIM === DIM - 1) {
    checkAdjacencyDown(down, collapsedCell) 
    checkAdjacencyUp(up, collapsedCell) 
    checkAdjacencyLeft(left, collapsedCell)
  } else if (cellPosition > DIM*DIM - (DIM + 1)) {
    checkAdjacencyUp(up, collapsedCell) 
    checkAdjacencyRight(right, collapsedCell) 
    checkAdjacencyLeft(left, collapsedCell)
  } else if (cellPosition % DIM === 0) {
    checkAdjacencyUp(up, collapsedCell) 
    checkAdjacencyRight(right, collapsedCell) 
    checkAdjacencyDown(down, collapsedCell)
  } else {
    checkAdjacencyUp(up, collapsedCell)
    checkAdjacencyRight(right, collapsedCell) 
    checkAdjacencyDown(down, collapsedCell) 
    checkAdjacencyLeft(left, collapsedCell)
  }
}

function collapseCell(cellPosition, grid){
  realCell = grid[cellPosition]
  realCell.collapsed = true
  finalChoice = random(realCell.options)
  if (Array.isArray(finalChoice) && ( finalChoice[0] === undefined || !finalChoice )) {
    noFill();
    stroke(255,0,0);
    rect((width/DIM)*(i%DIM), (Math.floor(i/DIM))*(height/DIM), width/DIM, height/DIM)
  }
  realCell.options = [finalChoice]
  observe(cellPosition)
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
}