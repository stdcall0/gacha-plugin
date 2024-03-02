import { StarRail } from '#gc.model';
import { makeRules } from './rule.js';

export const Jingliu = new StarRail.Scorer(
    "Jingliu",
    "镜流",
    makeRules([
        [["Body"], {"CRIT DMG": 5}],
        [["Feet"], {"SPD": 5}],
        [["Planar Sphere"], {"Ice DMG Boost": 6}],
        [["Link Rope"], {"ATK": 0, "Energy Regeneration Rate": 10}],
    ]),
    {
        "ATK": 0.75,
        "FlatATK": 0.75,
        "SPD": 1,
        "CRIT Rate": 1,
        "CRIT DMG": 1,
        "Energy Regeneration Rate": 0.5,
        "Ice DMG Boost": 1
    }
);
