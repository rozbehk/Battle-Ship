// function login(showhide) {
//   if (showhide == "show") {
//     document.getElementById("popupbox").style.visibility = "visible";
//   } else if (showhide == "hide") {
//     document.getElementById("popupbox").style.visibility = "hidden";
//   }
// }
// -------------constant----------------
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const shipsDetails = [
  { name: "carrier", length: 5 },
  { name: "battleship", length: 4 },
  { name: "submarine", length: 3 },
  { name: "cruiser", length: 3 },
  { name: "destroyer", length: 2 },
];

// --------apps state(variables)--------
let computerTable;
let playerTable;
let selectedShip;
let sellectedCellId;
let selecteCell;
let selectedShipLenght;
let cruiserCor;
let battleshipCor;
let carrierCor;
let destroyerCor;
let submarineCor;
let cellRighCor;
let cellUpCor;
let cellLeftCor;
let cellDownCor;
let clicks;
let selectedShipIds;
//--------cached element refrence-------

//-----------event listnener------------

// ------------------------function ----------------

// -------------constant----------------

// --------apps state(variables)--------

//--------cached element refrence-------

let restartButtonEl = document.getElementById("restart-game-button");
let startButtonEl = document.getElementById("start-game-button");
let computerTableEl = document.querySelectorAll(".computer-cell");
let playerTableEl = document.querySelectorAll(".player-cell");
let ships = document.querySelectorAll(".ships");
let playerCells = document.querySelectorAll(".player-cell");

//-----------event listnener------------

startButtonEl.addEventListener("click", startGame);
restartButtonEl.addEventListener("click", restartGame);
playerTableEl.forEach(function (pCell) {
  pCell.addEventListener("click", playClick);
});

ships.forEach(function (ship) {
  ship.addEventListener("click", selectShip);
});

// // ------------------------function ----------------

function init() {
  playerTableEl.forEach(function (cell) {
    cell.innerHTML = cell.id;
  });

  playerTable = [];
  computerTable = [];
  selectedShip = undefined;
  selectedShipId = undefined;
  cellRighCor = [];
  cellDownCor = [];
  cellUpCor = [];
  cellLeftCor = [];
  let cruiserCor = [];
  battleshipCor = [];
  carrierCor = [];
  destroyerCor = [];
  submarineCor = [];
  cellRighCor = [];
  cellUpCor = [];
  cellLeftCor = [];
  cellDownCor = [];
  clicks = [];
  for (let i = 0; i < rows.length; i++) {
    for (var j = 1; j <= rows.length; j++) {
      computerTable.push({
        userTableId: "C",
        row: rows[i],
        colomn: j,
        acc: false,
        ship: false,
        hit: false,
      });
      playerTable.push({
        userTableId: "P",
        row: rows[i],
        colomn: j,
        acc: false,
        ship: false,
        hit: false,
      });
    }
  }
}

function startGame() {
  startButtonEl.className = "hidden";
  restartButtonEl.className = "restart-button";
}

function selectShip() {
  if (this.className == "ships") {
    selectedShip = this.id;
    this.className = "selected";
    ships.forEach(function (ship) {
      disableEnablePlayerTable();
    });
    for (let i = 0; i < shipsDetails.length; i++) {
      if (shipsDetails[i].name == this.id) {
        selectedShipLenght = shipsDetails[i].length;
      }
    }
  } else if (this.className == "selected") {
    this.className = "ships";
    ships.forEach(function (ship) {
      if (ship.className == "disable") {
        ship.className = "ships";
        selectedShip = undefined;
      }
      disableEnablePlayerTable();
    });
  } else {
    return;
  }
}

function placingShip() {
  let strSlice = sellectedCellId.split("");
  strSlice[1] = Number(strSlice[1]); //row//
  strSlice[0] = Number(strSlice[0]); //column

  if (
    strSlice[1] + 1 < selectedShipLenght && // row//
    strSlice[0] + 1 < selectedShipLenght // column//
  ) {
    shipDirection("top-left");
  } else if (
    strSlice[1] + 1 < selectedShipLenght && // row//
    strSlice[0] > 10 - selectedShipLenght // column//
  ) {
    shipDirection("bottom-left");
  } else if (
    strSlice[1] > 10 - selectedShipLenght && // row//
    strSlice[0] > 10 - selectedShipLenght // column//
  ) {
    shipDirection("bottom-right");
  } else if (
    strSlice[1] > 10 - selectedShipLenght && // row//
    strSlice[0] + 1 < selectedShipLenght // column//
  ) {
    shipDirection("top-right");
  } else if (strSlice[1] < selectedShipLenght - 1) {
    shipDirection("left");
  } else if (strSlice[1] > 10 - selectedShipLenght) {
    shipDirection("right");
  } else if (strSlice[0] > 10 - selectedShipLenght) {
    shipDirection("down");
  } else if (strSlice[0] + 1 < selectedShipLenght) {
    shipDirection("up");
  } else {
    shipDirection("middle");
  }
}

