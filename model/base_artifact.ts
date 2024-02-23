import lodash from 'lodash';
import Lottery from './lottery.js';
import { DisplayMode } from './utils.js';

import * as cpath from '../resources/cpath.js';

export abstract class ArtifactStat {
    value: number;

    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode
    ) { this.value = 0.; }

    get displayValue(): string {
        return this.displayMode(this.value);
    }

    abstract rollBase(): void;
    abstract rollUpgrade(): void;

    instance(): this {
        let stat = Object.create(this);
        stat.rollBase();
        return stat;
    }
    alterName(name: string, displayName: string): this {
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

    override rollBase() {
        this.value = this.baseValue;
    }
    override rollUpgrade() {
        this.value = this.upgradeValues[this.upgradeCount];
        if (this.upgradeCount < this.upgradeValues.length)
            this.upgradeCount += 1;
    }
};

export class ArtifactStatIncrease extends ArtifactStat {
    constructor(
        public name: string,
        public displayName: string,
        public baseValue: number,
        public upgradeValue: number,
        public displayMode: DisplayMode
    ) {
        super(name, displayName, displayMode);
    }

    override rollBase() {
        this.value = this.baseValue;
    }
    override rollUpgrade() {
        this.value += this.upgradeValue;
    }
};

export class ArtifactStatRandomS extends ArtifactStat {
    constructor(
        public name: string,
        public displayName: string,
        public values: Lottery<number>,
        public displayMode: DisplayMode
    ) { super(name, displayName, displayMode); }

    override rollBase() {
        this.value = this.values.choice();
    }
    override rollUpgrade() {
        this.value += this.values.choice();
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

    override rollBase() {
        this.value = this.baseValues.choice();
    }
    override rollUpgrade() {
        this.value += this.upgradeValues.choice();
    }
};

export abstract class ArtifactPiece<ArtifactSetType extends ArtifactSet<any>> {
    mainStat: ArtifactStat;
    subStats: ArtifactStat[];
    upgradeCount: number;
    artifactSet: ArtifactSetType;

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

    abstract get level(): number;

    get imagePath(): string {
        if (!(this.artifactSet)) return null;
        if (!(this.name in this.artifactSet.pieceData)) return null;

        return cpath.ImagePath + this.artifactSet.pieceData[this.name].image;
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

    abstract rollUpgrade(): void;

    abstract generateText(score: number): string;
    abstract generateImage(score: number): Promise<string>;

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

    instance(artifactSet: ArtifactSetType): this {
        let piece = Object.create(this);

        piece.artifactSet = artifactSet;
        piece.rollMainStat();
        piece.rollSubStats();
        return piece;
    }
};

export interface ArtifactSetPieceData {
    name: string;
    displayName: string;
    image: string;
};

export abstract class ArtifactSet<ArtifactPieceType extends ArtifactPiece<any>> {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public pieceList: Lottery<ArtifactPieceType>,
        public pieceData: { [name: string]: ArtifactSetPieceData }
    ) { }

    rollPiece(): ArtifactPieceType {
        return this.pieceList.choice().instance(this);
    }
    rollPieceMulti(n: number): ArtifactPieceType[] {
        let res = [];
        this.pieceList.choiceMulti(n).forEach(x => {
            res.push(x.instance(this));
        });
        return res;
    }
};

export abstract class ArtifactDomain<
    ArtifactPieceType extends ArtifactPiece<ArtifactSetType>,
    ArtifactSetType extends ArtifactSet<ArtifactPieceType> > {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public setList: Lottery<ArtifactSetType>
    ) {
        setList.objList.forEach(set => {
            this.aliases = this.aliases.concat(set.aliases);
            this.aliases.push(set.displayName);
        });
        this.aliases.push(this.displayName);
    }

    check(s: string): boolean {
        return this.aliases.includes(s);
    }

    rollPiece(): ArtifactPieceType {
        return this.setList.choice().rollPiece();
    }
    rollPieceMulti(n: number): ArtifactPieceType[] {
        let res = [];
        this.setList.choiceMulti(n).forEach(x => {
            res.push(x.rollPiece());
        });
        return res;
    }
};
