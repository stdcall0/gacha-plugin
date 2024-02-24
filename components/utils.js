export function StrReplace(str, inst) {
    inst.forEach(x => str = str.replace(x, ""));
    return str.trim();
}
