import {
  ROWS,
  COLS,
  BLOCK_SIZE,
  COLORS,
  POINTS,
  LINES_PER_LEVEL,
  LEVEL,
} from "./constants.js";
import Tetromino from "./tetromino.js";
import { account, time } from "./main.js";

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

        // 첫 스폰 위치를 -2번째부터 시작하기 위해 조건을 살짝 조절
        let cond = this.notOccupied(x, y);
        cond === undefined ? (cond = true) : cond;
        return value === 0 || (this.isInsideWall(x, y) && cond);
      });
    });
  }

  isInsideWall(x, y) {
    return x >= 0 && x < COLS && y <= ROWS - 1;
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

  clearLines() {
    let lines = 0;
    this.grid.forEach((row, y) => {
      // If every value is greater than zero then we have a full row.
      if (row.every((value) => value > 0)) {
        // Remove the row.
        this.grid.splice(y, 1);

        // Add zero-filled row at the top.
        this.grid.unshift(Array(COLS).fill(0));
        lines += 1;
      }
    });

    // Add points if we cleared some lines
    if (lines > 0) {
      account.score += this.getLineClearPoints(lines);
      account.lines += lines;

      if (account.lines >= LINES_PER_LEVEL) {
        // Goto next level
        account.level += 1;

        // Remove lines so we start working for the next level.
        account.lines -= LINES_PER_LEVEL;

        // Increase speed of the game.
        time.speed = LEVEL[account.level];
      }
    }
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

  getLineClearPoints(lines) {
    const points =
      lines === 1
        ? POINTS.SINGLE
        : lines === 2
        ? POINTS.DOUBLE
        : lines === 3
        ? POINTS.TRIPLE
        : lines === 4
        ? POINTS.TETRIS
        : 0;
    return points;
  }
}
