import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "HP": 0.5,
    "FlatHP": 0.5,
    "DEF": 1,
    "FlatDEF": 1,
    "SPD": 1,
    "Energy Regeneration Rate": 1,
    "Effect Hit Rate": 0.5,
    "Effect RES": 0.5
};

export const GepardScorer = new StarRail.Scorer(
    "Gepard",
    "杰帕德",
    Rule.All,
    Weight
);
