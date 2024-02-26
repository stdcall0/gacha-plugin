import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const Weight = {
    "ATK": 1,
    "FlatATK": 1,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 1,
    "Outgoing Healing Boost": 1,
    "Effect RES": 0.5,
    "Imaginary DMG Boost": 1
};
export const LuochaScorer = new StarRail.Scorer("Luocha", "罗刹", Rule.All, Weight);
