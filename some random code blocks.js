// const tiles = [];
// const grid = [];
// const DIM = 3;

// function collapseCell(cell, x, y, width, height){
//   image(random(tiles).image, x, y, width, height)
// }

// function preload() {
//   tiles[0] = { sockets: [0,0,0,0], image: loadImage("tiles/demo/blank.png") }
//   tiles[1] = { sockets: [1,1,0,1], image: loadImage("tiles/demo/up.png") }
//   tiles[2] = { sockets: [1,1,1,0], image: loadImage("tiles/demo/right.png") }
//   tiles[3] = { sockets: [0,1,1,1], image: loadImage("tiles/demo/down.png") }
//   tiles[4] = { sockets: [1,0,1,1], image: loadImage("tiles/demo/left.png") }
// }

// function setup() {
//   createCanvas(400, 400);
//   for (let i = 0; i < DIM*DIM; i++) {
//     grid[i] = {
//       collapsed: false,
//       options: [0,1,2,3,4]
//     }
//   }
// }

// function draw() {
//   background(0);
//   let canCollapse = structuredClone(grid)
//   let lowEntropy = 5;
//   for (let i = 0; i < grid.length; i++) {
//     const cell = grid[i];
//     if (cell.options.length < lowEntropy && !cell.collapsed){
//       lowEntropy = cell.options.length
//     }
//   }

//   canCollapse = canCollapse.filter((cell) => cell.options.length === lowEntropy && !cell.collapsed)
//   toCollapse = random(canCollapse)
//   collapseCell(toCollapse, )

//   noLoop()
// }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// // function compareSockets(tileArr, chosenTile, direction){
// //   let updatedOptions =[]
// //   for (let i = 0; i < tileArr.length; i++) {
// //     const currTile = tileArr[i];
// //     try {
// //       if (chosenTile.sockets[direction] === currTile.sockets[direction + 2]){
// //         updatedOptions.push(i)
// //       }
// //     } catch(err) {
// //       if (chosenTile.sockets[direction] === currTile.sockets[direction - 2]){
// //         updatedOptions.push(i)
// //       }
// //     }
// //   }
// //   return updatedOptions;
// // }

// function collapseCell(cell, x, y, width, height, index){
//     // let left = index-1
//     // let right = index+1
//     // let down = index+DIM
//     // let up = index-DIM
//     cell.collapsed = true
//     let chosenOption = random(cell.options)
//     chosenTile = tiles[chosenOption];
//     image(chosenTile.image, x, y, width, height)
//     // console.log("collapsed: " + index + "image is " + chosenOption)
//   //   if (index === grid.length - 1){
//   //     // Update left and up but not down and right
//   //     grid[up].options = compareSockets(tiles, chosenTile, 0) // up
//   //     grid[left].options = compareSockets(tiles, chosenTile, 3) // left
//   //   } else if (index === 0) {
//   //     grid[down].options = compareSockets(tiles, chosenTile, 2) // down
//   //     grid[right].options = compareSockets(tiles, chosenTile, 1) // right
//   //   } else if (index < DIM) {
//   //     grid[down].options = compareSockets(tiles, chosenTile, 2) // down
//   //     grid[right].options = compareSockets(tiles, chosenTile, 1) // right
//   //     grid[left].options = compareSockets(tiles, chosenTile, 3) // left
//   //   } else if (index > (width/DIM)*(DIM-1)) {
//   //     grid[up].options = compareSockets(tiles, chosenTile, 0) // up
//   //     grid[right].options = compareSockets(tiles, chosenTile, 1) // right
//   //     grid[left].options = compareSockets(tiles, chosenTile, 3) // left
//   //   } else if (index < (width/DIM)*(DIM-1) && index > DIM){
//   //     grid[up].options = compareSockets(tiles, chosenTile, 0) // up
//   //     grid[right].options = compareSockets(tiles, chosenTile, 1) // right
//   //     grid[down].options = compareSockets(tiles, chosenTile, 2) // down
//   //     grid[left].options = compareSockets(tiles, chosenTile, 3) // left
//   //   }
//   // } .log(grid[index].options)
//   // }
// }

// function preload() {
//   tiles[0] = { sockets: [0,0,0,0], image: loadImage("tiles/roads/blank.png") }
//   tiles[1] = { sockets: [1,1,0,1], image: loadImage("tiles/roads/up.png") }
//   tiles[2] = { sockets: [1,1,1,0], image: loadImage("tiles/roads/right.png") }
//   tiles[3] = { sockets: [0,1,1,1], image: loadImage("tiles/roads/down.png") }
//   tiles[4] = { sockets: [1,0,1,1], image: loadImage("tiles/roads/left.png") }
//   console.log("Loaded!")
// }

