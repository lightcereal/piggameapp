const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");
const resultMessage = document.getElementById("result");
let turn = 1; //shows which player's turn it is (1=player 1 , 2=player 2)
let currentPlayerHoldBar = document.getElementById(`p${turn}-hold`);

const playerScores = [0,0]; //total score for player 1 and 2, respectively
let turnScore = 0;

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

function hold() {
  const currentPlayerScore = (playerScores[turn-1] += turnScore);
  
  if (currentPlayerScore >= 100) {
    return gameEnd();
  }

  const currentPlayerScoreBar = document.getElementById(`p${turn}-score`);
  setNewBarWidth(currentPlayerScoreBar, currentPlayerScore);
  newTurn();
}

function roll() {
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;

  if (faceValue == 1) {
    newTurn();
  } else {
    turnScore += faceValue;
    if ((playerScores[turn-1] + turnScore) >= 100) {
      return hold();
    } else {
      setNewBarWidth(currentPlayerHoldBar, turnScore);
    }
  }
}

function newTurn() { //switch player and reset turn total
  turn = (turn==1) ? 2 : 1;
  resultMessage.textContent = `Player-${turn} turn!`;

  turnScore = 0;
  setNewBarWidth(currentPlayerHoldBar, turnScore);

  currentPlayerHoldBar = document.getElementById(`p${turn}-hold`);
}

function gameEnd() { //someone won the game -> disable buttons and show who won
  document.getElementById("roll").disabled = true;
  document.getElementById("hold").disabled = true;
  resultMessage.textContent = `Player-${turn} won!`;

  setNewBarWidth(currentPlayerHoldBar, 0);

  const currentPlayerScoreBar = document.getElementById(`p${turn}-score`);
  setNewBarWidth(currentPlayerScoreBar, 100);
}

function setNewBarWidth(bar, value) { //change the width, color, and text of provided bar based on provided value
  bar.style.width = value + "%";
  bar.setAttribute("aria-valuenow", value);

  switch (value) {
    case 0:
      bar.innerText = "";
      break;
    case 100:
      bar.classList.add("bg-success");
      bar.innerHTML = "100&#127881;";
      break;
    default:
      bar.innerText = value;
  }
}