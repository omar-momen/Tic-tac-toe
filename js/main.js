// Sounds Elements
const X_SOUND = document.getElementById("xSound");
const O_SOUND = document.getElementById("oSound");
const DRUMS_SOUND = document.getElementById("drums");
const WINNIG_SOUND = document.getElementById("winning");
// const FAIL_SOUND = document.getElementById("fail");
const DRAW_SOUND = document.getElementById("draw");

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let winningCombination = [];

let circleTurn;

const TheBoard = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const WinningMessgaeTextElement = document.querySelector(
  "[data-winning-message-text"
);
const WinningMessgaeElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");

startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.classList.remove("winning");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true }); // "once" for apply only one click per cell
  });
  setBoardHoverClass();
  WinningMessgaeElement.classList.remove("show");
}

function handleClick(e) {
  // Set sounds
  if (circleTurn) {
    O_SOUND.play();
  } else {
    X_SOUND.play();
  }

  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  // Check Winner
  if (checkWinner(currentClass)) {
    WINNIG_SOUND.play();
    // Set Winnig Cells
    const el1 = cellElements[winningCombination[0]];
    const el2 = cellElements[winningCombination[1]];
    const el3 = cellElements[winningCombination[2]];
    el1.classList.add("winning");
    el2.classList.add("winning");
    el3.classList.add("winning");

    // Disable Click before End game Triger
    TheBoard.style.pointerEvents = "none";

    // Delay Winning Message
    setTimeout(() => {
      endGame(false);
      TheBoard.style.pointerEvents = "unset";
    }, 1000);
  } else if (isDraw()) {
    DRAW_SOUND.play();
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

// Place mark
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Switch Turns
function swapTurns() {
  circleTurn = !circleTurn;
}

// Set Borde Hover Class
function setBoardHoverClass() {
  TheBoard.classList.remove(X_CLASS);
  TheBoard.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    TheBoard.classList.add(CIRCLE_CLASS);
  } else {
    TheBoard.classList.add(X_CLASS);
  }
}

// Check Winner
function checkWinner(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      const test = cellElements[index].classList.contains(currentClass);
      if (test === true) {
        winningCombination = combination;
        return true;
      }
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// End Game
function endGame(draw) {
  if (draw) {
    WinningMessgaeTextElement.innerText = `Draw`;
  } else {
    WinningMessgaeTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
  }
  WinningMessgaeElement.classList.add("show");
}
