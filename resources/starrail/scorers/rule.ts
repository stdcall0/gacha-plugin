import { StarRail } from "#gc.model";

const subRule = new StarRail.SubStatRule({
    "CRIT Rate": 2,
    "CRIT DMG": 1,
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
});

type RuleArgs = [string[], { [ statName: string ]: number }, number?, number?];

export const makeRules = (mainRules: RuleArgs[]): StarRail.ScoreRule[] => {
    let arr: StarRail.ScoreRule[] = [ subRule ];

    for (let i = 0; i < mainRules.length; ++i) {
        mainRules[i].push(null);
        mainRules[i].push(null);

        mainRules[i][2] ??= 5.83; // default reward
        mainRules[i][3] ??= 0.25; // default punish
        arr.push(new StarRail.MainStatRule(
            mainRules[i][0],
            mainRules[i][1],
            mainRules[i][2],
            mainRules[i][3],
        ));
    }

    return arr;
};
