import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 0.75,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.50,
    "Quantum DMG Boost": 1
};
export const QingqueScorer = new StarRail.Scorer("Qingque", "青雀", Rule.All, Weight);
