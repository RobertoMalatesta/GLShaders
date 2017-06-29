const fragmentShader = `
precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 q = gl_FragCoord.xy / resolution.xy;
  vec3 col = vec3(q.y, q.x, 1.0 - q.x);
  gl_FragColor = vec4(col, 1.0);
}
`;

export default fragmentShader;
