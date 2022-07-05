import { COLS, ROWS, BLOCK_SIZE } from "./constants.js";
import Board from "./board.js";
import Tetromino from "./piece.js";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playBtn");

let board = new Board();

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function play() {
  board.reset();
  let tetromino = new Tetromino(ctx);
  tetromino.draw();
  console.table(board.grid);
}

playButton.addEventListener("click", play);
