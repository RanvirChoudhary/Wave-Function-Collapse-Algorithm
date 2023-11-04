const tiles = [];
let loopPaused = false

// Trying to rotate image rn unable to rotate sockets 
function rotateImage(imageToRotate, num) {
  let finalTileObject = { sockets: [], image: imageToRotate }
  const w = imageToRotate.width;
  const h = imageToRotate.height;
  const newImg = createGraphics(w, h);
  newImg.imageMode(CENTER);
  newImg.translate(w / 2, h / 2);
  newImg.rotate(HALF_PI * num);
  newImg.image(imageToRotate, 0, 0);
  finalTileObject = newImg

  newSockets = structuredClone(imageToRotate.sockets)
  for (let i = 0; i < num; i++) {
    newSockets.unshift(newSockets.pop())
  }  
  finalTileObject.sockets = newSockets
  return finalTileObject
}

function preload() {
  tileset = "demo"
  tiles[0] = { sockets: [0,0,0,0], image: loadImage(`tiles/${tileset}/blank.png`) }
  tiles[1] = { sockets: [1,1,0,1], image: loadImage(`tiles/${tileset}/up.png`) }
  tiles[2] = rotateImage(tiles[1], 1)
}

function setup() {
  let canvas = createCanvas(850, 850);
  canvas.position(windowWidth / 2 - 450, windowHeight / 2 - 425)
}

function draw(){
  console.log(tiles)
  background(100,230,0)
  image(tiles[1].image,50,50,50,50)
  image(tiles[2].image,100,100,100,100)
  noLoop()
}

