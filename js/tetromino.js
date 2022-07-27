import { SHAPES, COLORS } from "./constants.js";

export default class Tetromino {
  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  randomizeTetrominoType(num) {
    // TODO: predictable radomize
    return Math.floor(Math.random() * num);
  }

  spawn() {
    const typeId = this.randomizeTetrominoType(COLORS.length);
    this.color = COLORS[typeId];
    this.shape = SHAPES[typeId];
    this.x = typeId === 3 ? 4 : 3;
    this.y = typeId === 0 ? -2 : -1;
  }

  drawTetromino() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 0.1;

    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
          this.ctx.strokeRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  move(p) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }

  rotate(piece) {
    let p = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }
    p.shape.forEach((row) => row.reverse());
    return p;
  }
}
