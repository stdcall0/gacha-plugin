export class DisplayModes {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() { return this.key; }
}
DisplayModes.Integer = (x) => x.toFixed(0);
DisplayModes.Float1D = (x) => x.toFixed(1);
DisplayModes.Float2D = (x) => x.toFixed(2);
DisplayModes.Percentage1D = (x) => x.toFixed(1) + '%';
DisplayModes.Percentage2D = (x) => x.toFixed(2) + '%';
;
