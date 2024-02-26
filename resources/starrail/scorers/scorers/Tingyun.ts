import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "HP": 0.5,
    "FlatHP": 0.5,
    "ATK": 1,
    "FlatATK": 1,
    "SPD": 1,
    "Energy Regeneration Rate": 1,
};

export const TingyunScorer = new StarRail.Scorer(
    "Tingyun",
    "停云",
    Rule.All,
    Weight
);
