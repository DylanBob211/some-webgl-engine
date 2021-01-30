import { vec2, vec3 } from "gl-matrix";


export class Mesh {
    renderingMode: number;
    verticesData: any[] = [];
    verticesBuffer: WebGLBuffer;

    colorData = [];
    colorBuffer: WebGLBuffer;

    indicesData = [];
    indicesBuffer: WebGLBuffer;

    verticesCount: number;
    indicesCount: number;

    constructor(private name: string) {}

    createTestMesh() {

        const v0 = vec3.fromValues(-1.0, -1.0, 0.0);
        const v1 = vec3.fromValues(1.0, -1.0, 0.0);
        const v2 = vec3.fromValues(1.0, 1.0, 0.0);
        const v3 = vec3.fromValues(-1.0, 1.0, 0.0);

        this.verticesData.pushVec3D(v0);
        this.verticesData.pushVec3D(v1);
        this.verticesData.pushVec3D(v2);
        this.verticesData.pushVec3D(v3);

        const c0 = vec3.fromValues(1.0, 0.0, 0.0);
        const c1 = vec3.fromValues(0.0, 1.0, 0.0);
        const c2 = vec3.fromValues(0.0, 0.0, 1.0);
        const c3 = vec3.fromValues(0.0, 1.0, 0.0);

        this.colorData.pushVec3D(c0);
        this.colorData.pushVec3D(c1);
        this.colorData.pushVec3D(c2);
        this.colorData.pushVec3D(c3);

        this.indicesData.push(0, 1, 2, 0, 2, 3);

        this.renderingMode = GL.TRIANGLES;
        this.verticesCount = 4;
        this.indicesCount = 6;


        this.createBuffers();
    }

    createBuffers() {
        if (this.verticesData.length) {
            this.verticesBuffer = GL.createBuffer();

            GL.bindBuffer(GL.ARRAY_BUFFER, this.verticesBuffer); // assegna una tipologia al buffer, e trattandosi di vertici, la tipologia in questo caso e' ARRAY_BUFFER
            GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.verticesData), GL.STATIC_DRAW);
        }

        if (this.colorData.length) {
            this.colorBuffer = GL.createBuffer();

            GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
            GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.colorData), GL.STATIC_DRAW);
        }

        if (this.indicesData.length) {
            this.indicesBuffer = GL.createBuffer();

            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
            GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesData), GL.STATIC_DRAW);
        }
    }
}
