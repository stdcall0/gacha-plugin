import lodash from 'lodash';
import puppeteer from '../../../lib/puppeteer/puppeteer.js';

import Lottery from './lottery.js';

import * as base from './base.js';
import * as cpath from '../resources/cpath.js';

import { DisplayModes } from './utils.js';

export class Piece extends base.Piece<Set> {

    override get level(): number {
        return 0 + this.upgradeCount * 3;
    }

    override generateText(score: number): string {
        if (!this.pieceData) return null;

        let res: string = `${this.displayName} ${this.pieceData.displayName}\nLv. ${this.level}\n\n`;
        res += `${this.mainStat.displayName} ${this.mainStat.displayValue}\n\n`;

        this.subStats.forEach(subStat =>
            res += `${subStat.displayName} ${subStat.displayValue}\n`
        );

        return res.trimEnd();
    }

    override async generateImage(score: number): Promise<string> {
        // TODO: generate Artifact Image for Star Rail
        // Might need to check for relic type (inner & outer)

        if (!this.pieceData) return null;

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

export enum RelicType {
    Inner,
    Outer
};

export class Set extends base.Set<Piece> {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public type: RelicType,
        public pieceList: Lottery<Piece>,
        public pieceData: { [name: string]: base.PieceData }
    ) { super(name, displayName, aliases, pieceList, pieceData); }
};

export class Domain extends base.Domain<Piece, Set> { };

/*
export interface StarRail_RelicScorer {
    (piece: StarRail_RelicPiece): number
};

export interface StarRail_RelicScoreRule { [stat: string]: number };
*/
