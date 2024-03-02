import { StarRail } from '#gc.model';
import { makeRules } from './rule.js';

export const Luocha = new StarRail.Scorer(
    "Luocha",
    "罗刹",
    makeRules([
        [["Body"], {"Outgoing Healing Boost": 5, "ATK": 0}],
        [["Feet"], {"SPD": 5}],
        [["Planar Sphere"], {"ATK": 3, "HP": 0}],
        [["Link Rope"], {"Energy Regeneration Rate": 10}],
    ]),
    {
        "ATK": 1,
        "FlatATK": 1,
        "SPD": 1,
        "CRIT Rate": 1,
        "CRIT DMG": 1,
        "Energy Regeneration Rate": 1,
        "Outgoing Healing Boost": 1,
        "Effect RES": 0.5,
        "Imaginary DMG Boost": 1
    }
);
