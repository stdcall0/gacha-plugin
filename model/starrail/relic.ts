
import { Base } from '#gc.model';
import { DisplayMode, DisplayModes, Render, Path, Lottery } from '#gc';

export enum RelicType {
    Inner,
    Outer
};
export interface Stat extends Base.Stat {
    get imagePath(): string;
};

export class ConstantStat extends Base.ConstantStat implements Stat {
    get imagePath(): string {
        return Path.Image + "/sr/" + this.name + ".webp";
    }
};

export class RandomStat extends Base.RandomStat implements Stat { 
    get imagePath(): string {
        return Path.Image + "/sr/" + this.name + ".webp";
    }
};

export class Piece extends Base.Piece<Set> {
    mainStat: Stat;
    subStats: Stat[];

    constructor(
        public name: string,
        public displayName: string,
        public mainStatList: Lottery<Stat>,
        public subStatList: Lottery<Stat>,
        public subStatCount: Lottery<number>
    ) {
        super(name, displayName, mainStatList, subStatList, subStatCount);
    }

    override get level(): number {
        return 0 + this.upgradeCount * 3;
    }

    override generateText(score: number): string {
        if (!this.pieceData) return null;

        let res: string;
        res = `${this.displayName} ${this.pieceData.displayName}\nLv. ${this.level}`;
        res += `  |  ${DisplayModes.Float2D(score)}\n\n`;
        res += `${this.mainStat.displayName} ${this.mainStat.displayValue}\n\n`;

        this.subStats.forEach(subStat =>
            res += `${subStat.displayName} ${subStat.displayValue}\n`
        );

        return res.trimEnd();
    }

    override async generateImage(score: number): Promise<string> {
        // TODO: generate Artifact Image for Star Rail
        // Might need to check for relic type (inner & outer)
        throw new Error("Not Implemented"); // not implemented yet

        if (!this.pieceData) return null;

        const data = {
            tplFile: Path.HTML + 'starrail_relic.html',
            pluResPath: Path.Process,
            artifactPiece: this,
            artifactScore: DisplayModes.Float1D(score),
            locked: false
        };

        return Render.render("starrail_relic", data);
    }
};

export class Set extends Base.Set<Piece> {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public type: RelicType,
        public pieceList: Lottery<Piece>,
        public pieceData: { [name: string]: Base.PieceData }
    ) { super(name, displayName, aliases, pieceList, pieceData); }
};

export class Domain extends Base.Domain<Piece, Set> { };

export interface Scorer extends Base.Scorer {
    (piece: Piece): number
};

export interface ScoreRule extends Base.ScoreRule { [stat: string]: number };
