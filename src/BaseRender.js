import Canvas from './Canvas';

// Render Class Object //
export default class BaseRender {
  constructor() {
    this.frame = 0;
    this.start = Date.now();
    // Setup WebGL canvas and surface object //
    this.can = new Canvas();
    this.shaderCanvas = this.can.createCanvas('GLShaders');
    this.gl = this.shaderCanvas.surface;
    this.canvas = this.shaderCanvas.canvas;
    this.width = this.shaderCanvas.width;
    this.height = this.shaderCanvas.height;
    this.gl.viewport(0, 0, this.width, this.height);
    window.addEventListener('resize', this.resetCanvas, true);
  }

  resetCanvas = () => {
    this.shaderCanvas = this.can.setViewport(this.canvas);
    this.gl = this.shaderCanvas.surface;
    this.canvas = this.shaderCanvas.canvas;
    this.width = this.shaderCanvas.width;
    this.height = this.shaderCanvas.height;
    this.gl.viewport(0, 0, this.width, this.height);
  };

  createShader = (type, source) => {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!success) {
      console.log(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return false;
    }
    return shader;
  };

  createProgram = (vertexSource, fragmentSource) => {
    // Setup Vertext/Fragment Shader functions //
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
    this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

    // Setup Program and Attach Shader functions //
    const program = this.gl.createProgram();
    this.gl.attachShader(program, this.vertexShader);
    this.gl.attachShader(program, this.fragmentShader);
    this.gl.linkProgram(program);
    this.gl.useProgram(program);

    return program;
  };

  createGraphics = (vertexSource, fragmentSource) => {
    this.program = this.createProgram(vertexSource, fragmentSource);
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
    this.importProgram();
  };

  updateUniforms = () => {
    this.importUniforms();
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
  };

  importProgram = () => {
    // Function to extend for adding in program setup
  };

  importUniforms = () => {
    // Function to extend for adding in uniform updates
  };
}
