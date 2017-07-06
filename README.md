# GLShaders

  WebGL/Three.js - My Experiments and testing renders as I learn GLSL SHADERS. The intent of this repo is to teach myself
  WebGL and Shader technology, have a base class to create new projects and get some experience with WebGL and WebVR.

  Grid & Spiral shaders are from Alex Permyakov and are being used to deconstruct.
  Displacement shader is used in three.js for a fireball mesh effect, built as a tutorial.

  BaseRender.js => Basic Class that sets WebGL Canvas, Shaders and Programs up.

  http://glslshaders-demo.surge.sh

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
