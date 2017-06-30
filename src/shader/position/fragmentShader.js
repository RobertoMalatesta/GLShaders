const fragmentShader = `
precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265358979323846264

float hash (float v) {
  return smoothstep(0.0, 1.0, (sin(v) + cos(v))) * 12.0;
}

float dist(float a,float b,float c,float d) {
   return sqrt(float((a - c) * (a - c) + (b - d) * (b - d)));
}

void main() {
  vec2 q = gl_FragCoord.xy;
  vec2 rz = resolution.xy;
  float t = time * 25.0;

  float c = abs(
      sin(dist(q.x + t, q.y, rz.x / 2.0, rz.y / 2.0) / 32.0)
    + sin(dist(q.x, q.y, 64.0, 64.0) / 12.0)
    + sin(dist(q.x, q.y + t / 18.0, rz.x / 2.0, rz.y / 2.0) / 18.0)
    + sin(dist(q.x, q.y, 192.0, 100.0) / 32.0)
  );
  float r = abs(5.0 - 5.0 * (1.0 - sin(c - 6.3 * q.x)) / 2.0);
  float g = abs(5.0 - 5.0 * (1.0 - cos(c + 6.3 * q.y)) / 2.0);
  float b = abs(5.0 - 5.0 * (1.0 - sin(c + 6.3 * q.x)) / 2.0);

  vec3 colorz = vec3(r, g, b);

  gl_FragColor = vec4(colorz, 1.0);
}
`;

export default fragmentShader;
