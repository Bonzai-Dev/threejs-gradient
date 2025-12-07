precision mediump float;

varying vec3 vertexPosition;
varying vec2 uvCoordinates;

void main() {
  uvCoordinates = uv;
  vertexPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}