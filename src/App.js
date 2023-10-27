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

    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };
    this.speed = 3;

    this.origin = {
      x: 500,
      y: 500,
    };

    this.box = {
      x: 500,
      y: 500,
      width: 10,
      height: 10,
      color: "red",
      draw: function (ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
      },
    };

    this.box2 = {
      x: 500,
      y: 500,
      width: 10,
      height: 10,
      color: "yellow",
      draw: function (ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
      },
    };

    this.animate();
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  update() {
    const gap = 500;
    this.box.x = this.origin.x + Math.cos(Date.now() / 150) * 100;
    this.box.y = this.origin.y + Math.sin(Date.now() / 150) * 100;

    this.box2.x = this.origin.x + Math.cos(Date.now() / 150 + gap) * 100;
    this.box2.y = this.origin.y + Math.sin(Date.now() / 150 + +gap) * 100;
  }

  draw() {
    this.drawBg();
    this.box.draw(this.ctx);
    this.box2.draw(this.ctx);
    this.drawCenter();
    if (this.keys.ArrowUp) {
      this.origin.y -= this.speed;
    }
    if (this.keys.ArrowDown) {
      this.origin.y += this.speed;
    }

    if (this.keys.ArrowLeft) {
      this.origin.x -= this.speed;
    }

    if (this.keys.ArrowRight) {
      this.origin.x += this.speed;
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.update();
    this.draw();
  }

  //  Custom
  drawCenter() {
    this.ctx.save();
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.origin.x, this.origin.y, 10, 10);
    this.ctx.restore();
  }

  drawBg() {
    this.ctx.save();
    this.ctx.fillStyle = "#d2d2d2";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.restore();
  }

  handleKeyDown(e) {
    const key = e.key;
    switch (key) {
      case "ArrowUp": {
        this.keys.ArrowUp = true;
        break;
      }
      case "ArrowDown": {
        this.keys.ArrowDown = true;
        break;
      }

      case "ArrowLeft": {
        this.keys.ArrowLeft = true;
        break;
      }

      case "ArrowRight": {
        this.keys.ArrowRight = true;
        break;
      }
    }
  }
  handleKeyUp(e) {
    const key = e.key;
    switch (key) {
      case "ArrowUp": {
        this.keys.ArrowUp = false;
        break;
      }
      case "ArrowDown": {
        this.keys.ArrowDown = false;
        break;
      }

      case "ArrowLeft": {
        this.keys.ArrowLeft = false;
        break;
      }

      case "ArrowRight": {
        this.keys.ArrowRight = false;
        break;
      }
    }
  }
}
