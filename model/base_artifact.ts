import * as lodash from 'lodash';
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

    instance(): ArtifactPiece {
        let piece = Object.create(this);

        piece.rollMainStat();
        piece.rollSubStats();
        return piece;
    }
};

export interface PieceName {
    name: string;
    displayName: string;
};

export class ArtifactSet {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public pieceList: Lottery<ArtifactPiece>,
        public pieceNames: { [name: string]: PieceName }
    ) { }

    rollPiece(): ArtifactPiece {
        return this.pieceList.choice().instance();
    }
    rollPieceMulti(n: number): ArtifactPiece[] {
        let res = [];
        this.pieceList.choiceMulti(n).forEach(x => {
            res.push(x.instance());
        });
        return res;
    }

    getPieceName(p: ArtifactPiece): string {
        if (p.name in this.pieceNames)
            return this.pieceNames[p.name].name;
        return p.name;
    }
    getPieceDisplayName(p: ArtifactPiece): string {
        if (p.name in this.pieceNames)
            return this.pieceNames[p.name].displayName;
        return p.displayName;
    }
};
