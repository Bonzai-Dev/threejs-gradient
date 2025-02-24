precision mediump float;

varying vec3 vertexPosition;
uniform float miliseconds;

void main() {
  vertexPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}