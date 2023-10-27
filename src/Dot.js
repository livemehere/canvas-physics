import Vector from "./utils/Vector.js";

export default class Dot {
  constructor(x, y, mass) {
    this.vector = new Vector(x, y);
    this.oldVector = new Vector(x, y);
    this.radius = 5;
    this.color = "#ff0000";
    this.gravity = new Vector(0, 1);
    this.friction = 0.97;
    this.pinned = false;
    this.mass = mass ?? 1;
  }

  update() {
    if (this.pinned) return;
    // create a velocity from the difference between the current and old position
    const velocity = Vector.sub(this.vector, this.oldVector);
    this.oldVector.setXY(this.vector.x, this.vector.y);

    // apply friction to the velocity
    velocity.mult(this.friction);

    // add gravity and velocity to the current position
    this.vector.add(velocity);
    this.vector.add(this.gravity);
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.vector.x, this.vector.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  constrain(minX, minY, maxX, maxY) {
    if (this.vector.x < minX) {
      this.vector.x = minX;
    } else if (this.vector.x > maxX) {
      this.vector.x = maxX;
    }
    if (this.vector.y < minY) {
      this.vector.y = minY;
    } else if (this.vector.y > maxY) {
      this.vector.y = maxY;
    }
  }
}
