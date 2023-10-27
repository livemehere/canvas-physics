import Point from "./objects/Point.js";
import Vector from "./utils/Vector.js";
import Stick from "./objects/Stick.js";

export class App {
  constructor(props) {
    this.canvasElement = document.createElement("canvas");
    this.ctx = this.canvasElement.getContext("2d");
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;
    this.width = props.width;
    this.height = props.height;
    this.stageWidth = props.width * this.dpr;
    this.stageHeight = props.height * this.dpr;
    this.canvasElement.width = this.stageWidth;
    this.canvasElement.height = this.stageHeight;
    this.canvasElement.style.width = props.width + "px";
    this.canvasElement.style.height = props.height + "px";
    this.ctx.scale(this.dpr, this.dpr);

    this.mouse = {
      vector: new Vector(0, 0),
      isDown: false,
      radius: 30,
    };

    this.canvasElement.addEventListener(
      "mousedown",
      this.onMouseDown.bind(this),
    );
    this.canvasElement.addEventListener(
      "mousemove",
      this.onMouseMove.bind(this),
    );
    this.canvasElement.addEventListener("mouseup", this.onMouseUp.bind(this));

    this.points = [];
    this.points.push(new Point(100, 100));
    this.points.push(new Point(200, 100));
    this.points.push(new Point(200, 200));
    this.points.push(new Point(100, 200));

    this.sticks = [];
    this.sticks.push(new Stick(this.points[0], this.points[1]));
    this.sticks.push(new Stick(this.points[1], this.points[2]));
    this.sticks.push(new Stick(this.points[2], this.points[3]));
    this.sticks.push(new Stick(this.points[3], this.points[0]));
    this.sticks.push(new Stick(this.points[0], this.points[2]));
    this.animate();
  }

  draw() {
    this.drawBg();
    this.drawMouse();

    for (let i = 0; i < 3; i++) {
      this.points.forEach((point) => {
        point.update(
          point.radius,
          point.radius,
          this.width - point.radius,
          this.height - point.radius,
        );
      });

      this.sticks.forEach((stick) => {
        stick.update();
      });
    }

    this.points.forEach((point) => {
      point.draw(this.ctx);
      if (
        point.vector.collidesWith(
          this.mouse.vector,
          this.mouse.radius + point.radius,
        )
      ) {
        const velocity = Vector.sub(this.mouse.vector, point.vector).mult(0.5);
        point.oldVector.add(velocity);
      }
    });

    this.sticks.forEach((stick) => {
      stick.update();
      stick.draw(this.ctx);
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.draw();
  }

  drawBg() {
    this.ctx.save();
    this.ctx.fillStyle = "#d2d2d2";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.restore();
  }

  drawMouse() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0,0,0,0.41)";
    this.ctx.beginPath();
    this.ctx.arc(
      this.mouse.vector.x,
      this.mouse.vector.y,
      this.mouse.radius,
      0,
      Math.PI * 2,
    );
    this.ctx.fill();
    this.ctx.restore();
  }

  onMouseDown(e) {
    this.mouse.isDown = true;
  }

  onMouseMove(e) {
    const rect = this.canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.mouse.vector.setXY(x, y);
  }

  onMouseUp(e) {
    this.mouse.isDown = false;
  }
}
