export default class Stick {
  constructor(d1, d2, option = {}) {
    this.startPos = d1;
    this.endPos = d2;
    this.color = "#e77070";
    this.length = option.length ?? d1.vector.distance(d2.vector);
    this.tension = option.tension ?? 1;
  }

  update() {
    const dx = this.endPos.vector.x - this.startPos.vector.x;
    const dy = this.endPos.vector.y - this.startPos.vector.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const diffRatio = (this.length - distance) / distance;

    const offsetX = diffRatio * dx * this.tension;
    const offsetY = diffRatio * dy * this.tension;

    const m = this.startPos.mass + this.endPos.mass;
    const m1 = this.endPos.mass / m;
    const m2 = this.startPos.mass / m;

    if (!this.startPos.pinned) {
      this.startPos.vector.x -= offsetX * m1;
      this.startPos.vector.y -= offsetY * m1;
    }

    if (!this.endPos.pinned) {
      this.endPos.vector.x += offsetX * m2;
      this.endPos.vector.y += offsetY * m2;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.startPos.vector.x, this.startPos.vector.y);
    ctx.lineTo(this.endPos.vector.x, this.endPos.vector.y);
    ctx.stroke();
    ctx.restore();
  }
}
