// Alex Permyakov's futuristic grid shader
const vertexShader = `
attribute vec4 vPosition;
void main (void) {
  gl_Position = vPosition;
}
`;
export default vertexShader;
