precision mediump float;

const highp float NOISE_GRANULARITY = 0.5 / 255.0;
varying vec3 vertexPosition;

uniform highp float resolution;
uniform float miliseconds;

// Random number generator
highp float random(highp vec2 coords) {
   return fract(sin(dot(coords.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // Gradient
  float colorRange = 5.0;
  float speed = miliseconds / 3500.0;

  vec4 topLeft = (cos(vec4(0.6745, 0.3882, 1.0, 1.0) + speed) + colorRange / 2.0) / colorRange;
  vec4 topRight = (sin(vec4(0.851, 0.4314, 0.9059, 1.0) + speed) + colorRange / 2.0) / colorRange;

  vec4 bottomLeft = (cos(vec4(0.0, 0.0, 1.0, 1.0) + speed) + colorRange / 2.0) / colorRange;
  vec4 bottomRight = (sin(vec4(1.0, 0.0, 0.4157, 1.0) + speed) + colorRange / 2.0) / colorRange;

  vec4 topColor = mix(topLeft, topRight, vertexPosition.x);
  vec4 bottomColor = mix(bottomLeft, bottomRight, vertexPosition.x);

  vec4 color = mix(bottomColor, topColor, vertexPosition.y);
  gl_FragColor = color;

  // Dithering
  // highp vec2 coordinates = gl_FragCoord.xy / vec2(resolution, resolution);
  // highp vec4 fragmentColor = mix(bottomColor, topColor, 1.0 - coordinates.y);
  // fragmentColor += mix(-NOISE_GRANULARITY, NOISE_GRANULARITY, random(coordinates));
  // gl_FragColor = fragmentColor;
}