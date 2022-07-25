import { KEYS } from "./constants.js";
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
let time = { start: 0, elapsed: 0, level: 1000 };

function animate() {
  time.elapsed = Date.now() - time.start;

  if (time.elapsed > time.level) {
    time.start = Date.now();
    drop();
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  draw();
  requestId = requestAnimationFrame(animate);
}

function play() {
  board.reset();
  let tetromino = new Tetromino(ctx);
  board.tetromino = tetromino;

  if (requestId) {
    cancelAnimationFrame(requestId);
  }
  time.start = Date.now();
  animate();

  // console.table(board.grid);
}

function drop() {
  let p = moves[KEYS.DOWN](board.tetromino);

  if (board.moveValid(p)) {
    board.tetromino.move(p);
  } else {
    board.freeze();
    board.tetromino = new Tetromino(ctx);
  }
}

function handleKeys(event) {
  if (moves[event.keyCode]) {
    event.preventDefault();
    let p = moves[event.keyCode](board.tetromino);
    if (event.keyCode === KEYS.SPACE) {
      while (board.moveValid(p)) {
        board.tetromino.move(p);
        p = moves[event.keyCode](board.tetromino);
      }
    } else if (board.moveValid(p)) {
      board.tetromino.move(p);
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

playButton.addEventListener("click", play);
window.addEventListener("keydown", handleKeys);
