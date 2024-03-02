import { Base } from "#gc.model";
;
export class ScoreRule extends Base.ScoreRule {
}
;
export const findRule = (stat, rule) => {
    return Base.findRule(stat, rule);
};
export class MainStatRule extends ScoreRule {
    constructor(targets, stat, reward, punish) {
        super();
        this.targets = targets;
        this.stat = stat;
        this.reward = reward;
        this.punish = punish;
    }
    target(piece) {
        return this.targets.includes(piece.name);
    }
    add(piece, weight) {
        if (!(piece.mainStat.name in this.stat))
            return 0;
        let score = this.stat[piece.mainStat.name];
        score += this.reward * findRule(piece.mainStat, weight);
        return (piece.level + 1) / 16 * score;
    }
    mul(piece) {
        if (!(piece.mainStat.name in this.stat))
            return this.punish;
        return 1;
    }
}
;
export class SubStatRule extends ScoreRule {
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
