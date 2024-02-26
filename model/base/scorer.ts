import { Stat } from "./stat.js";
import { Piece } from "./piece.js";

export interface StatWeightTable { [stat: string]: number };

export abstract class ScoreRule<PieceType extends Piece<any>> {
    target(piece: PieceType, weight: StatWeightTable): boolean {
        return true;
    }
    mul(piece: PieceType, weight: StatWeightTable): number {
        return 1;
    }
    add(piece: PieceType, weight: StatWeightTable): number {
        return 0;
    }
};

export const findRule = (stat: Stat, rule: StatWeightTable): number => {
    if (stat.name in rule) return rule[stat.name];
    return 0;
};

export abstract class Scorer<PieceType extends Piece<any>> {
    constructor(
        public name: string,
        public displayName: string,
        public rules: ScoreRule<PieceType>[],
        public weight: StatWeightTable,
    ) { }

    calc(piece: PieceType): number {
        let score = 0, mul = 1;

        this.rules
        .filter(rule => rule.target(piece, this.weight))
        .forEach(rule => {
            score += rule.add(piece, this.weight);
            mul *= rule.mul(piece, this.weight);
        });
        return score * mul;
    }
};
