import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';

const Weight = {
    "HP": 1,
    "FlatHP": 1,
    "DEF": 0.5,
    "FlatDEF": 0.5,
    "SPD": 0.75,
    "Energy Regeneration Rate": 1,
    "Outgoing Healing Boost": 1,
    "Effect RES": 0.5
};

const Match = {
    "Outgoing Healing Boost": 5,
    "SPD": 5,
    "Energy Regeneration Rate": 10,
    "HP": 0
};

export const BailuScorer = new StarRail.Scorer(
    "Bailu",
    "白露",
    Rule.makeRule(Match),
    Weight
);
