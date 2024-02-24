import lodash from 'lodash';

import { Lottery, DisplayMode, Path } from '#gc';

export abstract class Stat {
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

export class ArrayStat extends Stat { // upgrade values specified in a list
    upgradeCount: number;

    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode,
        public values: number[]
    ) {
        super(name, displayName, displayMode);

        this.upgradeCount = 0;
    }

    override rollBase() {
        this.value = this.values[0];
    }
    override rollUpgrade() {
        if (this.upgradeCount < this.values.length)
            this.upgradeCount += 1;
        this.value = this.values[this.upgradeCount];
    }
};

export class ConstantStat extends Stat { // all upgrade values are the same
    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode,
        public baseValue: number,
        public upgradeValue: number
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

export class RandomStat extends Stat { // roll base & upgrade value from a list
    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode,
        public values: Lottery<number>
    ) { super(name, displayName, displayMode); }

    override rollBase() {
        this.value = this.values.choice();
    }
    override rollUpgrade() {
        this.value += this.values.choice();
    }
};

export class RandomBaseStat extends Stat { // roll base & upgrade value from two lists
    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode,
        public baseValues: Lottery<number>,
        public upgradeValues: Lottery<number>
    ) { super(name, displayName, displayMode); }

    override rollBase() {
        this.value = this.baseValues.choice();
    }
    override rollUpgrade() {
        this.value += this.upgradeValues.choice();
    }
};

export abstract class Piece<SetType extends Set<any>> {
    mainStat: Stat;
    subStats: Stat[];
    upgradeCount: number;
    parentSet: SetType;

    constructor(
        public name: string,
        public displayName: string,
        public mainStatList: Lottery<Stat>,
        public subStatList: Lottery<Stat>,
        public subStatCount: Lottery<number>
    ) {
        this.mainStat = null;
        this.subStats = [];
        this.upgradeCount = 0;
    }

    abstract get level(): number;

    get imagePath(): string {
        if (!(this.parentSet)) return null;
        if (!(this.name in this.parentSet.pieceData)) return null;

        return Path.Image + this.parentSet.pieceData[this.name].image;
    }

    rollMainStat(): void {
        this.mainStat = this.mainStatList.choice().instance();
    }
    rollSubStats(): void {
        this.subStats = [];
        this.subStatList
            .filter(x => x.name != this.mainStat.name)
            .sample(this.subStatCount.choice())
            .forEach(x => {
                this.subStats.push(x.instance());
            });
    }

    rollUpgrade(): void {
        if (this.upgradeCount >= 5)
            return;

        this.mainStat.rollUpgrade();
        if (this.subStats.length < Math.max(...this.subStatCount.objList)) {
            let names = [this.mainStat.name];
            this.subStats.forEach(x => names.push(x.name));
            this.subStats.push(
                this.subStatList
                    .filter(x => !(names.includes(x.name)))
                    .choice()
                    .instance()
            );
        } else {
            let l = lodash.random(0, this.subStats.length - 1);
            this.subStats[l].rollUpgrade();
        }
        this.upgradeCount += 1;
    }

    abstract generateText(score: number): string;
    abstract generateImage(score: number): Promise<string>;

    get pieceData(): PieceData {
        if (this.parentSet && this.name in this.parentSet.pieceData)
            return this.parentSet.pieceData[this.name];
        return null;
    }

    instance(set: SetType): this {
        let piece = Object.create(this);

        piece.parentSet = set;
        piece.rollMainStat();
        piece.rollSubStats();
        return piece;
    }
};

export interface PieceData {
    name: string;
    displayName: string;
    image: string;
};

export abstract class Set<PieceType extends Piece<any>> {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public pieceList: Lottery<PieceType>,
        public pieceData: { [name: string]: PieceData }
    ) { }

    rollPiece(): PieceType {
        return this.pieceList.choice().instance(this);
    }
    rollPieceMulti(n: number): PieceType[] {
        let res = [];
        this.pieceList.choiceMulti(n).forEach(x => {
            res.push(x.instance(this));
        });
        return res;
    }
};

export abstract class Domain<
    PieceType extends Piece<SetType>,
    SetType extends Set<PieceType> > {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public setList: Lottery<SetType>
    ) {
        setList.objList.forEach(set => {
            this.aliases = this.aliases.concat(set.aliases);
            this.aliases.push(set.displayName);
        });
        this.aliases.push(this.displayName);
    }

    is(s: string): boolean {
        return this.aliases.includes(s);
    }

    rollPiece(): PieceType {
        return this.setList.choice().rollPiece();
    }
    rollPieceMulti(n: number): PieceType[] {
        let res = [];
        this.setList.choiceMulti(n).forEach(x => {
            res.push(x.rollPiece());
        });
        return res;
    }
};

export interface Scorer {
    (piece: Piece<any>): number
};

export interface ScoreRule { [stat: string]: number };
