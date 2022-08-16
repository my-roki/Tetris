import {
  KEYS,
  POINTS,
  LEVEL,
  HIGH_SCORES,
  NUM_OF_HIGH_SCORES,
} from "./constants.js";
import Board from "./board.js";
import Tetromino from "./tetromino.js";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playBtn");

const moves = {
  [KEYS.UP]: (p) => board.tetromino.rotate(p),
  [KEYS.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEYS.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEYS.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEYS.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
  [KEYS.Q]: (p) => board.tetromino.rotate(p),
};

let board = new Board(ctx);
let requestId;
export let time = { start: 0, elapsed: 0, speed: 1000 };
let accountValues = { score: 0, lines: 0, level: 1 };

export let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  },
});

export function updateAccount(key, value) {
  const element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

function animate() {
  time.elapsed = Date.now() - time.start;

  if (time.elapsed > time.speed) {
    time.start = Date.now();
    // the block goes down several times when use the drop function several times, so take the return value and then process the code
    const isContinue = drop();
    if (!isContinue) {
      gameOver();
      return;
    }
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  draw();
  requestId = requestAnimationFrame(animate);
}

function play() {
  // TODO : Shuld fix the bug that doesn't reset game
  resetGame();
  board.reset();

  if (requestId) {
    cancelAnimationFrame(requestId);
  }
  time.start = Date.now();
  animate();

  // console.table(board.grid);
}

function gameOver() {
  cancelAnimationFrame(requestId);

  ctx.fillStyle = "black";
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = "1px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER", 1.8, 4);
  checkHighScore(account.score);
}

function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  board = new Board(ctx);
  time = { start: Date.now(), elapsed: 0, speed: LEVEL[1] };
}

function drop() {
  let p = moves[KEYS.DOWN](board.tetromino);

  if (board.moveValid(p)) {
    board.tetromino.move(p);
  } else {
    board.freeze();
    board.clearLines();

    if (board.tetromino.y === 0) {
      return false;
    }
    board.tetromino = new Tetromino(ctx);
  }
  return true;
}

function handleKeys(event) {
  if (moves[event.keyCode]) {
    event.preventDefault();
    let p = moves[event.keyCode](board.tetromino);
    if (event.keyCode === KEYS.SPACE) {
      while (board.moveValid(p)) {
        board.tetromino.move(p);
        p = moves[event.keyCode](board.tetromino);
        account.score += POINTS.HARD_DROP;
      }
      // when hard drop, board freez will active directly
      board.freeze();
    } else if (board.moveValid(p)) {
      board.tetromino.move(p);
      if (event.keyCode === KEYS.DOWN) {
        account.score += POINTS.SOFT_DROP;
      }
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.tetromino.drawTetromino();
  }
}

function draw() {
  // Clear old position before drawing.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  board.drawBoard();
  board.tetromino.drawTetromino();
}

const highScoreString = localStorage.getItem(HIGH_SCORES);
function checkHighScore(score) {
  const highScores = JSON.parse(highScoreString) || [];
  console.log(highScores);
  const lowestScore = highScores[NUM_OF_HIGH_SCORES - 1]?.score ?? 0;

  if (score > lowestScore) {
    saveHighScore(score, highScores);
    showHighScores();
  }
}

function saveHighScore(score, highScores) {
  const name = prompt("You got a highscore! Enter name:");

  const newScore = { score, name };

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(NUM_OF_HIGH_SCORES);

  localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

function showHighScores() {
  const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) || [];

  const highScoreList = document.getElementById(HIGH_SCORES);

  highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.score} - ${score.name}`)
    .join("");
}

playButton.addEventListener("click", play);
window.addEventListener("keydown", handleKeys);
