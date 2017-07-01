const fragmentShader = `
precision mediump float;
uniform float time;
uniform float angle;
uniform vec2 resolution;

#define PI 3.14159265358979323846264

float hash (float v) {
  return smoothstep(0.0, 1.0, (sin(v) + cos(v))) * 10.0;
}

float dist(float a,float b,float c,float d) {
   return sqrt(float((a - c) * (a - c) + (b - d) * (b - d)));
}

void main() {
  vec2 q = gl_FragCoord.xy;
  vec2 rz = resolution.xy;
  float t = time * 55.0;
  float dec = angle * 255.0;
  float c = abs(
      sin(dist(q.x + t, q.y, rz.x / 2.0, rz.y / 2.0) / 32.0)
    + sin(dist(q.x, q.y, 64.0, 64.0) / 12.0)
    + sin(dist(q.x, q.y + t / 18.0, rz.x / 2.0, rz.y / 2.0) / 18.0)
    + sin(dist(q.x, q.y, 192.0, 100.0) / 32.0)
  );
  float r = (5.0 * (sin(c - angle * q.x)) / 2.0);
  float g = (5.0 * (cos(c + angle * q.y)) / 2.0);
  float b = (5.0 * (sin(c + angle * q.x)) / 2.0);

  vec3 colorz = vec3(r, g, b);
  gl_FragColor = vec4(colorz, 1.0);
}
`;

export default fragmentShader;
