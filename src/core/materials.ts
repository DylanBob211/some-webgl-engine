import { vec3 } from "gl-matrix";
import { baseColor, colorMap, Program } from "./programs";
import { Texture2D } from "./textures";

export class Material {
    baseColor = vec3.fromValues(1.0, 1.0, 1.0);
    colorMap: Texture2D;

    constructor(private name: string) { }


    setBaseColor(v: vec3) {
        vec3.set(this.baseColor, v[0], v[1], v[2]);
    }

    setColorMap(filename: string) {
        this.colorMap = TextureManager.loadTexture(filename);
    }

    /**
     * passa al programma le informazioni sul materiale
        ovvero il baseColor e il colorMap
     */
    draw(program: Program): boolean {
        
        GL.uniform3fv(program.uniforms[baseColor], this.baseColor);

        if (this.colorMap && program.uniforms[colorMap]) {
            if (!this.colorMap.isReady()) return false;
            this.colorMap.bind(program.uniforms[colorMap], 0)
        }
        return true;
    }
}