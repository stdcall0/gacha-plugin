import { StarRail } from '#gc.model';
import { makeRules } from './rule.js';
export const FuXuan = new StarRail.Scorer("Fu Xuan", "符玄", makeRules([
    [["Body"], { "HP": 0, "DEF": 0, "CRIT DMG": 5 }],
    [["Feet"], { "SPD": 5 }],
    [["Planar Sphere"], { "HP": 3, "DEF": 3, "Quantum DMG Boost": 6 }],
    [["Link Rope"], { "Energy Regeneration Rate": 10 }]
]), {
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
});
