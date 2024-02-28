import { MainStatWeight } from "./MainStatWeight.js";
import { SubStatWeight } from "./SubStatWeight.js";
const All = [
    MainStatWeight,
    SubStatWeight
];
import { StarRail } from "#gc.model";
const MainStatMatchRule = StarRail.MainStatMatchRule;
const makeRule = (match) => {
    return [
        MainStatWeight,
        SubStatWeight,
        new MainStatMatchRule(match)
    ];
};
export { makeRule, MainStatMatchRule, MainStatWeight, SubStatWeight, All };
