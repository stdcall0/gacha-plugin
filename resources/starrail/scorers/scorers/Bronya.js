import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 0.75,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 1,
    "Wind DMG Boost": 1
};
export const BronyaScorer = new StarRail.Scorer("Bronya", "布洛妮娅", Rule.All, Weight);
