import { Base } from '#gc.model';
import { DisplayModes, Render, Path, Lottery, ScoreTier } from '#gc';

import { Scorer } from './scorer.js';

export enum RelicType {
    Inner,
    Outer
};
export interface Stat extends Base.Stat {
    get imagePath(): string;
    get upgradeText(): string;
};

export class ConstantStat extends Base.ConstantStat implements Stat {
    get imagePath(): string {
        return Path.Image + "/sr/" + this.name + ".webp";
    }
    get upgradeText(): string {
        return ">".repeat(this.upgradeCount);
    }
};

export class RandomStat extends Base.RandomStat implements Stat { 
    get imagePath(): string {
        return Path.Image + "/sr/" + this.name + ".webp";
    }
    get upgradeText(): string {
        return ">".repeat(this.upgradeCount);
    }
};

export class Piece extends Base.Piece<Set> {
    mainStat: Stat;
    subStats: Stat[];
    private _score: number;
    private _scoreSrc: string;
    private _lastLevel: number;

    constructor(
        public name: string,
        public displayName: string,
        public mainStatList: Lottery<Stat>,
        public subStatList: Lottery<Stat>,
        public subStatCount: Lottery<number>
    ) {
        super(name, displayName, mainStatList, subStatList, subStatCount);
        this._score = 0; this._scoreSrc = "/";
        this._lastLevel = -1;
    }

    override get level(): number {
        return 0 + this.upgradeCount * 3;
    }

    override get imagePath(): string {
        if (!(this.pieceData)) return null;

        return Path.Resource + "/starrail/" + this.pieceData.image;
    }

    private calculateScore(): void {
        if (!this.parentSet) return;
        if (this.level == this._lastLevel) return;

        this.parentSet.scorers.forEach(scorer => {
            const score = scorer.calc(this);
            if (score > this._score) {
                this._score = score;
                this._scoreSrc = scorer.displayName;
            }
        });
        this._lastLevel = this.level;
    }

    get score(): number {
        this.calculateScore();
        return this._score;
    }
    get scoreSrc(): string {
        this.calculateScore();
        return this._scoreSrc;
    }

    override generateText(): string {
        if (!this.pieceData) return null;

        let res: string;
        res = `${this.displayName} ${this.pieceData.displayName}\nLv. ${this.level}`;
        res += `  |  ${DisplayModes.Float2D(this.score)}\n\n`;
        res += `${this.mainStat.displayName} ${this.mainStat.displayValue}\n\n`;

        this.subStats.forEach(subStat =>
            res += `${subStat.displayName} ${subStat.displayValue}\n`
        );

        return res.trimEnd();
    }

    override async generateImage(): Promise<string> {
        if (!this.pieceData) return null;

        const data = {
            tplFile: Path.HTML + '/starrail_relic.html',
            resPath: Path.Resource,
            htmlPath: Path.HTML,
            piece: this,
            score: DisplayModes.Float1D(this.score),
            scoreSrc: `@${this.scoreSrc}`,
            showTier: this.level >= 15,
            tier: ScoreTier(this.score),
            locked: this.score >= 40
        };

        return Render.render("starrail_relic", data);
    }
};

export class Set extends Base.Set<Piece> {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public type: RelicType,
        public scorers: Scorer[],
        public pieceList: Lottery<Piece>,
        public pieceData: { [name: string]: Base.PieceData }
    ) { super(name, displayName, aliases, pieceList, pieceData); }
};

export class Domain extends Base.Domain<Piece, Set> { };
