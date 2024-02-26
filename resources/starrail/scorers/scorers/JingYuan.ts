import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.5,
    "Quantum DMG Boost": 1
};

export const JingYuanScorer = new StarRail.Scorer(
    "Jing Yuan",
    "景元",
    Rule.All,
    Weight
);
