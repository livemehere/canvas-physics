import Vector from "../utils/Vector.js";

export default class Stick {
  constructor(p1, p2, length) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = length ?? Vector.distance(p1.vector, p2.vector);
  }

  update() {
    const dx = this.p1.vector.x - this.p2.vector.x;
    const dy = this.p1.vector.y - this.p2.vector.y;
    const distance = Vector.distance(this.p1.vector, this.p2.vector);
    const diff = this.length - distance;
    const diffPercent = diff / distance / 2;

    const offsetX = dx * diffPercent;
    const offsetY = dy * diffPercent;

    this.p1.vector.x += offsetX;
    this.p1.vector.y += offsetY;
    this.p2.vector.x -= offsetX;
    this.p2.vector.y -= offsetY;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "#ff7070";
    ctx.beginPath();
    ctx.moveTo(this.p1.vector.x, this.p1.vector.y);
    ctx.lineTo(this.p2.vector.x, this.p2.vector.y);
    ctx.stroke();
    ctx.restore();
  }
}
