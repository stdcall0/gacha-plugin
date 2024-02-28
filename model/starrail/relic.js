import { Base } from '#gc.model';
import { DisplayModes, Render, Path, Lottery, ScoreTier } from '#gc';
export var RelicType;
(function (RelicType) {
    RelicType[RelicType["Inner"] = 0] = "Inner";
    RelicType[RelicType["Outer"] = 1] = "Outer";
})(RelicType || (RelicType = {}));
;
;
export class ConstantStat extends Base.ConstantStat {
    get imagePath() {
        return Path.Image + "/sr/" + this.name + ".webp";
    }
    get upgradeText() {
        return ">".repeat(this.upgradeCount);
    }
}
;
export class RandomStat extends Base.RandomStat {
    get imagePath() {
        return Path.Image + "/sr/" + this.name + ".webp";
    }
    get upgradeText() {
        return ">".repeat(this.upgradeCount);
    }
}
;
export class Piece extends Base.Piece {
    constructor(name, displayName, mainStatList, subStatList, subStatCount) {
        super(name, displayName, mainStatList, subStatList, subStatCount);
        this.name = name;
        this.displayName = displayName;
        this.mainStatList = mainStatList;
        this.subStatList = subStatList;
        this.subStatCount = subStatCount;
        this._score = 0;
        this._scoreSrc = "/";
        this._lastLevel = -1;
    }
    get level() {
        return 0 + this.upgradeCount * 3;
    }
    get imagePath() {
        if (!(this.pieceData))
            return null;
        return Path.MiaoRes + "/" + this.pieceData.image;
    }
    calculateScore() {
        if (!this.parentSet)
            return;
        if (this.level == this._lastLevel)
            return;
        this.parentSet.scorers.forEach(scorer => {
            const score = scorer.calc(this);
            if (score > this._score) {
                this._score = score;
                this._scoreSrc = scorer.displayName;
            }
        });
        this._lastLevel = this.level;
    }
    get score() {
        this.calculateScore();
        return this._score;
    }
    get scoreSrc() {
        this.calculateScore();
        return this._scoreSrc;
    }
    generateText() {
        if (!this.pieceData)
            return null;
        let res;
        res = `${this.displayName} ${this.pieceData.displayName}\nLv. ${this.level}`;
        res += `  |  ${DisplayModes.Float2D(this.score)}\n\n`;
        res += `${this.mainStat.displayName} ${this.mainStat.displayValue}\n\n`;
        this.subStats.forEach(subStat => res += `${subStat.displayName} ${subStat.displayValue}\n`);
        return res.trimEnd();
    }
    async generateImage() {
        if (!this.pieceData)
            return null;
        const data = {
            tplFile: Path.HTML + '/starrail_relic.html',
            resPath: Path.Resource,
            htmlPath: Path.HTML,
            piece: this,
            score: DisplayModes.Float1D(this.score),
            scoreSrc: this.scoreSrc == '/' ? '' : `@${this.scoreSrc}`,
            showTier: this.level >= 15,
            tier: ScoreTier(this.score),
            locked: this.score >= 40
        };
        return Render.render("starrail_relic", data);
    }
}
;
export class Set extends Base.Set {
    constructor(name, displayName, aliases, type, scorers, pieceList, pieceData) {
        super(name, displayName, aliases, pieceList, pieceData);
        this.name = name;
        this.displayName = displayName;
        this.aliases = aliases;
        this.type = type;
        this.scorers = scorers;
        this.pieceList = pieceList;
        this.pieceData = pieceData;
    }
}
;
export class Domain extends Base.Domain {
    constructor(name, displayName, aliases, setList) {
        super(name, displayName, aliases, new Lottery([])); // skip Set aliases
        this.name = name;
        this.displayName = displayName;
        this.aliases = aliases;
        this.setList = setList;
    }
}
;
