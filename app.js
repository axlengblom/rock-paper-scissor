const root = document.getElementById("root");

const playerOneBox = document.createElement("div");
const playerTwoBox = document.createElement("div");

let playerOneBoxScore = document.getElementById("playerOneScore");
let playerTwoBoxScore = document.getElementById("playerTwoScore");

root.appendChild(playerOneBox);
root.appendChild(playerTwoBox);

const rock = "far fa-hand-rock fa-9x",
  paper = "far fa-hand-paper fa-9x",
  scissors = "far fa-hand-scissors fa-9x";

const choices = [rock, paper, scissors];

let controlPlayer = false;

let hit = 0;

let playerOneScore = 0,
  playerTwoScore = 0;

let playerOneChoice, playerTwoChoice;

playerOneBox.className = choices[2];
playerTwoBox.className = choices[2];
playerOneBoxScore.innerText = "Player 1: " + playerOneScore;
playerTwoBoxScore.innerText = "Player 2: " + playerTwoScore;

const playerChoose = () => {
  return Math.floor(Math.random() * 3);
};

let choose = () => {
  if (!controlPlayer) {
    playerOneChoice = playerChoose();
    playerTwoChoice = playerChoose();
    let counter = 0;
    let counter2 = 0;

    let timer2 = setInterval(function () {
      counter2++;
      if (counter2 % 100 === 0) {
        hit = 0;
      }

      hit -= 1;
      playerOneBox.style.top = hit + "px";
      playerTwoBox.style.top = hit + "px";
    }, 1);
    let timer = setInterval(function () {
      counter++;
      if (counter === 3) {
        playerOneBox.className = choices[playerOneChoice];
        playerTwoBox.className = choices[playerTwoChoice];
        clearInterval(timer);
        clearInterval(timer2);
        hit = 0;
        playerOneBox.style.top = hit + "px";
        playerTwoBox.style.top = hit + "px";
        checkWinner();
        playerOneBoxScore.innerText = "Player 1: " + playerOneScore;
        playerTwoBoxScore.innerText = "Player 2: " + playerTwoScore;
      }
    }, 400);
  } else if (controlPlayer) {
    playerTwoChoice = playerChoose();
    let counter = 0;
    let counter2 = 0;
    let timer2 = setInterval(function () {
      counter2++;
      if (counter2 % 100 === 0) {
        hit = 0;
      }
      hit -= 1;
      playerOneBox.style.top = hit + "px";
      playerTwoBox.style.top = hit + "px";
    }, 1);
    let timer = setInterval(function () {
      counter++;
      if (counter === 3) {
        document.getElementById(playerOneChoice).className = "";
        playerOneBox.className = choices[playerOneChoice];

        playerTwoBox.className = choices[playerTwoChoice];
        clearInterval(timer);
        clearInterval(timer2);
        hit = 0;
        // console.log("hello");
        playerOneBox.style.top = hit + "px";
        playerTwoBox.style.top = hit + "px";
        checkWinner();
        playerOneBoxScore.innerText = "Player 1: " + playerOneScore;
        playerTwoBoxScore.innerText = "Player 2: " + playerTwoScore;
        playerOneBox.innerHTML = "";
        // playerOneBox.setAttribute("onclick", "printChoices()"); SHIT IS BROKE, Does not work! Might be because of FontAwsomeicons
      }
    }, 400);
  }
};

const checkWinner = () => {
  let check = [parseInt(playerOneChoice), playerTwoChoice];

  let checkStr = JSON.stringify(check);
  switch (checkStr) {
    case "[0,2]":
      playerOneScore++;
      break;
    case "[1,0]":
      playerOneScore++;
      break;
    case "[2,1]":
      playerOneScore++;
      break;
    case "[2,0]":
      playerTwoScore++;
      break;
    case "[0,1]":
      playerTwoScore++;
      break;
    case "[1,2]":
      playerTwoScore++;
      break;
    default:
      break;
  }
};

let takeControl = (id) => {
  playerOneBox.className = "";
  if (!controlPlayer) {
    let controlled = document.getElementById(id);
    controlled.innerText = "Lose Control";
    controlled.setAttribute("onclick", "loseControl(this.id)");
  }
  printChoices();
  controlPlayer = true;
};

let playGame = (id) => {
  let box1 = document.getElementById("0");
  let box2 = document.getElementById("1");
  let box3 = document.getElementById("2");
  if (box1.id == id) {
    box2.className = "unused";
    box3.className = "unused";
    box1.setAttribute = ("onclick", "takeControl()");
  } else if (box2.id == id) {
    box1.className = "unused";
    box3.className = "unused";
    box2.setAttribute = ("onclick", "takeControl()");
  } else {
    box1.className = "unused";
    box2.className = "unused";
    box3.setAttribute = ("onclick", "takeControl()");
  }
  playerOneChoice = id;
  choose();
};

let loseControl = (id) => {
  controlPlayer = false;
  let controlled = document.getElementById(id);
  controlled.innerText = "Take Control";
  controlled.setAttribute("onclick", "takeControl(this.id)");
  playerOneBox.innerHTML = "";
  playerOneBox.onclick = "";
  playerOneBox.className = choices[2];
};

let printChoices = () => {
  playerOneBox.className = "";
  for (let i = 0; i < 3; i++) {
    let div = document.createElement("div");
    playerOneBox.appendChild(div);
    div.className = choices[i];
    div.id = i;
    div.setAttribute("onclick", "playGame(this.id)");
  }
};
