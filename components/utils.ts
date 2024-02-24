
export function StrReplace(str: string, inst: string[]): string {
    inst.forEach(x => str = str.replace(x, ""));
    return str.trim();
}
