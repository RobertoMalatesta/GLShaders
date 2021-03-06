import dat from 'dat-gui';
import THREE from './Three';

import fragmentShader from './shader/texture/fragmentShadert3';
import vertexShader from './shader/texture/vertexShadert3';

// Skybox image imports //
import xpos from '../resources/images/space/posx.jpg';
import xneg from '../resources/images/space/negx.jpg';
import ypos from '../resources/images/space/posy.jpg';
import yneg from '../resources/images/space/negy.jpg';
import zpos from '../resources/images/space/posz.jpg';
import zneg from '../resources/images/space/negz.jpg';
// import skullModel from '../resources/models/skull.json';

// Render Class Object //
export default class Render {
  constructor() {
    this.viewAngle = 55;
    this.near = 1;
    this.far = 10000;
    this.frame = 0;
    this.start = Date.now();
    this.angle = 200.0;
    this.dec = 60.0;
    window.addEventListener('resize', this.resize, true);
    window.addEventListener('click', this.stats, true);
    this.setViewport();
    this.init();
  }

  init = () => {
    this.setRender();
    this.setCamera();
    this.setControls();
    this.setSkyBox();
    this.setLights();
    this.setScene();
    this.createGUI();
    this.renderLoop();
  };

  createGUI = () => {
    this.options = {
      angle: this.angle,
      iteration: this.dec,
    };
    this.gui = new dat.GUI();
    const folderRender = this.gui.addFolder('Render Options');

    // folderRender.add(this.options, 'angle', 1, 255).step(1)
    //   .onFinishChange((value) => {
    //     this.options.angle = value;
    //     this.setOptions(this.options);
    //   });
    folderRender.add(this.options, 'iteration', 1, 255).step(1)
      .onFinishChange((value) => {
        this.options.iteration = value * 1.00;
        this.setOptions(this.options);
      });
    folderRender.open();
    this.setOptions(this.options);
  };

  setOptions = (options) => {
    this.angle = options.angle || this.angle;
    this.meshMaterial.uniforms.angle.value = this.angle;
    this.dec = options.iteration || this.dec;
    this.meshMaterial.uniforms.dec.value = this.dec;
  };

  stats = () => {
    console.log(this.camera.position);
  };

  setRender = () => {
    // Set Render and Scene //
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(this.devicePixelRatio);
    this.renderer.shadowMapEnabled = true;
    document.body.appendChild(this.renderer.domElement);
    // Root Scene Element //
    this.scene = new THREE.Scene();
  };

  setCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
        this.viewAngle,
        this.aspect,
        this.near,
        this.far
    );
    this.scene.add(this.camera);
    this.camera.position.set(0.072, 2.12, -11.00);
    this.camera.lookAt(this.scene.position);
  };

  setControls = () => {
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.maxDistance = 3000;
    this.controls.minDistance = 0.1;
  };

  setLights = () => {
    // Set AmbientLight //
    this.ambient = new THREE.AmbientLight(0xAAAAAA);
    this.ambient.position.set(1, 10, 3);
    this.scene.add(this.ambient);

    this.spotLight = new THREE.DirectionalLight(0x0666666);
    this.spotLight.position.set(-6, 8, 15);
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
  };

  setSkyBox = () => {
    const urls = [xpos, xneg, ypos, yneg, zpos, zneg];
    this.skybox = new THREE.CubeTextureLoader().load(urls);
    this.skybox.format = THREE.RGBFormat;
    this.skybox.mapping = THREE.CubeReflectionMapping; // CubeReflectionMapping || CubeRefractionMapping
    this.scene.background = this.skybox;
  };

  setScene = () => {
    const uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.shadowmap,
      {
        map: {
          type: 't',
          value: 1,
          texture: null,
        },
        time: {
          type: 'f',
          value: this.start,
        },
        angle: {
          type: 'f',
          value: this.angle,
        },
        dec: {
          type: 'f',
          value: this.dec,
        },
        resolution: {
          type: 'v2',
          value: new THREE.Vector3(),
        },
      },
    ]);

    this.meshMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    this.meshMaterial.transparent = true;
    this.meshMaterial.side = THREE.DoubleSide;

    this.geoObject = new THREE.Mesh(
        new THREE.SphereGeometry(3, 20, 20),
        this.meshMaterial,
    );

    this.scene.add(this.geoObject);
    this.geoObject.castShadow = true;
    this.geoObject.receiveShadow = true;

    // const objectLoader = new THREE.ObjectLoader();
    // this.geoObject = objectLoader.parse(skullModel);
    // this.geoObject.children[0].geometry.dynamic = true;
    // // this.skullObject.children[0].rotation.set(0, 0, this.zRotation);
    // this.geoObject.children[0].material = this.meshMaterial;
    // this.geoObject.children[0].castShadow = true;
    // this.geoObject.children[0].receiveShadow = true;
    // this.scene.add(this.geoObject);
  };

  checkObjects = () => {
    this.meshMaterial.uniforms.time.value = (Date.now() - this.start) / 1000;
    this.meshMaterial.uniforms.needsUpdate = true;
    this.geoObject.rotation.y = ((this.frame / 15) * (Math.PI / 180));
  };

  setViewport = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.devicePixelRatio = window.devicePixelRatio;
  };

  resize = () => {
    this.setViewport();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  };

  rgbToHex = (r, g, b) => {
    const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return `0x${hex}`;
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  renderLoop = () => {
    this.frame ++;
    this.checkObjects();
    this.renderScene();
    window.requestAnimationFrame(this.renderLoop);
  };
}
