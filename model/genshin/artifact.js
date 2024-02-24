import { DisplayModes, Render, Path } from '#gc';
import { Base } from '#gc.model';
export class Piece extends Base.Piece {
    get level() {
        return 0 + this.upgradeCount * 4;
    }
    generateText(score) {
        if (!this.pieceData)
            return null;
        let res = `${this.displayName} ${this.pieceData.displayName}\nLv. ${this.level}\n\n`;
        res += `${this.mainStat.displayName} ${this.mainStat.displayValue}\n\n`;
        this.subStats.forEach(subStat => res += `${subStat.displayName} ${subStat.displayValue}\n`);
        return res.trimEnd();
    }
    async generateImage(score) {
        if (!this.pieceData)
            return null;
        const data = {
            tplFile: Path.HTML + '/genshin_artifact.html',
            resPath: Path.Resource,
            htmlPath: Path.HTML,
            artifactPiece: this,
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
