import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const JingliuWeight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.5,
    "Ice DMG Boost": 1
};
export const JingliuScorer = new StarRail.Scorer("Jingliu", "镜流", Rule.All, JingliuWeight);
