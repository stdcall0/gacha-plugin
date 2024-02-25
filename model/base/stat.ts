import { DisplayMode, Lottery } from '#gc';

export interface Stat {
    constructor: CallableFunction;

    name: string;
    value: number;
    displayName: string;
    displayMode: DisplayMode;

    upgradeCount: number;

    get displayValue(): string;

    rollBase(): void;
    rollUpgrade(): void;

    instance(): this;
    alterName(name: string, displayName: string): this;
};

export abstract class BaseStat implements Stat {
    value: number;
    upgradeCount: number;

    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode
    ) { this.value = this.upgradeCount = 0; }

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

export class ArrayStat extends BaseStat { // upgrade values specified in a list
    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode,
        public values: number[]
    ) {
        super(name, displayName, displayMode);
    }

    override rollBase() {
        this.upgradeCount = 0;
        this.value = this.values[0];
    }
    override rollUpgrade() {
        if (this.upgradeCount < this.values.length)
            this.upgradeCount += 1;
        this.value = this.values[this.upgradeCount];
    }
};

export class ConstantStat extends BaseStat { // all upgrade values are the same
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
        this.upgradeCount = 0;
        this.value = this.baseValue;
    }
    override rollUpgrade() {
        this.upgradeCount += 1;
        this.value += this.upgradeValue;
    }
};

export class RandomStat extends BaseStat { // roll base & upgrade value from a list
    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode,
        public values: Lottery<number>
    ) { super(name, displayName, displayMode); }

    override rollBase() {
        this.upgradeCount = 0;
        this.value = this.values.choice();
    }
    override rollUpgrade() {
        this.upgradeCount += 1;
        this.value += this.values.choice();
    }
};

export class RandomBaseStat extends BaseStat { // roll base & upgrade value from two lists
    constructor(
        public name: string,
        public displayName: string,
        public displayMode: DisplayMode,
        public baseValues: Lottery<number>,
        public upgradeValues: Lottery<number>
    ) { super(name, displayName, displayMode); }

    override rollBase() {
        this.upgradeCount = 0;
        this.value = this.baseValues.choice();
    }
    override rollUpgrade() {
        this.upgradeCount += 1;
        this.value += this.upgradeValues.choice();
    }
};
