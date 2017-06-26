const fragmentShader = `
precision mediump float;

void main() {
  // gl_FragColor is a special variable a fragment shader
  // is responsible for setting
  gl_FragColor = vec4(0.0, 0.25, 0.75, 1.0); // return redish-purple
}
`;

export default fragmentShader;
