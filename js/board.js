import { ROWS, COLS, BLOCK_SIZE, COLORS } from "./constants.js";
import Tetromino from "./tetromino.js";

export default class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.init();
  }

  init() {
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  reset() {
    this.grid = this.getEmptyBoard();
    this.tetromino = new Tetromino(this.ctx);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.tetromino.drawTetromino();
  }

  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  moveValid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        const x = p.x + dx;
        const y = p.y + dy;
        return (
          value === 0 || (this.isInsideWall(x, y) && this.notOccupied(x, y))
        );
      });
    });
  }

  isInsideWall(x, y) {
    return x >= 0 && x < COLS && y >= 0 && y <= ROWS;
  }
  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  freeze() {
    this.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.tetromino.y][x + this.tetromino.x] = value;
        }
      });
    });
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value - 1];
          this.ctx.fillRect(x, y, 1, 1);
          this.ctx.strokeRect(x, y, 1, 1);
        }
      });
    });
  }
}
