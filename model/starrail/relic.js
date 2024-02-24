import { Base } from '#gc.model';
import { DisplayModes, Render, Path } from '#gc';
export class Piece extends Base.Piece {
    get level() {
        return 0 + this.upgradeCount * 3;
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
        // TODO: generate Artifact Image for Star Rail
        // Might need to check for relic type (inner & outer)
        if (!this.pieceData)
            return null;
        const data = {
            tplFile: Path.HTML + 'starrail_relic.html',
            pluResPath: Path.Process,
            artifactPiece: this,
            artifactScore: DisplayModes.Float1D(score),
            locked: false
        };
        return Render.render("starrail_relic", data);
    }
}
;
export var RelicType;
(function (RelicType) {
    RelicType[RelicType["Inner"] = 0] = "Inner";
    RelicType[RelicType["Outer"] = 1] = "Outer";
})(RelicType || (RelicType = {}));
;
export class Set extends Base.Set {
    constructor(name, displayName, aliases, type, pieceList, pieceData) {
        super(name, displayName, aliases, pieceList, pieceData);
        this.name = name;
        this.displayName = displayName;
        this.aliases = aliases;
        this.type = type;
        this.pieceList = pieceList;
        this.pieceData = pieceData;
    }
}
;
export class Domain extends Base.Domain {
}
;
;
;
