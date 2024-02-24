import { Base } from '#gc.model';
import { DisplayModes, Render, Path } from '#gc';
export class Piece extends Base.Piece {
    get level() {
        return 0 + this.upgradeCount * 4;
    }
    generateText(score) {
        if (!this.pieceData)
            return null;
        // TODO: Genshin Piece Text
    }
    async generateImage(score) {
        if (!this.pieceData)
            return null;
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
}
;
export class Set extends Base.Set {
}
;
export class Domain extends Base.Domain {
}
;
;
;
