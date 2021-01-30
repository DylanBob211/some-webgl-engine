export const VERTEX_SHADER_SRC = `
  attribute vec3 vertexPosition;
  attribute vec3 vertexColor;
  uniform mat4 projectionMatrix;
  uniform mat4 modelMatrix;
  varying vec3 fragmentColor;

  void main()
  {
    fragmentColor = vertexColor;
    gl_Position = (projectionMatrix * modelMatrix) * vec4(vertexPosition, 1.0);
  }
`;
