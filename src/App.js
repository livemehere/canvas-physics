import Dot from "./Dot.js";
import Mouse from "./Mouse.js";
import { rand } from "./utils/rand.js";
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

    this.dots = [];
    this.sticks = [];
    this.initDots(10);

    this.boxDots = [];
    this.boxSticks = [];
    this.initBox();

    this.animate();
  }

  draw() {
    this.drawBg();
    this.drawMouse();
    this.drawDots();
    // this.drawBox();
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

  // 🔥 DOTS
  initDots(n) {
    for (let i = 0; i < n; i++) {
      const x = i === 0 ? 300 : rand(0, this.width);
      const y = i === 0 ? 300 : rand(0, this.height / 2);
      const dot = new Dot(x, y);
      if (i === 0) dot.pinned = true;
      if (i === n - 1) {
        dot.radius = 20;
        dot.mass = 10;
      }
      this.dots.push(dot);
    }

    for (let i = 0; i < this.dots.length - 1; i++) {
      if (i === this.dots.length - 1) break;
      const stick = new Stick(this.dots[i], this.dots[i + 1], {
        length: 30,
        tension: 0.5,
      });
      this.sticks.push(stick);
    }
  }

  drawDots() {
    const ITERATIONS = 3; // tension of the sticks
    for (let i = 0; i < ITERATIONS; i++) {
      this.dots.forEach((dot) => {
        dot.update();
        dot.constrain(
          dot.radius,
          dot.radius,
          this.width - dot.radius,
          this.height - dot.radius,
        );
      });

      this.sticks.forEach((stick) => {
        stick.update();
      });
    }

    this.dots.forEach((dot) => {
      dot.draw(this.ctx);
    });
    this.sticks.forEach((stick) => {
      stick.draw(this.ctx);
    });
  }

  initBox() {
    this.boxDots.push(new Dot(100, 100));
    this.boxDots.push(new Dot(100, 200));
    this.boxDots.push(new Dot(200, 200));
    this.boxDots.push(new Dot(200, 100));

    this.boxSticks.push(new Stick(this.boxDots[0], this.boxDots[1]));
    this.boxSticks.push(new Stick(this.boxDots[1], this.boxDots[2]));
    this.boxSticks.push(new Stick(this.boxDots[2], this.boxDots[3]));
    this.boxSticks.push(new Stick(this.boxDots[3], this.boxDots[0]));

    this.boxSticks.push(new Stick(this.boxDots[1], this.boxDots[3]));
  }

  drawBox() {
    this.boxDots.forEach((dot) => {
      dot.update();
      dot.constrain(
        dot.radius,
        dot.radius,
        this.width - dot.radius,
        this.height - dot.radius,
      );
      dot.draw(this.ctx);
    });
    this.boxSticks.forEach((stick) => {
      stick.update();
      stick.draw(this.ctx);
    });
  }
}
