# GLShaders

  WIP - GLSHADERS experiments and testing as I learn three.js. More info to come soon [WIP]

  BaseRender.js => Basic Class that sets WebGL Canvas, Shaders and Programs up. 

  ```
  import fragmentSource from './shader/xxxx/fragmentShader.js';
  import vertexSource from './shader/xxxx/vertexShader.js';
  import BaseRender from './BaseRender.js';

  // Render Class Object //
  export default class Render extends BaseRender {
    constructor() {
      super();
      this.init();
    }

    init = () => {
      // Create Shaders which return as this.program //
      this.createGraphics(vertexSource, fragmentSource);

      this.canvas.addEventListener('mousemove', (e) => {
        this.mouseX = e.pageX / this.canvas.width;
        this.mouseY = e.pageY / this.canvas.height;
      }, false);

      .....
    };
  ```

## Run the example
  Requires Node v7.0.0 or greater

```bash
$ yarn install
$ yarn dev & open http://localhost:2020
```

## License

[MIT]
