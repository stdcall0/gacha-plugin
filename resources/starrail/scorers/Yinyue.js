import { StarRail } from '#gc.model';
import { makeRules } from './rule.js';
export const YinyueScorer = new StarRail.Scorer("Dan Heng·Imbibitor Lunae", "丹恒·饮月", makeRules([
    [["Body"], { "CRIT Rate": 5, "CRIT DMG": 5 }],
    [["Feet"], { "ATK": 0 }],
    [["Planar Sphere"], { "Imaginary DMG Boost": 6 }],
    [["Link Rope"], { "ATK": 0, "Energy Regeneration Rate": 10 }]
]), {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.50,
    "Imaginary DMG Boost": 1
});
