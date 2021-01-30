/**
 * questa classe si occupa di comunicare con la GPU e di passare i dati agli shader, nella
 * fattispecie di passare attributes e uniforms
 */

import { Mesh } from './mesh';
import { FRAGMENT_SHADER_SRC } from './shaders/fragmentShaderSrc';
import { VERTEX_SHADER_SRC } from './shaders/vertexShaderSrc';

export const ATTRIBUTES = [
    'vertexPosition',
    'vertexColor'
];

export const vertexPosition = 0;
export const vertexColor = 1;

export const UNIFORMS = [
    'projectionMatrix',
    'modelMatrix'
];

export const projectionMatrix = 0;
export const modelMatrix = 1;

function makeShader(shaderType: number, shaderSource: string): WebGLShader {
    const shader = GL.createShader(shaderType);
    GL.shaderSource(shader, shaderSource);
    GL.compileShader(shader);

    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
        throw new Error('ERRORE! Impossibile compilare lo shader. Errore: ' + GL.getShaderInfoLog(shader));
    }
    return shader;
}

export function makeProgram(): Program {
    const vertexShader = makeShader(GL.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragmentShader = makeShader(GL.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    return new Program([vertexShader, fragmentShader]);
}

export class Program {
    attributes: number[];
    uniforms: WebGLUniformLocation[];
    programObj: WebGLProgram;

    constructor(shaders: WebGLShader[]) {
        this.programObj = GL.createProgram();
        shaders.forEach((shader) => {
            GL.attachShader(this.programObj, shader);
        });
        GL.linkProgram(this.programObj);
        if (!GL.getProgramParameter(this.programObj, GL.LINK_STATUS)) {
            throw new Error('ERRORE! Impossibile creare il programma. Errore: ' + GL.getProgramInfoLog(this.programObj));
        }
        this.attributes = ATTRIBUTES.map((attributeName) => GL.getAttribLocation(this.programObj, attributeName));
        this.uniforms = UNIFORMS.map((uniformName) => GL.getUniformLocation(this.programObj, uniformName));
    }

    enable() {
        GL.useProgram(this.programObj);
        this.attributes.forEach((attr) => {
            if (attr !== -1) {
                GL.enableVertexAttribArray(attr);
            }
        });
        this.uniforms.forEach((uniform) => {
            if (uniform !== null) {
                GL.uniformMatrix4fv(uniform, false, Engine.camera.projectionMatrix)
            }
        })
    }

    disable() {
        this.attributes.forEach((attr) => {
            if (attr !== -1) {
                GL.disableVertexAttribArray(attr);
            }
        });
    }

    draw(mesh: Mesh) {
        if (this.attributes[vertexPosition] !== -1 && mesh.verticesBuffer !== null) {
            GL.bindBuffer(GL.ARRAY_BUFFER, mesh.verticesBuffer);
            GL.vertexAttribPointer(
                this.attributes[vertexPosition], // in che location di memoria sto mandando i dati alla GPU
                3, // quanti dati contengono i singoli vertici? nel nostro caso x, y, z = 3;
                GL.FLOAT, // tipo dei dati mandati
                false,
                0,
                0
            );
        }

        if (this.attributes[vertexColor] !== -1 && mesh.colorBuffer !== null) {
            GL.bindBuffer(GL.ARRAY_BUFFER, mesh.colorBuffer);
            GL.vertexAttribPointer(
                this.attributes[vertexColor],
                3,
                GL.FLOAT,
                false,
                0,
                0
            )
        }

        if (mesh.indicesBuffer !== null) {
            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
            GL.drawElements(mesh.renderingMode, mesh.indicesCount, GL.UNSIGNED_SHORT, 0);
            
        } else {

            GL.drawArrays(mesh.renderingMode, 0, mesh.verticesCount);
        }
    }
}
