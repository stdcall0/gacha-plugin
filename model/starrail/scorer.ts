import { Base } from "#gc.model";
import { Stat, Piece } from "./relic.js";

export interface StatWeightTable extends Base.StatWeightTable { };

export class ScoreRule extends Base.ScoreRule<Piece> { };

export const findRule = (stat: Stat, rule: StatWeightTable): number => {
    return Base.findRule(stat, rule);
};

export class MainStatWeightRule extends ScoreRule {
    constructor(
        public pieceName: string[],
        public scale: number
    ) { super(); }

    override target(piece: Piece): boolean {
        return this.pieceName.includes(piece.name);
    }

    override add(piece: Piece, weight: StatWeightTable): number {
        return this.scale * findRule(piece.mainStat, weight);
    }
};

export interface StatMatchTable {
    [ statName: string ]: number;
};

export class MainStatMatchRule extends ScoreRule {
    constructor(
        public statMatch: StatMatchTable
    ) { super(); }

    override target(piece: Piece): boolean {
        return [
            "Body", "Feet",
            "Planar Sphere", "Link Rope"
        ].includes(piece.name);
    }

    override mul(piece: Piece, weight: StatWeightTable): number {
        if (!(piece.mainStat.name in this.statMatch))
            return 0.1;
        return 1;
    }

    override add(piece: Piece, weight: StatWeightTable): number {
        if (!(piece.mainStat.name in this.statMatch))
            return 0;
        return piece.level / 15 * this.statMatch[piece.mainStat.name];
    }
};

export class SubStatWeightRule extends ScoreRule {
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
