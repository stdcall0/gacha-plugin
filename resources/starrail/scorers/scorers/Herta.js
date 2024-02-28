import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const HertaWeight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 0.75,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.50,
    "Ice DMG Boost": 1
};
const Match = {
    "CRIT DMG": 5,
    "CRIT Rate": 5,
    "Ice DMG Boost": 6,
    "ATK": 0,
    "SPD": 5
};
export const HertaScorer = new StarRail.Scorer("Herta", "黑塔", Rule.makeRule(Match), HertaWeight);
