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
      //  sin(dist(q.x - time, q.y, rz.x / 2.0, rz.y / 2.0) / 25.0 - time)
      sin(dist(q.x, q.y, rz.x / 2.0, rz.y / 2.0) / 25.0 - time)
    + cos(dist(rz.x / 3.0, rz.y / 3.0, q.x, q.y) / 25.0 + time )
  );
  float r = hash(cos(c * dec * PI / 180.0) * 255.0);
  float g = hash(sin(c * (dec / 2.0) * PI / 180.0) * 255.0);
  float b = hash(sin(c * (dec / 4.0) * PI / 180.0) * 255.0);

  vec3 colorz = vec3(r, g, b);
  gl_FragColor = vec4(colorz, 1.0);
}
`;

export default fragmentShader;
