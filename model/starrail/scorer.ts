import { Base } from "#gc.model";
import { Stat, Piece } from "./relic.js";

export interface StatWeightTable extends Base.StatWeightTable { };

export class ScoreRule extends Base.ScoreRule<Piece> { };

export const findRule = (stat: Stat, rule: StatWeightTable): number => {
    return Base.findRule(stat, rule);
};

export class MainStatRule extends ScoreRule {
    constructor(
        public targets: string[],
        public stat: { [statName: string]: number },
        public reward: number,
        public punish: number
    ) { super(); }

    override target(piece: Piece): boolean {
        return this.targets.includes(piece.name);
    }

    override add(piece: Piece, weight: StatWeightTable): number {
        if (!(piece.mainStat.name in this.stat))
            return 0;

        let score = (piece.level + 1) / 16 * this.stat[piece.mainStat.name];
        score += this.reward * findRule(piece.mainStat, weight);

        return score;
    }

    override mul(piece: Piece): number {
        if (!(piece.mainStat.name in this.stat))
            return this.punish;
        return 1;
    }
};

export class SubStatRule extends ScoreRule {
    constructor(
        public multipler: StatWeightTable
    ) { super(); }

    override add(piece: Piece, weight: StatWeightTable): number {
        let score = 0;
        piece.subStats.forEach(subStat => {
            score += subStat.value
                * findRule(subStat, weight)
                * findRule(subStat, this.multipler);
        });
        return score;
    }
};

export class Scorer extends Base.Scorer<Piece> { };
