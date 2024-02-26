import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.50,
    "Effect Hit Rate": 1,
    "Wind DMG Boost": 1
};
export const SampoScorer = new StarRail.Scorer("Sambo", "桑博", Rule.All, Weight);
