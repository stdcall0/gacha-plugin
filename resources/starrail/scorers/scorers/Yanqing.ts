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

const Match = {
    "CRIT DMG": 5,
    "Ice DMG Boost": 6,
    "ATK": 0
};

export const YanqingScorer = new StarRail.Scorer(
    "Yanqing",
    "彦卿",
    Rule.makeRule(Match),
    YanqingWeight
);
