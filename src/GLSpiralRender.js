import fragmentSource from './shader/spiral/fragmentShader.js';
import vertexSource from './shader/spiral/vertexShader.js';
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
    this.resolution = new Float32Array([this.canvas.width, this.canvas.height]);
    this.gl.uniform2fv(
      this.gl.getUniformLocation(this.program, 'resolution'),
      this.resolution
    );
  };

  importUniforms = () => {
    this.gl.uniform1f(this.ut, (Date.now() - this.start) / 1000);
  };

  renderLoop = () => {
    this.frame ++;
    this.updateUniforms();
    this.animation = window.requestAnimationFrame(this.renderLoop);
  };
}
