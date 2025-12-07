precision mediump float;

varying vec3 vertexPosition;
varying vec2 uvCoordinates;

uniform vec2 resolution;
uniform float time;

const int[16] bayer4x4 = int[16](
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5
);

const vec3 color1 = vec3(0.0, 0.85, 0.91);
const vec3 color2 = vec3(0.35, 0.0, 1.0);
const vec3 color3 = vec3(0.64, 0.42, 1.0);

float dither(float amount) {
  // Technique used: https://en.wikipedia.org/wiki/Ordered_dithering
  vec2 pixelPosition = gl_FragCoord.xy;
  int mapX = int(mod(pixelPosition.x, 4.0));
  int mapY = int(mod(pixelPosition.y, 4.0));
  int mapValue = bayer4x4[mapX + mapY * 4];
  float threshold = float(mapValue) * (1.0 / pow(4.0, 2.0)) - 0.5;
  return threshold * amount;
}

vec3 pattern(vec3 color, float offset, float size) {
  vec2 shaderUv = 20.0 * size * uvCoordinates / resolution;
  shaderUv.x *= resolution.x / resolution.y;

  float patternTime = (length(shaderUv) + time * offset) * 0.15;
  float wave1 = sin(shaderUv.x + sin(patternTime * 2.0 * offset) + patternTime) * 2.0;
  float wave2 = sin(shaderUv.y + cos(patternTime * 0.5 * offset) + patternTime) * 1.5;
  float wave3 = sin(length(shaderUv) + patternTime) * 2.0;
  float pattern = (wave1 + wave2 + wave3 + 3.0) / 6.0;

  return color + pattern;
}

void main() {
  vec3 pattern1 = pattern(color1, 1.0, 2.0);
  vec3 pattern2 = pattern(color2, 2.0, 5.0);
  vec3 pattern3 = pattern(color3, 3.5, 3.0);
  vec3 color = mix(mix(pattern1, pattern2, 1.0), pattern3, 0.5) / 1.4 + dither(0.02);

  gl_FragColor = vec4(color, 1);
}