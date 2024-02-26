
export function StrReplace(str: string, inst: string[]): string {
    inst.forEach(x => str = str.replace(x, ""));
    return str.trim();
}

export function ScoreTier(score: number): string {
    if (score < 5) return "D";
    if (score < 15) return "C";
    if (score < 25) return "B";
    if (score < 35) return "A";
    if (score < 45) return "S";
    return "ACE";
}
