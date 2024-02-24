
export type DisplayMode = (x: number) => string;

export class DisplayModes {
    static readonly Integer = (x: number) => x.toFixed(0);
    static readonly Float1D = (x: number) => x.toFixed(1);
    static readonly Float2D = (x: number) => x.toFixed(2);
    static readonly Percentage1D = (x: number) => x.toFixed(1) + '%';
    static readonly Percentage2D = (x: number) => x.toFixed(2) + '%';

    private constructor(private readonly key: string, public readonly value: any) { }
    toString() { return this.key; }
};

export function StrReplace(str: string, inst: string[]): string {
    inst.forEach(x => str = str.replace(x, ""));
    return str.trim();
}
