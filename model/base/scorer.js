;
export class ScoreRule {
    target(piece, weight) {
        return true;
    }
    mul(piece, weight) {
        return 1;
    }
    add(piece, weight) {
        return 0;
    }
}
;
export const findRule = (stat, rule) => {
    if (stat.name in rule)
        return rule[stat.name];
    return 0;
};
export class Scorer {
    constructor(name, displayName, rules, weight) {
        this.name = name;
        this.displayName = displayName;
        this.rules = rules;
        this.weight = weight;
    }
    calc(piece) {
        let score = 0, mul = 1;
        this.rules
            .filter(rule => rule.target(piece, this.weight))
            .forEach(rule => {
            score += rule.add(piece, this.weight);
            mul *= rule.mul(piece, this.weight);
        });
        return score * mul;
    }
}
;
