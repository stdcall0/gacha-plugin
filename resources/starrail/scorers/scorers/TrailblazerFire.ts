import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "HP": 0.5,
    "FlatHP": 0.5,
    "DEF": 1,
    "FlatDEF": 1,
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 0.75,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.5,
    "Fire DMG Boost": 1
};

export const TrailblazerFireScorer = new StarRail.Scorer(
    "Trailblazer (fire)",
    "开拓者 (火)",
    Rule.All,
    Weight
);
