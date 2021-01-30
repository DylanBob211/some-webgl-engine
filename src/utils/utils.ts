import { vec2, vec3 } from 'gl-matrix';

declare global {
    interface Array<T> {
        pushVec3D(vec: vec3): void;
        pushVec2D(vec: vec2): void;
    }
    
    var PI: number;
    var PI_90: number;
    var PI_360: number;

    function degToRad(degrees: number): number;
    function radToDeg(rad: number): number;
}


Array.prototype.pushVec3D = function (vec) {
    this.push(vec[0]);
    this.push(vec[1]);
    this.push(vec[2]);
};

Array.prototype.pushVec2D = function (vec) {
    this.push(vec[0]);
    this.push(vec[1]);
};

window.PI = Math.PI;
window.PI_90 = Math.PI / 2.0;
window.PI_360 = 2 * Math.PI;

window.degToRad = (degrees: number) => (degrees * PI) / 180;
window.radToDeg = (rad: number) => (rad * 180) / PI;

