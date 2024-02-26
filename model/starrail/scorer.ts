import { Base } from "#gc.model";
import { Stat, Piece } from "./relic.js";

import { Logger } from "#gc";

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
        Logger.warn(`[gc] mainrule scale ${this.scale} mul ${findRule(piece.mainStat, weight)}`);
        return this.scale * findRule(piece.mainStat, weight);
    }
};

export class MainStatLevelRule extends ScoreRule {
    constructor(
        public pieceName: string[],
        public scale: number
    ) { super(); }

    override target(piece: Piece): boolean {
        return this.pieceName.includes(piece.name);
    }

    override add(piece: Piece, weight: StatWeightTable): number {
        return this.scale * piece.level;
    }
};

export class SubStatWeightRule extends ScoreRule {
    constructor(
        public multipler: StatWeightTable
    ) { super(); }

    override add(piece: Piece, weight: StatWeightTable): number {
        let score = 0;
        piece.subStats.forEach(subStat => {
            Logger.warn(`[gc] sub ${subStat.displayName} value ${subStat.value} scale ${findRule(subStat, weight)} mul ${findRule(subStat, this.multipler)}`);
            score += subStat.value
                * findRule(subStat, weight)
                * findRule(subStat, this.multipler);
        });
        return score;
    }
};

export class Scorer extends Base.Scorer<Piece> { };
