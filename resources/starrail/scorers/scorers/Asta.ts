import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 0.75,
    "CRIT DMG": 0.75,
    "Break Effect": 1,
    "Energy Regeneration Rate": 1,
    "Fire DMG Boost": 1
};

export const AstaScorer = new StarRail.Scorer(
    "Asta",
    "艾丝妲",
    Rule.All,
    Weight
);
