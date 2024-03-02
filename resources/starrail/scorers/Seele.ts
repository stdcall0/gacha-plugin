import { StarRail } from '#gc.model';
import { makeRules } from './rule.js';

export const SeeleScorer = new StarRail.Scorer(
    "Seele",
    "希儿",
    makeRules([
        [["Body"], {"CRIT Rate": 5, "CRIT DMG": 5}],
        [["Feet"], {"ATK": 0}],
        [["Planar Sphere"], {"Quantum DMG Boost": 6}],
        [["Link Rope"], {"ATK": 0}]
    ]),
    {
        "ATK": 0.75,
        "FlatATK": 0.75,
        "SPD": 1,
        "CRIT Rate": 1,
        "CRIT DMG": 1,
        "Energy Regeneration Rate": 0.5,
        "Quantum DMG Boost": 1
    }
);
