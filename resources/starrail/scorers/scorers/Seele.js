import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const SeeleWeight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.5,
    "Quantum DMG Boost": 1
};
const Match = {
    "ATK": 0,
    "CRIT Rate": 5,
    "CRIT DMG": 5,
    "Quantum DMG Boost": 6,
};
export const SeeleScorer = new StarRail.Scorer("Seele", "希儿", Rule.makeRule(Match), SeeleWeight);
