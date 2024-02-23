import * as cpath from '../resources/cpath.js';
export class ArtifactStat {
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
export class ArtifactStatConst extends ArtifactStat {
    constructor(name, displayName, baseValue, upgradeValues, displayMode) {
        super(name, displayName, displayMode);
        this.name = name;
        this.displayName = displayName;
        this.baseValue = baseValue;
        this.upgradeValues = upgradeValues;
        this.displayMode = displayMode;
        this.upgradeCount = 0;
    }
    rollBase() {
        this.value = this.baseValue;
    }
    rollUpgrade() {
        this.value = this.upgradeValues[this.upgradeCount];
        if (this.upgradeCount < this.upgradeValues.length)
            this.upgradeCount += 1;
    }
}
;
export class ArtifactStatIncrease extends ArtifactStat {
    constructor(name, displayName, baseValue, upgradeValue, displayMode) {
        super(name, displayName, displayMode);
        this.name = name;
        this.displayName = displayName;
        this.baseValue = baseValue;
        this.upgradeValue = upgradeValue;
        this.displayMode = displayMode;
    }
    rollBase() {
        this.value = this.baseValue;
    }
    rollUpgrade() {
        this.value += this.upgradeValue;
    }
}
;
export class ArtifactStatRandomS extends ArtifactStat {
    constructor(name, displayName, values, displayMode) {
        super(name, displayName, displayMode);
        this.name = name;
        this.displayName = displayName;
        this.values = values;
        this.displayMode = displayMode;
    }
    rollBase() {
        this.value = this.values.choice();
    }
    rollUpgrade() {
        this.value += this.values.choice();
    }
}
;
export class ArtifactStatRandom extends ArtifactStat {
    constructor(name, displayName, baseValues, upgradeValues, displayMode) {
        super(name, displayName, displayMode);
        this.name = name;
        this.displayName = displayName;
        this.baseValues = baseValues;
        this.upgradeValues = upgradeValues;
        this.displayMode = displayMode;
    }
    rollBase() {
        this.value = this.baseValues.choice();
    }
    rollUpgrade() {
        this.value += this.upgradeValues.choice();
    }
}
;
export class ArtifactPiece {
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
        if (!(this.artifactSet))
            return null;
        if (!(this.name in this.artifactSet.pieceData))
            return null;
        return cpath.ImagePath + this.artifactSet.pieceData[this.name].image;
    }
    rollMainStat() {
        this.mainStat = this.mainStatList.choice().instance();
    }
    rollSubStats() {
        this.subStats = [];
        this.subStatList.sample(this.subStatCount.choice()).forEach(x => {
            this.subStats.push(x.instance());
        });
    }
    get setName() {
        if (this.artifactSet && this.name in this.artifactSet.pieceData)
            return this.artifactSet.pieceData[this.name].name;
        return this.name;
    }
    get setDisplayName() {
        if (this.artifactSet && this.name in this.artifactSet.pieceData)
            return this.artifactSet.pieceData[this.name].displayName;
        return this.displayName;
    }
    instance(artifactSet) {
        let piece = Object.create(this);
        piece.artifactSet = artifactSet;
        piece.rollMainStat();
        piece.rollSubStats();
        return piece;
    }
}
;
;
export class ArtifactSet {
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
export class ArtifactDomain {
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
    check(s) {
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
