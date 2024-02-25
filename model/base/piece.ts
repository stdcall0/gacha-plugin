import lodash from 'lodash';

import { Lottery, Path } from "#gc";

import { Stat } from "./stat.js";
import { PieceData } from "./piecedata.js";
import { Set } from "./set.js";

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
        if (!(this.pieceData)) return null;

        return Path.Image + "/" + this.pieceData.image;
    }

    get pieceData(): PieceData {
        if (this.parentSet && this.name in this.parentSet.pieceData)
            return this.parentSet.pieceData[this.name];
        return null;
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

    instance(set: SetType): this {
        let piece = Object.create(this);

        piece.parentSet = set;
        piece.rollMainStat();
        piece.rollSubStats();
        return piece;
    }
};
