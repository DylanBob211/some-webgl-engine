import { mat4 } from "gl-matrix";

export class Camera {
  projectionMatrix = mat4.create();

  createPerspectiveMatrix(ratio: number) {
    mat4.perspective(this.projectionMatrix, 45, ratio, 0.1, 100);
  }
}