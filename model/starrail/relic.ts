
import { Base } from '#gc.model';
import { DisplayModes, Render, Path, Lottery } from '#gc';


export class Piece extends Base.Piece<Set> {

    override get level(): number {
        return 0 + this.upgradeCount * 3;
    }

    override generateText(score: number): string {
        if (!this.pieceData) return null;

        let res: string = `${this.displayName} ${this.pieceData.displayName}\nLv. ${this.level}\n\n`;
        res += `${this.mainStat.displayName} ${this.mainStat.displayValue}\n\n`;

        this.subStats.forEach(subStat =>
            res += `${subStat.displayName} ${subStat.displayValue}\n`
        );

        return res.trimEnd();
    }

    override async generateImage(score: number): Promise<string> {
        // TODO: generate Artifact Image for Star Rail
        // Might need to check for relic type (inner & outer)

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

export enum RelicType {
    Inner,
    Outer
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
