import { StarRail } from '#gc.model';
import { makeRules } from './rule.js';
export const GepardScorer = new StarRail.Scorer("Gepard", "杰帕德", makeRules([
    [["Body"], { "Effect Hit Rate": 5, "DEF": 0 }],
    [["Feet"], { "SPD": 5 }],
    [["Planar Sphere"], { "DEF": 3 }],
    [["Link Rope"], { "Energy Regeneration Rate": 10 }],
]), {
    "HP": 0.5,
    "FlatHP": 0.5,
    "DEF": 1,
    "FlatDEF": 1,
    "SPD": 1,
    "Energy Regeneration Rate": 1,
    "Effect Hit Rate": 0.5,
    "Effect RES": 0.5
});
