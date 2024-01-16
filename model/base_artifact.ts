import lodash from 'lodash';
import Lottery from './lottery.js';
import { DisplayMode } from './utils.js';


export class ArtifactStat {
    value: number;

    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode
    ) { this.value = 0.; }

    get displayValue(): string {
        return this.displayMode(this.value);
    }

    rollBase(): void { }
    rollUpgrade(): void { }

    instance(): ArtifactStat {
        let stat = Object.create(this);
        stat.rollBase();
        return stat;
    }
    alterName(name: string, displayName: string): ArtifactStat {
        let stat = Object.create(this);
        stat.name = name;
        stat.displayName = displayName;
        return stat;
    }
};

export class ArtifactStatConst extends ArtifactStat {
    upgradeCount: number;

    constructor(
        public name: string,
        public displayName: string,
        public baseValue: number,
        public upgradeValues: number[],
        public displayMode: DisplayMode
    ) {
        super(name, displayName, displayMode);

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
};

export class ArtifactStatRandom extends ArtifactStat {
    constructor(
        public name: string,
        public displayName: string,
        public baseValues: Lottery<number>,
        public upgradeValues: Lottery<number>,
        public displayMode: DisplayMode
    ) { super(name, displayName, displayMode); }

    rollBase() {
        this.value = this.baseValues.choice();
    }
    rollUpgrade() {
        this.value += this.upgradeValues.choice();
    }
};

export class ArtifactPiece {
    mainStat: ArtifactStat;
    subStats: ArtifactStat[];
    artifactSet: ArtifactSet;

    constructor(
        public name: string,
        public displayName: string,
        public mainStatList: Lottery<ArtifactStat>,
        public subStatList: Lottery<ArtifactStat>,
        public subStatCount: Lottery<number>
    ) {
        this.mainStat = null;
        this.subStats = [];
    }

    rollMainStat(): void {
        this.mainStat = this.mainStatList.choice().instance();
    }
    rollSubStats(): void {
        this.subStats = [];
        this.subStatList.sample(this.subStatCount.choice()).forEach(x => {
            this.subStats.push(x.instance());
        });
    }
    rollUpgrade(): void { // NOTE: this method should be overriden for subStat thingsv                                                                                                                                                                                                                                                                                               
        if (this.mainStat) {
            this.mainStat.rollUpgrade();
        }
        if (this.subStats) {
            let l = lodash.random(0, this.subStats.length - 1);
            this.subStats[l].rollUpgrade();
        }
    }

    get setName(): string {
        if (this.artifactSet && this.name in this.artifactSet.pieceData)
            return this.artifactSet.pieceData[this.name].name;
        return this.name;
    }
    get setDisplayName(): string {
        if (this.artifactSet && this.name in this.artifactSet.pieceData)
            return this.artifactSet.pieceData[this.name].displayName;
        return this.displayName;
    }

    instance(artifactSet: ArtifactSet): ArtifactPiece {
        let piece = Object.create(this);

        piece.artifactSet = artifactSet;
        piece.rollMainStat();
        piece.rollSubStats();
        return piece;
    }
};

export interface ArtifactPieceData {
    name: string;
    displayName: string;
};

export class ArtifactSet {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public pieceList: Lottery<ArtifactPiece>,
        public pieceData: { [name: string]: ArtifactPieceData }
    ) { }

    rollPiece(): ArtifactPiece {
        return this.pieceList.choice().instance(this);
    }
    rollPieceMulti(n: number): ArtifactPiece[] {
        let res = [];
        this.pieceList.choiceMulti(n).forEach(x => {
            res.push(x.instance(this));
        });
        return res;
    }
};
