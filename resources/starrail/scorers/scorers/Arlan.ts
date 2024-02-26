import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 0.75,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.5,
    "Lightning DMG Boost": 1
};

export const ArlanScorer = new StarRail.Scorer(
    "Arlan",
    "阿兰",
    Rule.All,
    Weight
);
