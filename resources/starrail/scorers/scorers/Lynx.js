import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const Weight = {
    "HP": 1,
    "FlatHP": 1,
    "DEF": 0.5,
    "FlatDEF": 0.5,
    "SPD": 1,
    "Energy Regeneration Rate": 0.75,
    "Outgoing Healing Boost": 1,
    "Effect RES": 0.5
};
export const LynxScorer = new StarRail.Scorer("Lynx", "玲可", Rule.All, Weight);
