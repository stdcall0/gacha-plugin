
import { Base } from '#gc.model';
import { DisplayModes, Render, Path } from '#gc';

export class Piece extends Base.Piece<Set> {

    override get level(): number {
        return 0 + this.upgradeCount * 4;
    }

    override generateText(score: number): string {
        if (!this.pieceData) return null;

        // TODO: Genshin Piece Text
    }

    override async generateImage(score: number): Promise<string> { 
        if (!this.pieceData) return null;

        const data = {
            tplFile: Path.HTML + 'genshin_artifact.html',
            pluResPath: Path.Process,
            artifactPiece: this,
            setDisplayName: this.pieceData.displayName,
            artifactScore: DisplayModes.Float1D(score),
            locked: false
        };

        return Render.render("genshin_artifact", data);
    }
};

export class Set extends Base.Set<Piece> { };

export class Domain extends Base.Domain<Piece, Set> { };

export interface Scorer extends Base.Scorer {
    (piece: Piece): number
};

export interface ScoreRule extends Base.ScoreRule { [stat: string]: number };