function shipDirection(cellZone) {
  cellRighCor;
  let cellIdNumber = Number(sellectedCellId);
  let cellIdString;

  if (cellZone == "top-left") {
    cellRighCor.push(clicks[0]);
    cellDownCor.push(clicks[0]);
    //right
    for (let i = 1; i < selectedShipLenght; i++) {
      if (cellIdNumber < 10) {
        cellIdString = `0${cellIdNumber + i}`.toString();
        cellRighCor.push(cellIdString);
      } else {
        cellIdString = (cellIdNumber + i).toString();
        cellRighCor.push(cellIdString);
      }

      // if (document.getElementById(cellIdString).classList.contains("ship")) {
      //   cellRighCor = [];
      //   console.log[cellRighCor];
      //   break;
      // } else {
      //   document.getElementById(cellIdString).style.backgroundImage = `url(
      //     /img/${selectedShip}-${i}.png)`;
      //   document.getElementById(cellIdString).classList.remove("disable");
      //   document.getElementById(cellIdString).classList.add("background-right");
      // }
    }
    console.log(cellRighCor);
    for (let i = 0; i < cellRighCor.length; i++) {
      console.log(cellRighCor[i]);
    }
    //down
    for (let i = 1; i < selectedShipLenght; i++) {
      // cellIdString = (cellIdNumber + i * 10).toString();
      // cellDownCor.push(cellIdString);
      if (cellIdNumber == 0) {
        cellIdString = (1 * (i * 10)).toString();
        cellDownCor.push(cellIdString);
      } else {
        cellIdString = (cellIdNumber + i * 10).toString();
        cellDownCor.push(cellIdString);
      }
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellDownCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.add("background-down");
      }
    }
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
  } else if (cellZone == "bottom-left") {
    cellRighCor.push(clicks[0]);
    cellUpCor.push(clicks[0]);

    //right

    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber + i).toString();
      cellRighCor.push(cellIdString);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellRighCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-right");
      }
    }
    //up
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();
      cellUpCor.push(cellIdString);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellUpCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-up");
      }
    }

    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
  } else if (cellZone == "bottom-right") {
    cellUpCor.push(clicks[0]);
    cellLeftCor.push(clicks[0]);
    //left
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i).toString();
      cellLeftCor.push(cellIdString);
      console.log(cellLeftCor);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellLeftCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-left");
      }
    }
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();
      cellUpCor.push(cellIdString);
      //up
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellUpCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-up");
      }
    }
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
  } else if (cellZone == "top-right") {
    cellDownCor.push(clicks[0]);
    cellLeftCor.push(clicks[0]);
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i).toString();
      //left
      if (cellIdNumber < 10) {
        cellIdString = `0${cellIdNumber - i}`.toString();
        cellLeftCor.push(cellIdString);
      } else {
        cellIdString = (cellIdNumber - i).toString();
        cellLeftCor.push(cellIdString);
      }
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellLeftCor = [];
        return;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-left");
      }
    }
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber + i * 10).toString();
      cellDownCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellDownCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-down");
      }
    }
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
  } else if (cellZone == "middle") {
    cellRighCor.push(clicks[0]);
    cellDownCor.push(clicks[0]);
    cellUpCor.push(clicks[0]);
    cellLeftCor.push(clicks[0]);
    //up
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();

      if (Number(cellIdString) < 10) {
        cellIdString = 0 + cellIdString;
      } else {
      }
      cellUpCor.push(cellIdString);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellUpCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-up");
      }
    }
    //down
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();
      if (cellIdNumber < 10) {
        cellIdString = `0${cellIdNumber + i * 10}`.toString();
        cellDownCor.push(cellIdString);
      } else {
        cellIdString = (cellIdNumber + i * 10).toString();
        cellDownCor.push(cellIdString);
      }

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellDownCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-down");
      }
    }
    //right
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber + i).toString();
      cellRighCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellRighCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-right");
      }
    }
    //left
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i).toString();
      cellLeftCor.push(cellIdString);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellLeftCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-left");
      }
    }
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
  } else if (cellZone == "left") {
    cellRighCor.push(clicks[0]);
    cellDownCor.push(clicks[0]);
    cellUpCor.push(clicks[0]);

    //up
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();
      if (cellIdString.length < 2) {
        cellUpCor.push(`0${cellIdString}`);
      } else {
        cellUpCor.push(cellIdString);
      }

      if (Number(cellIdString) < 10) {
        cellIdString = 0 + cellIdString;
      }

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellUpCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-up");
      }
      console.log(cellUpCor);
    }
    //down
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();
      if (cellIdNumber < 10) {
        cellIdString = `0${cellIdNumber + i * 10}`.toString();
        cellDownCor.push(cellIdString);
      } else {
        cellIdString = (cellIdNumber + i * 10).toString();
      }
      cellDownCor.push(cellIdString);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellDownCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-down");
      }
    }
    //right
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber + i).toString();
      cellRighCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellRighCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-right");
      }
    }
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
  } else if (cellZone == "down") {
    cellRighCor.push(clicks[0]);
    cellDownCor.push(clicks[0]);

    cellLeftCor.push(clicks[0]);
    //up
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();

      if (Number(cellIdString) < 10) {
        cellIdString = 0 + cellIdString;
      }
      cellUpCor.push(cellIdString);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellUpCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-up");
      }
    }
    //right
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber + i).toString();
      cellRighCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellRighCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-right");
      }
    }
    //left
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i).toString();
      cellLeftCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellLeftCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-left");
      }
    }
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
  } else if (cellZone == "right") {
    cellDownCor.push(clicks[0]);
    cellUpCor.push(clicks[0]);
    cellLeftCor.push(clicks[0]);

    //left
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i).toString();
      cellLeftCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellLeftCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-left");
      }
    }

    //up
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();

      if (Number(cellIdString) < 10) {
        cellIdString = 0 + cellIdString;
      }
      cellUpCor.push(cellIdString);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellUpCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-up");
      }
    }
    //down

    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i * 10).toString();
      if (cellIdNumber < 10) {
        cellIdString = `0${cellIdNumber + i * 10}`.toString();
      } else {
        cellIdString = (cellIdNumber + i * 10).toString();
      }
      cellDownCor.push(cellIdString);

      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellDownCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-down");
      }
      console.log(
        "left " + cellLeftCor + " up " + cellUpCor + " down " + cellDownCor
      );
    }
    console.log(
      "left: " +
        cellLeftCor +
        " right: " +
        cellRighCor +
        " up: " +
        cellUpCor +
        " dwon: " +
        cellDownCor
    );
  } else if (cellZone == "up") {
    cellRighCor.push(clicks[0]);
    cellDownCor.push(clicks[0]);

    cellLeftCor.push(clicks[0]);
    //right
    for (let i = 1; i < selectedShipLenght; i++) {
      if (cellIdNumber < 10) {
        cellIdString = `0${cellIdNumber + i}`.toString();
      } else {
        cellIdString = (cellIdNumber + i).toString();
      }
      cellRighCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellRighCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-right");
      }
    }
    //left
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber - i).toString();

      if (cellIdNumber < 10) {
        cellIdString = `0${cellIdNumber - i}`.toString();
      } else {
        cellIdString = (cellIdNumber - i).toString();
      }
      cellLeftCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellLeftCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.remove("disable");
        document.getElementById(cellIdString).classList.add("background-left");
      }
    }
    //down
    for (let i = 1; i < selectedShipLenght; i++) {
      cellIdString = (cellIdNumber + i * 10).toString();
      cellDownCor.push(cellIdString);
      if (document.getElementById(cellIdString).classList.contains("ship")) {
        cellDownCor = [];
        break;
      } else {
        document.getElementById(cellIdString).style.backgroundImage = `url(
          /img/${selectedShip}-${i}.png)`;
        document.getElementById(cellIdString).classList.add("background-down");
      }
    }
  }
  console.log(
    "left: " +
      cellLeftCor +
      " right: " +
      cellRighCor +
      " up: " +
      cellUpCor +
      " dwon: " +
      cellDownCor
  );
}

