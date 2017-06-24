import fragmentSource from './shader/grid/fragmentShader.js';
import vertexSource from './shader/grid/vertexShader.js';
import Canvas from './Canvas';


// Render Class Object //
export default class Render {
  constructor() {
    this.viewAngle = 55;
    this.near = 1;
    this.far = 10000;
    this.frame = 0;
    this.start = Date.now();
    // Set Up canvas and surface object //
    this.can = new Canvas();
    this.shaderCanvas = this.can.createCanvas('GLShaders');
    this.gl = this.shaderCanvas.surface;
    this.canvas = this.shaderCanvas.canvas;
    this.width = this.shaderCanvas.width;
    this.height = this.shaderCanvas.height;
    this.gl.viewport(0, 0, this.width, this.height);
    window.addEventListener('resetCanvas', this.resize, true);
    this.initGraphics();
    this.renderLoop();
  }

  initShaders = () => {
    this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(this.vertexShader, vertexSource);
    this.gl.compileShader(this.vertexShader);


    this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(this.fragmentShader, fragmentSource);
    this.gl.compileShader(this.fragmentShader);

    const program = this.gl.createProgram();
    this.gl.attachShader(program, this.vertexShader);
    this.gl.attachShader(program, this.fragmentShader);
    this.gl.linkProgram(program);
    this.gl.useProgram(program);

    return program;
  };

  initGraphics = () => {
    this.gl.viewport(0, 0, this.width, this.height);

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX / this.canvas.width;
      this.mouseY = e.pageY / this.canvas.height;
    }, false);

    this.program = this.initShaders();
    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]),
      this.gl.STATIC_DRAW
    );

    this.vPosition = this.gl.getAttribLocation(this.program, 'vPosition');
    this.gl.vertexAttribPointer(
      this.vPosition,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    this.gl.enableVertexAttribArray(this.vPosition);

    this.ut = this.gl.getUniformLocation(this.program, 'time');
    this.um = this.gl.getUniformLocation(this.program, 'mouse');
    this.resolution = new Float32Array([this.canvas.width, this.canvas.height]);
    this.gl.uniform2fv(
      this.gl.getUniformLocation(this.program, 'resolution'),
      this.resolution
    );
  };

  checkObjects = () => {
    this.gl.uniform1f(this.ut, (Date.now() - this.start) / 1000);
    this.gl.uniform2fv(this.um, new Float32Array([this.mouseX, this.mouseY]));
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
  };

  resetCanvas = () => {
    window.cancelAnimationFrame(this.animation);
    this.shaderCanvas = this.can.setViewport(this.canvas);
    this.gl = this.shaderCanvas.surface;
    this.canvas = this.shaderCanvas.canvas;
    this.width = this.shaderCanvas.width;
    this.height = this.shaderCanvas.height;
    this.gl.viewport(0, 0, this.width, this.height);
    this.renderLoop();
  }

  renderLoop = () => {
    this.frame ++;
    this.checkObjects();
    window.requestAnimationFrame(this.renderLoop);
  };
}
