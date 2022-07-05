export default class Tetromino {
  x;
  y;
  color;
  shape;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  spawn() {
    this.color = "blue";
    this.shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ];

    this.x = 3;
    this.y = 0;
  }

  draw() {
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
}
