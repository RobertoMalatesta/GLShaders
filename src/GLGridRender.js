import fragmentSource from './shader/grid/fragmentShader.js';
import vertexSource from './shader/grid/vertexShader.js';
import BaseRender from './BaseRender.js';

// Render Class Object //
export default class Render extends BaseRender {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.createGraphics(vertexSource, fragmentSource);

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX / this.canvas.width;
      this.mouseY = e.pageY / this.canvas.height;
    }, false);

    this.renderLoop();
  };

  importProgram = () => {
    // Function to extend for adding in program setup
    //
    this.ut = this.gl.getUniformLocation(this.program, 'time');
    this.um = this.gl.getUniformLocation(this.program, 'mouse');
    this.resolution = new Float32Array([this.canvas.width, this.canvas.height]);
    this.gl.uniform2fv(
      this.gl.getUniformLocation(this.program, 'resolution'),
      this.resolution
    );
  };

  importUniforms = () => {
    // Function to extend for adding in uniform updates
    this.gl.uniform1f(this.ut, (Date.now() - this.start) / 1000);
    this.gl.uniform2fv(this.um, new Float32Array([this.mouseX, this.mouseY]));
  };

  renderLoop = () => {
    this.frame ++;
    this.updateUniforms();
    this.animation = window.requestAnimationFrame(this.renderLoop);
  };
}
