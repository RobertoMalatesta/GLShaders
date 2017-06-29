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
  float r = abs(
      sin(q.x + (time * 25.0) * PI / 180.0)
  );

  float g = abs(
      cos(q.y + (time * 25.0) * PI / 180.0)
  );

  float c = hash(
     sin(dist(q.x + time, q.y, 128.0, 128.0) / 23.0)
   + sin(dist(q.x, q.y, 64.0, 64.0) / 23.0)
   + sin(dist(q.x, q.y + time / 18.0, 192.0, 64.0) / 18.0)
   + sin(dist(q.x, q.y, 192.0, 100.0) / 23.0) * 255.0
 );
  vec3 colorz = vec3(c, 1.0 - c, g * r);

  gl_FragColor = vec4(colorz, 1.0);
}
`;

export default fragmentShader;
