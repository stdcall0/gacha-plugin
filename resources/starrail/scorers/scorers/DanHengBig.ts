import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.50,
    "Imaginary DMG Boost": 1
};

export const DanHengBigScorer = new StarRail.Scorer(
    "Dan Heng·Imbibitor Lunae",
    "丹恒·饮月",
    Rule.All,
    Weight
);