function disableEnablePlayerTable() {
  document.getElementById("player-table").classList.toggle("disable");
}
function hitCell() {}

function restartGame() {
  userChoice = prompt(
    'ARE YOU SURE YOU WANT TO RESTART THE GAME? ENTER "Y" To CONFIRM!!!'
  ).toLocaleLowerCase();

  if (userChoice == "y") {
    playerTableEl.forEach(function (elm) {
      elm.style.background = "none";
      startButtonEl.className = "start-button";
      restartButtonEl.className = "hidden";
    });
  } else {
    return;
  }
}

function playClick() {
  clicks.push(this.id);
  sellectedCellId = this.id;

  if (clicks.length == 1 && clicks[0] == this.id) {
    console.log("start placing ship");
    placingShip();
  } else if (
    cellRighCor.includes(this.id) ||
    cellDownCor.includes(this.id) ||
    cellUpCor.includes(this.id) ||
    cellLeftCor.includes(this.id)
  ) {
    console.log("ship placed");
    // addShip();
  } else if (
    clicks[0] !== this.id &&
    !cellRighCor.includes(this.id) &&
    !cellDownCor.includes(this.id) &&
    !cellLeftCor.includes(this.id) &&
    !cellUpCor.includes(this.id)
  ) {
    console.log("moving ship");
    console.log(clicks);

    clicks = [];
    clicks.push(this.id);
    moveShip();
    placingShip();
  } else {
    console.log("nothing happend");
  }
}
function moveShip() {
  if (cellRighCor.length > 0) {
    cellRighCor.forEach(function (id) {
      if (document.getElementById(id).classList.contains("ship")) {
        return;
      } else {
        document.getElementById(id).style.backgroundColor = "none";
        document.getElementById(id).classList.remove("background-right");
        cellRighCor = [];
      }
    });
  }
  if (cellDownCor.length > 0) {
    cellDownCor.forEach(function (id) {
      document.getElementById(id).style.removeProperty("background-image");
      document.getElementById(id).classList.remove("background-down");
      cellDownCor = [];
    });
  }

  if (cellLeftCor.length > 0) {
    cellLeftCor.forEach(function (id) {
      document.getElementById(id).style.removeProperty("background-image");
      document.getElementById(id).classList.remove("background-left");
      cellLeftCor = [];
    });
  }

  if (cellUpCor.length > 0) {
    cellUpCor.forEach(function (id) {
      document.getElementById(id).style.removeProperty("background-image");
      document.getElementById(id).classList.remove("background-up");
      cellUpCor = [];
    });
  }
}
function addShip() {
  if (cellRighCor.includes(clicks[clicks.length - 1])) {
    cellRighCor.forEach(function (id) {
      document.getElementById(id).classList = "ship background-right disable";
    });
    document.getElementById(clicks[0]).style.backgroundImage = `url(
      /img/${selectedShip}-0.png)`;
    document.getElementById(selectedShip).className = "invisible";

    if (cellDownCor.length > 0) {
      cellDownCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-down");
        cellDownCor = [];
      });
    }

    if (cellLeftCor.length > 0) {
      cellLeftCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-left");
        cellLeftCor = [];
      });
    }

    if (cellUpCor.length > 0) {
      cellUpCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-up");
        cellUpCor = [];
      });
    }
    ships.forEach(function (ship) {
      if (ship.classList.contains("disable")) {
        ship.className = "ships";
        selectedShip = undefined;
      }
      disableEnablePlayerTable();
    });
  } else if (cellDownCor.includes(clicks[clicks.length - 1])) {
    if (cellRighCor.length > 0) {
      cellRighCor.forEach(function (id) {
        document.getElementById(id).style.backgroundColor = "none";
        document.getElementById(id).classList.remove("background-right");
        cellRighCor = [];
      });
    }

    if (cellLeftCor.length > 0) {
      cellLeftCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-left");
        cellLeftCor = [];
      });
    }

    if (cellUpCor.length > 0) {
      cellUpCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-up");
        cellUpCor = [];
      });
    }
  } else if (cellLeftCor.includes(clicks[clicks.length - 1])) {
    if (cellRighCor.length > 0) {
      cellRighCor.forEach(function (id) {
        document.getElementById(id).style.backgroundColor = "none";
        document.getElementById(id).classList.remove("background-right");
        cellRighCor = [];
      });
    }
    if (cellDownCor.length > 0) {
      cellDownCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-down");
        cellDownCor = [];
      });
    }

    if (cellUpCor.length > 0) {
      cellUpCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-up");
        cellUpCor = [];
      });
    }
  } else if (cellUpCor.includes(clicks[clicks.length - 1])) {
    if (cellRighCor.length > 0) {
      cellRighCor.forEach(function (id) {
        document.getElementById(id).style.backgroundColor = "none";
        document.getElementById(id).classList.remove("background-right");
        cellRighCor = [];
      });
    }
    if (cellDownCor.length > 0) {
      cellDownCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-down");
        cellDownCor = [];
      });
    }

    if (cellLeftCor.length > 0) {
      cellLeftCor.forEach(function (id) {
        document.getElementById(id).style.removeProperty("background-image");
        document.getElementById(id).classList.remove("background-left");
        cellLeftCor = [];
      });
    }
  }
  cellLeftCor = [];
}

init();
