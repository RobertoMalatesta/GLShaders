const fragmentShader = `
precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265358979323846264

float hash (float v) {
  return smoothstep(0.1, 0.9, abs(sin(v) + cos(v + time))) * 15.0;
}

float dist(float a,float b,float c,float d) {
   return sqrt(float((a - c) * (a - c) + (b - d) * (b - d)));
}

void main() {
  vec2 q = gl_FragCoord.xy / resolution.xy;
  vec2 p = -1.0 + 2.0 * q;
  p.x *= resolution.x / resolution.y;

  vec3 col = vec3(q.y, q.x, p.y);
  vec3 row = vec3(p.x, q.x, q.y);
  vec3 c = vec3(0.0);
  c += col / (abs(tan(hash(p.x) + sin(time + p.y) + q.y * 10.0)));
  c += row / (abs(tan(hash(p.y) + cos(time + p.x) + q.x * 10.0)));
  c /= 6.0;
  gl_FragColor = vec4(c, 1.0);
}
`;

export default fragmentShader;
