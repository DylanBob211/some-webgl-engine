export const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec3 fragmentColor;
  void main()
  {
    gl_FragColor = vec4(fragmentColor.x, fragmentColor.y, fragmentColor.z, 1.0);
  }  

`;
