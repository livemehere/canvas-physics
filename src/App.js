import Dot from "./Dot.js";
import Mouse from "./Mouse.js";
import { rand } from "./utils/rand.js";
import Vector from "./utils/Vector.js";
import Stick from "./Stick.js";

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
    this.canvasElement.style.width = `${props.width}px`;
    this.canvasElement.style.height = `${props.height}px`;
    this.ctx.scale(this.dpr, this.dpr);

    this.mouse = new Mouse(this.canvasElement);
    this.mouseRadius = 30;
    this.mouseColor = "rgba(0,0,0,0.19)";

    this.initDots(400);
    this.animate();
  }

  draw() {
    this.drawBg();
    this.drawMouse();
    this.dots.forEach((dot) => {
      if (dot.vector.collidesWith(this.mouse.vector, this.mouseRadius)) {
        dot.color = "#0000ff";
        dot.vector.setXY(this.mouse.vector.x, this.mouse.vector.y);
      } else {
        dot.color = "#ff0000";
      }
      dot.update();
      dot.draw(this.ctx);
    });
    this.drawSticks();
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
    this.ctx.fillStyle = this.mouseColor;
    this.ctx.beginPath();
    this.ctx.arc(
      this.mouse.vector.x,
      this.mouse.vector.y,
      this.mouseRadius,
      0,
      Math.PI * 2,
    );
    this.ctx.fill();
    this.ctx.restore();
  }

  drawSticks() {
    for (let i = 0; i < this.dots.length; i++) {
      for (let j = i + 1; j < this.dots.length; j++) {
        const d1 = this.dots[i];
        const d2 = this.dots[j];
        const dist = Vector.distance(d1.vector, d2.vector);
        if (dist < 100) {
          this.ctx.save();
          this.ctx.strokeStyle = "#e77070";
          this.ctx.beginPath();
          this.ctx.moveTo(d1.vector.x, d1.vector.y);
          this.ctx.lineTo(d2.vector.x, d2.vector.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  initDots(n) {
    this.dots = [];
    for (let i = 0; i < n; i++) {
      const x = rand(0, this.width);
      const y = rand(0, this.height);
      const dot = new Dot(x, y);
      this.dots.push(dot);
    }
  }
}
