import Vector from "./utils/Vector.js";

export default class Dot {
  constructor(x, y) {
    this.vector = new Vector(x, y);
    this.originVector = new Vector(x, y);
    this.radius = 5;
    this.color = "#ff0000";
  }

  update() {
    const force = Vector.sub(this.vector, this.originVector).mult(0.1);
    this.vector.sub(force);
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.vector.x, this.vector.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
