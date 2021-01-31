export const FRAGMENT_SHADER_SRC = `
  precision highp float;
  uniform vec3 baseColor;

  varying vec2 fragmentUV;

  uniform sampler2D colorMap;

  void main()
  {
    vec4 textureColor = texture2D(colorMap, fragmentUV);

    vec3 blended = textureColor.xyz * baseColor;
    gl_FragColor = vec4(blended, 1.0);
  }  

`;
