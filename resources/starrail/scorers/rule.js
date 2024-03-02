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
export const makeRules = (mainRules) => {
    var _a, _b;
    var _c, _d;
    let arr = [subRule];
    for (let i = 0; i < mainRules.length; ++i) {
        mainRules.push(null);
        mainRules.push(null);
        (_a = (_c = mainRules[i])[2]) !== null && _a !== void 0 ? _a : (_c[2] = 5.83); // default reward
        (_b = (_d = mainRules[i])[3]) !== null && _b !== void 0 ? _b : (_d[3] = 0.25); // default punish
        arr.push(new StarRail.MainStatRule(mainRules[i][0], mainRules[i][1], mainRules[i][2], mainRules[i][3]));
    }
    return arr;
};
