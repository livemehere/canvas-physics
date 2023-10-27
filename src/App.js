export class App {
  constructor(props) {
    this.canvasElement = document.createElement("canvas");
    this.ctx = this.canvasElement.getContext("2d");
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;
    this.stageWidth = props.width * this.dpr;
    this.stageHeight = props.height * this.dpr;
    this.canvasElement.width = this.stageWidth;
    this.canvasElement.height = this.stageHeight;
    this.canvasElement.style.width = `100%`;
    this.canvasElement.style.height = `100%`;
    this.ctx.scale(this.dpr, this.dpr);

    this.animate();
  }

  update() {}

  draw() {
    this.drawBg();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.update();
    this.draw();
  }

  drawBg() {
    this.ctx.save();
    this.ctx.fillStyle = "#d2d2d2";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.restore();
  }
}
