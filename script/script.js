// function login(showhide) {
//   if (showhide == "show") {
//     document.getElementById("popupbox").style.visibility = "visible";
//   } else if (showhide == "hide") {
//     document.getElementById("popupbox").style.visibility = "hidden";
//   }
// }
// -------------constant----------------
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];


// --------apps state(variables)--------
let shipsDetails = [
  { name: "carrier", length: 5 ,color: 'green' ,cor:''},
  { name: "battleship", length: 4, color: 'red' , cor: ''},
  { name: "submarine", length: 3, color: 'yellow',cor: '' },
  { name: "cruiser", length: 3, color: 'darkblue',cor: ''},
  { name: "destroyer", length: 2, color:'blue',cor: '' },
];








let selectedShipLenght
let randomCellUp = []  
let randomCellRight = []
let randomCellDown = []
let randomCellLeft =[]
let computerPlacedShips =[]
let PlayerPlacedShips = []
let shipSide=[]
let shipsLength =[]
let shipsColor = []
//--------cached element refrence-------

//-----------event listnener------------

// ------------------------function ----------------

// -------------constant----------------

// --------apps state(variables)--------

//--------cached element refrence-------

let playerRandom = document.getElementById("player-random-game-button");
let computerTableEl = document.querySelectorAll(".computer-cell");
let playerTableEl = document.querySelectorAll(".player-cell");
let ships = document.querySelectorAll(".ships");
let playerCells = document.querySelectorAll(".player-cell");

//-----------event listnener------------

playerRandom.addEventListener("click", playerRandomShip);

// playerTableEl.forEach(function (pCell) {
//   pCell.addEventListener("click", playClick);
// });

// ships.forEach(function (ship) {
//   ship.addEventListener("click", selectShip);
// });

// // ------------------------function ----------------
// 

function randomShip(playingTable,playerLetter){
  randomCell(playerLetter)

  checkRandomCellOk(playingTable)

  
  let putShip =shipSide[Math.floor(Math.random()*shipSide.length)]


  if(shipSide.length<1){
    return
  }
  

  putShip.forEach(function(putCell){  
    document.getElementById(putCell).classList.add(shipsColor[0])
    document.getElementById(putCell).classList.add('ship')
  })
  
  putShip=[]
  randomCellUp = []  
  randomCellRight = []
  randomCellDown = []
  randomCellLeft =[]
  shipSide=[]
  shipsLength.shift()
  shipsColor.shift()


  
   
}

function randomCell(playerLetter){
  let randomCell = rows[Math.floor(Math.random() * rows.length)] + columns[Math.floor(Math.random() * columns.length)]
  splitRandomCell = splitCellId(randomCell)
  console.log(playerLetter)
  for( let i = 0 ; i < shipsLength[0]  ; i++){
    
      randomCellUp.push((playerLetter+rows[rows.indexOf(splitRandomCell[0])-i])+splitRandomCell[1])
      randomCellRight.push(playerLetter+splitRandomCell[0]+columns[columns.indexOf(splitRandomCell[1])+i])
      randomCellDown.push(playerLetter+rows[rows.indexOf(splitRandomCell[0])+i]+splitRandomCell[1])
      randomCellLeft.push(playerLetter+splitRandomCell[0]+columns[columns.indexOf(splitRandomCell[1])-i])
    
   
    }
 
}
function checkRandomCellOk(playingTable){
  randomCellUp.forEach(function(cell){
    if(cell.includes('undefined')){
      randomCellUp = []
    }
  })
  randomCellRight.forEach(function(cell){
    if(cell.includes('undefined')){
      randomCellRight = []
    }

  })
  randomCellDown.forEach(function(cell){
    if(cell.includes('undefined')){
      randomCellDown = []
    }

  })
  randomCellLeft.forEach(function(cell){
    if(cell.includes('undefined')){
      randomCellLeft = []
    }

  })
  randomCellUp.forEach(function(id){
    if(document.getElementById(id).classList.contains('ship') == true){
      randomCellUp =[]
    }
  })
  randomCellRight.forEach(function(id){
    if(document.getElementById(id).classList.contains('ship') ==true){
      randomCellRight =[]
    }
  })
  randomCellDown.forEach(function(id){
    if(document.getElementById(id).classList.contains('ship') ==true){
      randomCellDown =[]
    }
  })
  randomCellLeft.forEach(function(id){
    if(document.getElementById(id).classList.contains('ship') ==true){
      randomCellLeft =[]
    }
  })
  if(randomCellUp.length){
    shipSide.push(randomCellUp)
  }if(randomCellRight.length>0){
    shipSide.push(randomCellRight)
  }if(randomCellDown.length>0){
    shipSide.push(randomCellDown)
  }if(randomCellLeft.length>0){
    shipSide.push(randomCellLeft)
  }
}


function splitCellId(cellId){
 return cellId.split('')
}
  
function init() {
  computerRandomShip()
}


function computerRandomShip(){
  shipsDetails.forEach(function(ship){
    shipsLength.push(ship.length )
  })
  shipsDetails.forEach(function(ship){
    shipsColor.push(ship.color)
  })
  console.log(shipsLength.length)
  
  while(shipsLength.length >0){
    randomShip(playerTableEl , 'C')
  }

}

function playerRandomShip(){
  playerTableEl.forEach(function(elm){
    elm.className = 'player-cell'
  })
  shipsDetails.forEach(function(ship){
    shipsLength.push(ship.length )
  })
  shipsDetails.forEach(function(ship){
    shipsColor.push(ship.color)
  })
  console.log(shipsLength.length)
  
  while(shipsLength.length >0){
    randomShip(playerTableEl , 'P')
  }

}



init();
