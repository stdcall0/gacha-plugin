import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const YanqingWeight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 0.75,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.75,
    "Ice DMG Boost": 1
};

export const YanqingScorer = new StarRail.Scorer(
    "Yanqing",
    "彦卿",
    Rule.All,
    YanqingWeight
);