// function setup() {
//   createCanvas(400, 400);
//   for (let i = 0; i < DIM*DIM; i++) {
//     grid[i] = {
//       collapsed: false,
//       options: [0,1,2,3,4]
//     }
//   }
// }

// function draw() {

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const tiles = [];
const grid = [];
<<<<<<< Updated upstream
const DIM = 3;
=======
const DIM = 5;
>>>>>>> Stashed changes

// function compareSockets(tileArr, chosenTile, direction){
//   let updatedOptions =[]
//   for (let i = 0; i < tileArr.length; i++) {
//     const currTile = tileArr[i];
//     try {
//       if (chosenTile.sockets[direction] === currTile.sockets[direction + 2]){
//         updatedOptions.push(i)
//       }
//     } catch(err) {
//       if (chosenTile.sockets[direction] === currTile.sockets[direction - 2]){
//         updatedOptions.push(i)
//       }
//     }
//   }
//   return updatedOptions;
// }

function collapseCell(cell, x, y, width, height, index){
    // let left = index-1
    // let right = index+1
    // let down = index+DIM
    // let up = index-DIM
    cell.collapsed = true
    let chosenOption = random(cell.options)
    chosenTile = tiles[chosenOption];
    image(chosenTile.image, x, y, width, height)
    // console.log("collapsed: " + index + "image is " + chosenOption)
  //   if (index === grid.length - 1){
  //     // Update left and up but not down and right
  //     grid[up].options = compareSockets(tiles, chosenTile, 0) // up
  //     grid[left].options = compareSockets(tiles, chosenTile, 3) // left
  //   } else if (index === 0) {
  //     grid[down].options = compareSockets(tiles, chosenTile, 2) // down
  //     grid[right].options = compareSockets(tiles, chosenTile, 1) // right
  //   } else if (index < DIM) {
  //     grid[down].options = compareSockets(tiles, chosenTile, 2) // down
  //     grid[right].options = compareSockets(tiles, chosenTile, 1) // right
  //     grid[left].options = compareSockets(tiles, chosenTile, 3) // left
  //   } else if (index > (width/DIM)*(DIM-1)) {
  //     grid[up].options = compareSockets(tiles, chosenTile, 0) // up
  //     grid[right].options = compareSockets(tiles, chosenTile, 1) // right
  //     grid[left].options = compareSockets(tiles, chosenTile, 3) // left
  //   } else if (index < (width/DIM)*(DIM-1) && index > DIM){
  //     grid[up].options = compareSockets(tiles, chosenTile, 0) // up
  //     grid[right].options = compareSockets(tiles, chosenTile, 1) // right
  //     grid[down].options = compareSockets(tiles, chosenTile, 2) // down
  //     grid[left].options = compareSockets(tiles, chosenTile, 3) // left
  //   }
  // } .log(grid[index].options)
  // }
}

function preload() {
  tiles[0] = { sockets: [0,0,0,0], image: loadImage("tiles/roads/blank.png") }
  tiles[1] = { sockets: [1,1,0,1], image: loadImage("tiles/roads/up.png") }
  tiles[2] = { sockets: [1,1,1,0], image: loadImage("tiles/roads/right.png") }
  tiles[3] = { sockets: [0,1,1,1], image: loadImage("tiles/roads/down.png") }
  tiles[4] = { sockets: [1,0,1,1], image: loadImage("tiles/roads/left.png") }
  console.log("Loaded!")
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
<<<<<<< Updated upstream
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
=======
  background(255);
  var minEntropy = 5;
  let gridCopy = structuredClone(grid)

  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    if (cell.options.length < minEntropy && !cell.collapsed) {
      minEntropy = cell.options.length;
    }
  }

  gridCopy = gridCopy.map((cell) => {
    if (cell.options.length === minEntropy && !cell.collapsed){
      cell.collapseThisIteration = true
    }
    return cell
  })

  indexesToCollapse = []
  for (let i = 0; i < gridCopy.length; i++) {
    const cell = gridCopy[i];
    if (cell.collapseThisIteration === true && !cell.collapsed) {
      indexesToCollapse.push(i)
    }
  }

  chosenIndex = random(indexesToCollapse)
  collapseCell(grid[chosenIndex], (chosenIndex % DIM)*(width/DIM), (Math.floor(chosenIndex / DIM))*(height/DIM), width/DIM, height/DIM, chosenIndex)
>>>>>>> Stashed changes

  noLoop()
}