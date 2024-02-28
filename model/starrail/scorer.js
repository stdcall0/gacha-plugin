import { Base } from "#gc.model";
;
export class ScoreRule extends Base.ScoreRule {
}
;
export const findRule = (stat, rule) => {
    return Base.findRule(stat, rule);
};
export class MainStatWeightRule extends ScoreRule {
    constructor(pieceName, scale) {
        super();
        this.pieceName = pieceName;
        this.scale = scale;
    }
    target(piece) {
        return this.pieceName.includes(piece.name);
    }
    add(piece, weight) {
        return this.scale * findRule(piece.mainStat, weight);
    }
}
;
;
export class MainStatMatchRule extends ScoreRule {
    constructor(statMatch) {
        super();
        this.statMatch = statMatch;
    }
    target(piece) {
        return [
            "Body", "Feet",
            "Planar Sphere", "Link Rope"
        ].includes(piece.name);
    }
    mul(piece, weight) {
        if (!(piece.mainStat.name in this.statMatch))
            return 0.1;
        return 1;
    }
    add(piece, weight) {
        if (!(piece.mainStat.name in this.statMatch))
            return 0;
        return piece.level / 15 * this.statMatch[piece.mainStat.name];
    }
}
;
export class SubStatWeightRule extends ScoreRule {
    constructor(multipler) {
        super();
        this.multipler = multipler;
    }
    add(piece, weight) {
        let score = 0;
        piece.subStats.forEach(subStat => {
            score += subStat.value
                * findRule(subStat, weight)
                * findRule(subStat, this.multipler);
        });
        return score;
    }
}
;
export class Scorer extends Base.Scorer {
}
;
