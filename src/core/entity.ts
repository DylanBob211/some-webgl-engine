import { mat4, quat, vec3 } from "gl-matrix";
import { Material } from "./materials";
import { Mesh } from "./mesh";
import { modelMatrix, Program } from "./programs";

export class Entity {
  private mesh: Mesh;
  private material: Material;
  private position = vec3.create();
  private rotation = quat.create();
  private scale = vec3.create();

  private modelMatrix = mat4.create();
  private rotationMatrix = mat4.create();

  private texture = TextureManager.loadTexture('crate.png');
  constructor(private name: string) { }

  setMesh(mesh: Mesh) {
    this.mesh = mesh;
  }

  setMaterial(material) {
      this.material = material;
  }

  setPosition(position: vec3) {
    this.position = position;
    this.calculateModelMatrix();
    
  }

  setScale(scale: vec3) {
    this.scale = scale;
    this.calculateModelMatrix();
  }

  setRotationFromAxisAndAngle(axis: vec3, angle: number) {
    angle = degToRad(angle);
    quat.setAxisAngle(this.rotation, axis, angle);
    this.calculateModelMatrix();
  }

  calculateModelMatrix() {
    const mm = this.modelMatrix;
    const rm = this.rotationMatrix;
    mat4.identity(mm);
    mat4.translate(mm, mm, this.position);

    mat4.fromQuat(rm, this.rotation);    
    
    mat4.mul(mm, mm, rm);

    mat4.scale(mm, mm, this.scale);
  }

  draw(program: Program) {
    if (!this.material) return;
    if (!this.material.draw(program)) return;
    GL.uniformMatrix4fv(program.uniforms[modelMatrix], false, this.modelMatrix);
    program.draw(this.mesh);
  }
}