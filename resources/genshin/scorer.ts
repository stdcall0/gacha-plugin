import { Base, Genshin } from '#gc.model';

const BaseScoreMultipler: Genshin.ScoreRule = {
    "CRIT Rate": 2,
    "CRIT Damage": 1,
    "Elemental Mastery": 0.33,
    "Energy Recharge": 1.1979,
    "ATK": 1.33,
    "HP": 1.33,
    "DEF": 1.06,
    "FlatATK": 0.398 * 0.5,
    "FlatHP": 0.026 * 0.66,
    "FlatDEF": 0.335 * 0.66
};

const TempScoreMultipler: Genshin.ScoreRule = {
    "CRIT Rate": 1,
    "CRIT Damage": 1,
    "Elemental Mastery": 0.15,
    "Energy Recharge": 0.15,
    "ATK": 0.1,
    "HP": 0.1,
    "DEF": 0,
    "FlatATK": 0.05,
    "FlatHP": 0.05,
    "FlatDEF": 0
};

const findRule = (stat: Base.Stat, rule: Genshin.ScoreRule): number => {
    if (stat.name in rule) return rule[stat.name];
    return 0;
};

const spStat = ["CRIT Rate", "CRIT Damage"];

export const Scorer: Genshin.Scorer =
    (piece: Genshin.Piece) => {
        let score = 0;
        if (spStat.includes(piece.mainStat.name)) score = 12;
        piece.subStats.forEach(subStat => {
            score += subStat.value
                * findRule(subStat, BaseScoreMultipler)
                * findRule(subStat, TempScoreMultipler);
        });
        return score;
    };
