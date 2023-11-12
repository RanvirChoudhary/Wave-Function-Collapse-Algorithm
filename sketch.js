const urlParams = new URLSearchParams(window.location.search);
// const tileset = urlParams.get('tileset').toLowerCase();
// const DIM = Number(urlParams.get('dim'));
const DIM = 20
let tiles = [];
let grid = [];
let canCollapse;
let loopPaused = false

function preload() {
  tiles[0] = { sockets: ["DDD", "DDD", "DDD", "DDD"], image: loadImage("tiles/circuit-coding-train/0.png"), rotations: 0 }
  tiles[1] = { sockets: ["PPP", "PPP", "PPP", "PPP"], image: loadImage("tiles/circuit-coding-train/1.png"), rotations: 0 }
  tiles[2] = { sockets: ["PPP", "PLP", "PPP", "PPP"], image: loadImage("tiles/circuit-coding-train/2.png"), rotations: 4 }
  tiles[3] = { sockets: ["PPP", "PCP", "PPP", "PCP"], image: loadImage("tiles/circuit-coding-train/3.png"), rotations: 2 }
  tiles[4] = { sockets: ["DPP", "PLP", "PPD", "DDD"], image: loadImage("tiles/circuit-coding-train/4.png"), rotations: 4 }
  tiles[5] = { sockets: ["DPP", "PPP", "PPP", "PPD"], image: loadImage("tiles/circuit-coding-train/5.png"), rotations: 4 }
  tiles[6] = { sockets: ["PPP", "PLP", "PPP", "PLP"], image: loadImage("tiles/circuit-coding-train/6.png"), rotations: 2 }
  tiles[7] = { sockets: ["PCP", "PLP", "PCP", "PLP"], image: loadImage("tiles/circuit-coding-train/7.png"), rotations: 2 }
  tiles[8] = { sockets: ["PCP", "PPP", "PLP", "PPP"], image: loadImage("tiles/circuit-coding-train/8.png"), rotations: 4 }
  tiles[9] = { sockets: ["PLP", "PLP", "PPP", "PLP"], image: loadImage("tiles/circuit-coding-train/9.png"), rotations: 4 }
  tiles[10] = { sockets: ["PLP", "PLP", "PLP", "PLP"], image: loadImage("tiles/circuit-coding-train/10.png"), rotations: 2 }
  tiles[11] = { sockets: ["PLP", "PLP", "PPP", "PPP"], image: loadImage("tiles/circuit-coding-train/11.png"), rotations: 4 }
  tiles[12] = { sockets: ["PPP", "PLP", "PPP", "PLP"], image: loadImage("tiles/circuit-coding-train/12.png"), rotations: 2 }
}

function newGrid(){
  for (let i = 0; i < DIM*DIM; i++) {
    grid[i] = {
      position: i,
      collapsed: false,
      options: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
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
  // redraw()
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
    let adjacentRespectiveSocket = tiles[option].sockets[adjacentSocket].split("").reverse().join("")
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
  newGrid()
  initialTilesLength = tiles.length
  let tempTiles = []
  for (let i = 0; i < initialTilesLength; i++) {
    const tile = tiles[i];
    for (let j = 1; j < tile.rotations; j++) {
      tempTiles.push(rotateImage(tile, j))      
    }
  }
  tiles = tiles.concat(tempTiles)
}

function draw() {
  background(0);
  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    if(!cell.options.length){
      fill("orange")
      stroke(100);
      rect((width/DIM)*(i%DIM), (Math.floor(i/DIM))*(height/DIM), width/DIM, height/DIM)
      noLoop()
    }
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
