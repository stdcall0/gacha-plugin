import { StarRail } from "#gc.model";

export const SubStatWeight = new StarRail.SubStatWeightRule(
    {
        "CRIT Rate": 2,
        "CRIT Damage": 1,
        "HP": 1.5,
        "ATK": 1.5,
        "DEF": 1.19,
        "SPD": 2.53,
        "Break Effect": 1,
        "Effect Hit Rate": 1.49,
        "Effect RES": 1.49,
        "FlatATK": 0.3 * 0.5,
        "FlatDEF": 0.3 * 0.5,
        "FlatHP": 0.153 * 0.5,
    }
);
