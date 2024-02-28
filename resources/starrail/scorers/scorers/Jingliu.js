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
const Match = {
    "CRIT DMG": 5,
    "SPD": 5,
    "Ice DMG Boost": 6,
    "ATK": 0,
    "Energy Regeneration Rate": 10,
};
export const JingliuScorer = new StarRail.Scorer("Jingliu", "镜流", Rule.makeRule(Match), JingliuWeight);
