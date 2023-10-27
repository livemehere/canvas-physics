import Vector from "./utils/Vector.js";

export default class Mouse {
  constructor(canvas) {
    this.vector = new Vector(0, 0);
    this.canvas = canvas;
    this.isDown = false;

    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.vector.setXY(e.clientX - rect.left, e.clientY - rect.top);
  }
  onMouseDown() {
    this.isDown = true;
  }

  onMouseUp() {
    this.isDown = false;
  }
}
