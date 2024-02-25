;
export class BaseStat {
    constructor(name, displayName, displayMode) {
        this.name = name;
        this.displayName = displayName;
        this.displayMode = displayMode;
        this.value = this.upgradeCount = 0;
    }
    get displayValue() {
        return this.displayMode(this.value);
    }
    instance() {
        let stat = Object.create(this);
        stat.rollBase();
        return stat;
    }
    alterName(name, displayName) {
        let stat = Object.create(this);
        stat.name = name;
        stat.displayName = displayName;
        return stat;
    }
}
;
export class ArrayStat extends BaseStat {
    constructor(name, displayName, displayMode, values) {
        super(name, displayName, displayMode);
        this.name = name;
        this.displayName = displayName;
        this.displayMode = displayMode;
        this.values = values;
    }
    rollBase() {
        this.upgradeCount = 0;
        this.value = this.values[0];
    }
    rollUpgrade() {
        if (this.upgradeCount < this.values.length)
            this.upgradeCount += 1;
        this.value = this.values[this.upgradeCount];
    }
}
;
export class ConstantStat extends BaseStat {
    constructor(name, displayName, displayMode, baseValue, upgradeValue) {
        super(name, displayName, displayMode);
        this.name = name;
        this.displayName = displayName;
        this.displayMode = displayMode;
        this.baseValue = baseValue;
        this.upgradeValue = upgradeValue;
    }
    rollBase() {
        this.upgradeCount = 0;
        this.value = this.baseValue;
    }
    rollUpgrade() {
        this.upgradeCount += 1;
        this.value += this.upgradeValue;
    }
}
;
export class RandomStat extends BaseStat {
    constructor(name, displayName, displayMode, values) {
        super(name, displayName, displayMode);
        this.name = name;
        this.displayName = displayName;
        this.displayMode = displayMode;
        this.values = values;
    }
    rollBase() {
        this.upgradeCount = 0;
        this.value = this.values.choice();
    }
    rollUpgrade() {
        this.upgradeCount += 1;
        this.value += this.values.choice();
    }
}
;
export class RandomBaseStat extends BaseStat {
    constructor(name, displayName, displayMode, baseValues, upgradeValues) {
        super(name, displayName, displayMode);
        this.name = name;
        this.displayName = displayName;
        this.displayMode = displayMode;
        this.baseValues = baseValues;
        this.upgradeValues = upgradeValues;
    }
    rollBase() {
        this.upgradeCount = 0;
        this.value = this.baseValues.choice();
    }
    rollUpgrade() {
        this.upgradeCount += 1;
        this.value += this.upgradeValues.choice();
    }
}
;
