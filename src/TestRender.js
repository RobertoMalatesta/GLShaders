import fragmentSource from './shader/position/fragmentShader04.js';
import vertexSource from './shader/position/vertexShader.js';
import BaseRender from './BaseRender.js';
import dat from 'dat-gui';

// Render Class Object //
export default class Render extends BaseRender {
  constructor() {
    super();
    this.angle = 70.0;
    this.dec = 215.0;
    this.init();
  }

  init = () => {
    this.createGraphics(vertexSource, fragmentSource);

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX / this.canvas.width;
      this.mouseY = e.pageY / this.canvas.height;
    }, false);

    this.createGUI();
    this.renderLoop();
  };

  createGUI = () => {
    this.options = {
      angle: this.angle,
      dec: this.dec,
    };
    this.gui = new dat.GUI();
    const folderRender = this.gui.addFolder('Render Options');

    folderRender.add(this.options, 'angle', 1, 255).step(1)
      .onFinishChange((value) => {
        this.options.angle = value;
        this.setOptions(this.options);
      });
    folderRender.add(this.options, 'dec', 1, 255).step(1)
      .onFinishChange((value) => {
        this.options.dec = value * 1.00;
        this.setOptions(this.options);
      });
    folderRender.open();
    this.setOptions(this.options);
  };

  setOptions = (options) => {
    this.angle = options.angle || this.angle;
    // this.gl.uniform1f(this.ua, this.angle * 0.001);
    this.gl.uniform1f(this.ua, this.angle);
    this.dec = options.dec || this.dec;
    this.gl.uniform1f(this.ud, this.dec);
  };

  importProgram = () => {
    // Function to extend for adding in program setup
    //
    this.ut = this.gl.getUniformLocation(this.program, 'time');
    this.ua = this.gl.getUniformLocation(this.program, 'angle');
    this.ud = this.gl.getUniformLocation(this.program, 'dec');
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
