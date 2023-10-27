export default class Stick {
  constructor(d1, d2) {
    this.d1 = d1;
    this.d2 = d2;
    this.color = "#e77070";
  }

  update() {}

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.d1.vector.x, this.d1.vector.y);
    ctx.lineTo(this.d2.vector.x, this.d2.vector.y);
    ctx.stroke();
    ctx.restore();
  }
}
