import { Program, makeProgram } from './programs';
import { Mesh } from './mesh';
import { Resolution, EngineSettings } from './settings';
import { Camera } from './camera';
import { Entity } from './entity';
import { TextureManager } from './textures';

export class Core {
    private canvas: HTMLCanvasElement;
    private mainProgram: Program;
    private testMesh: Mesh;
    public camera: Camera;
    private entity: Entity;

    constructor() {
        window.Engine = this;
        window.TextureManager = new TextureManager();
        this.camera = new Camera();
        this.initResolution();

        window.GL = this.initCanvas();
        this.applyResolution(EngineSettings.resolution.get());
        this.initGL();
    }

    private addResolutionOptions = (r: Resolution, select: HTMLSelectElement) => {
        const option = document.createElement('option');
        option.value = JSON.stringify(r);
        const text = document.createTextNode(`${r.width}x${r.height}`);
        option.appendChild(text);
        select.appendChild(option);
    };

    initResolution() {
        const resolutionSelect = document.createElement('select');

        Resolution.Options.forEach((r) => {
            this.addResolutionOptions(r, resolutionSelect)
        });

        document.body.appendChild(resolutionSelect);

        EngineSettings.resolution.subscribe((res) => {
            this.applyResolution(res)
        });
        resolutionSelect.addEventListener('change', (e) => {
            const v = JSON.parse((e.target as any).value)
            EngineSettings.resolution.set(v);
        });
    }

    applyResolution = (res: Resolution) => {
        this.canvas.width = res.width;
        this.canvas.height = res.height;

        GL.viewport(0, 0, res.width, res.height);
        this.camera.createPerspectiveMatrix(res.width / res.height);
    };

    initCanvas(): WebGLRenderingContext {
        this.canvas = document.createElement('canvas');
        const initialResolution = EngineSettings.resolution.get();
        this.canvas.width = initialResolution.width;
        this.canvas.height = initialResolution.height;
        document.body.appendChild(this.canvas);
        return this.canvas.getContext('webgl');
    }

    initGL() {
        GL.clearColor(0.0, 0.0, 0.0, 1.0);

        GL.enable(GL.DEPTH_TEST);
        GL.depthFunc(GL.LESS);

        GL.enable(GL.CULL_FACE);
        GL.cullFace(GL.BACK);

        GL.frontFace(GL.CCW);

        this.mainProgram = makeProgram();

        this.testMesh = new Mesh('test');
        this.testMesh.createTestMesh();

        this.entity = new Entity('Entity');
        this.entity.setMesh(this.testMesh);
        this.entity.setScale([1.0, 1.0, 1.0]);
    }

    draw() {
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        this.mainProgram.enable();

        // draw
        // codice di test
        this.entity.setPosition([2.0, 0, -5.0]);
        this.entity.setRotationFromAxisAndAngle([0.0, 1.0, 0.0], 15);

        // codice di test fine
        this.entity.draw(this.mainProgram);

        this.mainProgram.disable();
    }
}
