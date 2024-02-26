import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "HP": 1,
    "FlatHP": 1,
    "DEF": 0.5,
    "FlatDEF": 0.5,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.5,
    "Effect RES": 0.5,
    "Quantum DMG Boost": 1
};

export const FuXuanScorer = new StarRail.Scorer(
    "Fu Xuan",
    "符玄",
    Rule.All,
    Weight
);
