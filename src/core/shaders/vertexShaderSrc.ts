export const VERTEX_SHADER_SRC = `
  attribute vec3 vertexPosition;
  attribute vec2 vertexUV;

  uniform mat4 projectionMatrix;
  uniform mat4 modelMatrix;

  varying vec2 fragmentUV;

  void main()
  {
    fragmentUV = vertexUV;
    gl_Position = (projectionMatrix * modelMatrix) * vec4(vertexPosition, 1.0);
  }
`;
