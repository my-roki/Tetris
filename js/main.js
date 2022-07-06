import { COLS, ROWS, BLOCK_SIZE, KEYS } from "./constants.js";
import Board from "./board.js";
import Tetromino from "./tetromino.js";

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

let board = new Board();
let tetromino = new Tetromino(ctx);

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function play() {
  board.reset();
  tetromino.draw();
  console.table(board.grid);
}

function handleKeys(event) {
  // console.log(event.keyCode);
  if (moves[event.keyCode]) {
    event.preventDefault();
    let p = moves[event.keyCode](tetromino);
    // console.log(p);
    // console.log(moveValid(p));
    if (event.keyCode === KEYS.SPACE) {
      while (board.moveValid(p)) {
        tetromino.move(p);
        p = moves[event.keyCode](tetromino);
      }
    } else if (board.moveValid(p)) {
      tetromino.move(p);
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    tetromino.draw();
  }
}

playButton.addEventListener("click", play);
window.addEventListener("keydown", handleKeys);
