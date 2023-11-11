const urlParams = new URLSearchParams(window.location.search);
const tileset = urlParams.get('tileset').toLowerCase();
const DIM = Number(urlParams.get('dim'));
const tiles = [];
const grid = [];
let canCollapse;
let loopPaused = false

function preload() {
  tiles[0] = { sockets: [0,0,0,0], image: loadImage(`tiles/${tileset}/blank.png`) }
  tiles[1] = { sockets: [1,1,0,1], image: loadImage(`tiles/${tileset}/up.png`) }
}

function newGrid(grid){
  for (let i = 0; i < DIM*DIM; i++) {
    grid[i] = {
      position: i,
      collapsed: false,
      options: [0,1,2,3,4]
    }
  }
}

function mousePressed(){
  if(loopPaused==false){
    noLoop();
    loopPaused=true;
  }else{
    loop();
    loopPaused = false;
  }
}

function rotateImage(imageToRotate, num) {
  let finalTileObject = { sockets: [], image: imageToRotate.image }
  const w = imageToRotate.image.width;
  const h = imageToRotate.image.height;
  const newImg = createGraphics(w, h);
  newImg.imageMode(CENTER);
  newImg.translate(w / 2, h / 2);
  newImg.rotate(HALF_PI * num);
  newImg.image(imageToRotate.image, 0, 0);

  newSockets = structuredClone(imageToRotate.sockets)
  for (let i = 0; i < num; i++) {
    newSockets.unshift(newSockets.pop())
  }  
  finalTileObject.sockets = newSockets
  finalTileObject.image = newImg
  return finalTileObject
}



function checkAdjacency(adjacentCell, collapsedCell, adjacentSocket, collapsedSocket){
  if (adjacentCell.collapsed) return true
  for (let i = 0; i < adjacentCell.options.length; i++) {
    const option = adjacentCell.options[i];
    let collapsedRespectiveSocket = tiles[collapsedCell.options[0]].sockets[collapsedSocket]
    let adjacentRespectiveSocket = tiles[option].sockets[adjacentSocket]
    if (collapsedRespectiveSocket != adjacentRespectiveSocket) {
      adjacentCell.options.splice(i, 1)
      i -= 1
    }
  }
}

function observe(cellPosition) {
  let collapsedCell = grid[cellPosition]
  up = grid[cellPosition - DIM]
  right = grid[cellPosition + 1]
  down = grid[cellPosition + DIM]
  left = grid[cellPosition - 1]
  if (cellPosition === 0){
    checkAdjacency(right, collapsedCell, 3, 1) 
    checkAdjacency(down, collapsedCell, 0, 2)
  } else if (cellPosition === DIM - 1) {
    checkAdjacency(left, collapsedCell, 1,3) 
    checkAdjacency(down, collapsedCell, 0, 2)
  } else if (cellPosition === DIM*DIM - DIM) {
    checkAdjacency(up, collapsedCell, 2, 0) 
    checkAdjacency(right, collapsedCell, 3, 1) 
  } else if (cellPosition === DIM*DIM - 1) {
    checkAdjacency(up, collapsedCell, 2, 0) 
    checkAdjacency(left, collapsedCell, 1,3) 
  } else if (cellPosition < DIM) {
    checkAdjacency(right, collapsedCell, 3, 1)
    checkAdjacency(down, collapsedCell, 0, 2) 
    checkAdjacency(left, collapsedCell, 1,3)
  } else if (cellPosition % DIM === DIM - 1) {
    checkAdjacency(down, collapsedCell, 0, 2) 
    checkAdjacency(up, collapsedCell, 2, 0) 
    checkAdjacency(left, collapsedCell, 1,3)
  } else if (cellPosition > DIM*DIM - (DIM + 1)) {
    checkAdjacency(up, collapsedCell, 2, 0) 
    checkAdjacency(right, collapsedCell, 3, 1)
    checkAdjacency(left, collapsedCell, 1,3)
  } else if (cellPosition % DIM === 0) {
    checkAdjacency(up, collapsedCell, 2, 0) 
    checkAdjacency(right, collapsedCell, 3, 1)
    checkAdjacency(down, collapsedCell, 0, 2)
  } else {
    checkAdjacency(up, collapsedCell, 2, 0) 
    checkAdjacency(right, collapsedCell, 3, 1)
    checkAdjacency(down, collapsedCell, 0, 2)
    checkAdjacency(left, collapsedCell, 1,3)
  }
}

function collapseCell(cellPosition, grid){
  realCell = grid[cellPosition]
  realCell.collapsed = true
  realCell.options = [random(realCell.options)]
  observe(cellPosition)
}

function setup() {
  let canvas = createCanvas(850, 850);
  canvas.position(windowWidth / 2 - 450, windowHeight / 2 - 425)
  newGrid(grid)
  tiles[2] = rotateImage(tiles[1], 1)
  tiles[3] = rotateImage(tiles[1], 2)
  tiles[4] = rotateImage(tiles[1], 3)
}

function draw() {
  background(0);
  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    if(!cell.options.length) newGrid(grid)
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
