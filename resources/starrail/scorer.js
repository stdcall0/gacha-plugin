const ScoreMultipler = {
    "CRIT Rate": 2,
    "CRIT DMG": 1
}; // a very simple multipler
const findRule = (stat, rule) => {
    if (stat.name in rule)
        return rule[stat.name];
    return 0;
};
export const Scorer = (piece) => {
    let score = 0;
    piece.subStats.forEach(subStat => {
        score += subStat.value
            * findRule(subStat, ScoreMultipler);
    });
    return score;
};
