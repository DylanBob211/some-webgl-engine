class Setting<T> {
    static i = 0;
    private _callbacks: Map<string, (value: T) => any> = new Map();
    constructor(private _value: T) {}

    get(): T {
        return this._value;
    }

    set(v: T) {
        this._value = v;
        this.emit();
    }

    public subscribe(callback: (value: T) => any): { unsubscribe: () => void } {
        const key = (++Setting.i).toString();
        this._callbacks.set(key, callback);
        return {
            unsubscribe: () => {
                this._callbacks.delete(key);
            }
        };
    }

    private emit(): void {
        this._callbacks.forEach((cb) => cb(this._value));
    }
}

export class Resolution {
    static Options: Resolution[] = [
        { width: 600, height: 400 },
        { width: 800, height: 600 },
        { width: 1024, height: 768 },
        { width: 1240, height: 720 },
    ];
    
    constructor(public width: number, public height: number) {}
}


export const EngineSettings = {
    resolution: new Setting(Resolution.Options[0])
};