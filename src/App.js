import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";

export class App {
  constructor(props) {
    this.canvas = document.querySelector("canvas");
    this.engine = Engine.create();
    this.runner = Runner.create();
    this.render = Render.create({
      canvas: this.canvas,
      engine: this.engine,
    });

    Render.run(this.render);
    Runner.run(this.runner, this.engine);

    this.addBox(100, 100, 100);
    this.addBox(
      this.canvas.width / 2,
      this.canvas.height + this.canvas.height / 1.7,
      this.canvas.width,
      {
        isStatic: true,
      },
    );

    this.mouse = Mouse.create(this.render.canvas);
    this.mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true,
        },
      },
    });

    Composite.add(this.engine.world, this.mouseConstraint);
    this.render.mouse = this.mouse;
  }

  addBox(x, y, size, option) {
    const box = Bodies.rectangle(x, y, size, size, option);
    Composite.add(this.engine.world, [box]);
  }
}
