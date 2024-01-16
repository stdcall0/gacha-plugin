import lodash from 'lodash';
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
    rollBase() { }
    rollUpgrade() { }
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
        this.upgradeCount += 1;
        if (this.upgradeCount == this.upgradeValues.length)
            this.upgradeCount = 0;
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
    rollUpgrade() {
        if (this.mainStat) {
            this.mainStat.rollUpgrade();
        }
        if (this.subStats) {
            let l = lodash.random(0, this.subStats.length - 1);
            this.subStats[l].rollUpgrade();
        }
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
