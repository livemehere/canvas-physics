import Vector from "../utils/Vector.js";

export default class Point {
  constructor(x, y) {
    this.vector = new Vector(x, y);
    this.oldVector = new Vector(x, y);
    this.radius = 5;
    this.color = "#ff0000";
    this.gravity = new Vector(0, 0.2);
    this.friction = 0.97;
    this.groundFriction = 0.7;
  }

  update(minX, minY, maxX, maxY) {
    const velocity = Vector.sub(this.vector, this.oldVector).mult(
      this.friction,
    );

    this.oldVector.setXY(this.vector.x, this.vector.y);
    this.vector.add(velocity);
    this.vector.add(this.gravity);

    if (this.vector.y > maxY) {
      this.vector.y = maxY;
      this.oldVector.y =
        this.vector.y + velocity.y * this.friction * this.groundFriction;
    }

    if (this.vector.y < minY) {
      this.vector.y = minY;
      this.oldVector.y = this.vector.y + velocity.y * this.friction;
    }

    if (this.vector.x > maxX) {
      this.vector.x = maxX;
      this.oldVector.x = this.vector.x + velocity.x * this.friction;
    }

    if (this.vector.x < minX) {
      this.vector.x = minX;
      this.oldVector.x = this.vector.x + velocity.x * this.friction;
    }
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
