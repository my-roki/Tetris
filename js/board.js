import { ROWS, COLS } from "./constants.js";

export default class Board {
  grid;
  reset() {
    this.grid = this.getEmptyBoard();
  }
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  moveValid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        const x = p.x + dx;
        const y = p.y + dy;
        return this.isInsideWall(x, y);
      });
    });
  }

  isInsideWall(x, y) {
    return x >= 0 && x < COLS && y >= 0 && y <= ROWS;
  }
}
