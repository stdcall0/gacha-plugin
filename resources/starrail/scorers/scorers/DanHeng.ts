import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 0.75,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.50,
    "Wind DMG Boost": 1
};

export const DanHengScorer = new StarRail.Scorer(
    "Dan Heng",
    "丹恒",
    Rule.All,
    Weight
);
