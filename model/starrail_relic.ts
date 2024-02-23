import lodash from 'lodash';
import puppeteer from '../../../lib/puppeteer/puppeteer.js';

import Lottery from './lottery.js';

import * as base from './base_artifact.js';
import * as cpath from '../resources/cpath.js';

import { DisplayModes } from './utils.js';

export class StarRail_RelicPiece extends base.ArtifactPiece<StarRail_RelicSet> {

    override get level(): number {
        return 0 + this.upgradeCount * 3;
    }

    override rollSubStats() {
        // This is (almost) the same as Genshin method, but I decided to
        // seperate it from Genshin's for better extensivity.
        // Also rings true for rollUpgrade().

        this.subStats = [];
        this.subStatList
            .filter(x => x.name != this.mainStat.name)
            .sample(this.subStatCount.choice())
            .forEach(x => {
                this.subStats.push(x.instance());
            });
    }

    override rollUpgrade() {
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

    override generateText(score: number): string {
        if (!this.artifactSet)
            return null;
        if (!(this.name in this.artifactSet.pieceData))
            return null;

        let res: string = `${this.displayName} ${this.artifactSet.pieceData[this.name].displayName}\nLv ${this.level}\n\n`;
        res += `${this.mainStat.displayName} ${this.mainStat.displayValue}\n\n`;

        this.subStats.forEach(subStat =>
            res += `${subStat.displayName} ${subStat.displayValue}\n`
        );

        return res.trimEnd();
    }

    override async generateImage(score: number): Promise<string> {
        // TODO: generate Artifact Image for Star Rail
        // Might need to check for relic type (inner & outer)

        if (!this.artifactSet)
            return null;
        if (!(this.name in this.artifactSet.pieceData))
            return null;

        const data = {
            tplFile: cpath.HTMLPath + 'starrail_relic.html',
            pluResPath: cpath.ProcessPath,
            artifactPiece: this,
            artifactScore: DisplayModes.Float1D(score),
            locked: false
        };

        return puppeteer.screenshot("starrail_relic", data);
    }
};

export enum StarRail_RelicType {
    Inner,
    Outer
};
export class StarRail_RelicSet extends base.ArtifactSet<StarRail_RelicPiece> {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public type: StarRail_RelicType,
        public pieceList: Lottery<StarRail_RelicPiece>,
        public pieceData: { [name: string]: base.ArtifactSetPieceData }
    ) { super(name, displayName, aliases, pieceList, pieceData); }
};

export class StarRail_RelicDomain extends base.ArtifactDomain<StarRail_RelicPiece, StarRail_RelicSet> {

};

export interface StarRail_RelicScorer {
    (piece: StarRail_RelicPiece): number
};

export interface StarRail_RelicScoreRule { [stat: string]: number };
