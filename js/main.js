import { KEYS } from "./constants.js";
import Board from "./board.js";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playBtn");

const moves = {
  [KEYS.UP]: (p) => ({ ...p, y: p.y + 1 }),
  [KEYS.DOWN]: (p) => ({ ...p, y: p.y - 1 }),
  [KEYS.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEYS.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEYS.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
};

let board = new Board(ctx);

function play() {
  board.reset();
  console.table(board.grid);
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
    board.tetromino.draw();
  }
}

playButton.addEventListener("click", play);
window.addEventListener("keydown", handleKeys);
