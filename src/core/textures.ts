enum TextureReadyState {
    NOT_READY,
    PENDING,
    READY
}

export class Texture2D {
    width: number;
    height: number;
    imageObj: HTMLImageElement;
    texture: WebGLTexture;
    filename: string;

    readyState = TextureReadyState.NOT_READY;

    loadFromFile(filename: string) {
        console.log('caricamento texture ', filename, 'iniziato');
        this.filename = filename;
        this.texture = GL.createTexture();
        const imageObj = new Image();
        imageObj.src = 'assets/textures' + filename;
        imageObj.onload = () => {
            GL.bindTexture(GL.TEXTURE_2D, this.texture);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.REPEAT);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.REPEAT);

            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);

            GL.pixelStorei(GL.UNPACK_ALIGNMENT, 1); //?
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, imageObj);

            GL.generateMipmap(GL.TEXTURE_2D);

            GL.bindTexture(GL.TEXTURE_2D, null);
            this.width = imageObj.width;
            this.height = imageObj.height;
            this.readyState = TextureReadyState.READY;
            console.log('caricamento texture ', filename, 'completato');
        };
        this.readyState = TextureReadyState.PENDING;
    }

    isReady(): boolean {
        return this.readyState === TextureReadyState.READY;
    }
}

export class TextureManager {
    private textures = new Map<string, Texture2D>();

    loadTexture(filename: string) {
        if (this.textures.has(filename)) return this.textures.get(filename);
        const t = new Texture2D();
        t.loadFromFile(filename);
        this.textures.set(filename, t);
        return t;
    }
}
