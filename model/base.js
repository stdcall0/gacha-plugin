import lodash from 'lodash';
import { Path } from '#gc';
;
export class BaseStat {
    constructor(name, displayName, displayMode) {
        this.name = name;
        this.displayName = displayName;
        this.displayMode = displayMode;
        this.value = 0.;
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
        this.upgradeCount = 0;
    }
    rollBase() {
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
        this.value = this.baseValue;
    }
    rollUpgrade() {
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
        this.value = this.values.choice();
    }
    rollUpgrade() {
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
        this.value = this.baseValues.choice();
    }
    rollUpgrade() {
        this.value += this.upgradeValues.choice();
    }
}
;
export class Piece {
    constructor(name, displayName, mainStatList, subStatList, subStatCount) {
        this.name = name;
        this.displayName = displayName;
        this.mainStatList = mainStatList;
        this.subStatList = subStatList;
        this.subStatCount = subStatCount;
        this.mainStat = null;
        this.subStats = [];
        this.upgradeCount = 0;
    }
    get imagePath() {
        if (!(this.pieceData))
            return null;
        return Path.Image + "/" + this.pieceData.image;
    }
    get pieceData() {
        if (this.parentSet && this.name in this.parentSet.pieceData)
            return this.parentSet.pieceData[this.name];
        return null;
    }
    rollMainStat() {
        this.mainStat = this.mainStatList.choice().instance();
    }
    rollSubStats() {
        this.subStats = [];
        this.subStatList
            .filter(x => x.name != this.mainStat.name)
            .sample(this.subStatCount.choice())
            .forEach(x => {
            this.subStats.push(x.instance());
        });
    }
    rollUpgrade() {
        if (this.upgradeCount >= 5)
            return;
        this.mainStat.rollUpgrade();
        if (this.subStats.length < Math.max(...this.subStatCount.objList)) {
            let names = [this.mainStat.name];
            this.subStats.forEach(x => names.push(x.name));
            this.subStats.push(this.subStatList
                .filter(x => !(names.includes(x.name)))
                .choice()
                .instance());
        }
        else {
            let l = lodash.random(0, this.subStats.length - 1);
            this.subStats[l].rollUpgrade();
        }
        this.upgradeCount += 1;
    }
    instance(set) {
        let piece = Object.create(this);
        piece.parentSet = set;
        piece.rollMainStat();
        piece.rollSubStats();
        return piece;
    }
}
;
;
export class Set {
    constructor(name, displayName, aliases, pieceList, pieceData) {
        this.name = name;
        this.displayName = displayName;
        this.aliases = aliases;
        this.pieceList = pieceList;
        this.pieceData = pieceData;
    }
    rollPiece() {
        return this.pieceList.choice().instance(this);
    }
    rollPieceMulti(n) {
        let res = [];
        this.pieceList.choiceMulti(n).forEach(x => {
            res.push(x.instance(this));
        });
        return res;
    }
}
;
export class Domain {
    constructor(name, displayName, aliases, setList) {
        this.name = name;
        this.displayName = displayName;
        this.aliases = aliases;
        this.setList = setList;
        setList.objList.forEach(set => {
            this.aliases = this.aliases.concat(set.aliases);
            this.aliases.push(set.displayName);
        });
        this.aliases.push(this.displayName);
    }
    is(s) {
        return this.aliases.includes(s);
    }
    rollPiece() {
        return this.setList.choice().rollPiece();
    }
    rollPieceMulti(n) {
        let res = [];
        this.setList.choiceMulti(n).forEach(x => {
            res.push(x.rollPiece());
        });
        return res;
    }
}
;
;
;
