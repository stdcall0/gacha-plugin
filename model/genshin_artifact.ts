import lodash from 'lodash';
import puppeteer from '../../../lib/puppeteer/puppeteer.js';

import * as base from './base.js';
import * as cpath from '../resources/cpath.js';

import { DisplayModes } from './utils.js';

export class Piece extends base.Piece<Set> {

    override get level(): number {
        return 0 + this.upgradeCount * 4;
    }

    override generateText(score: number): string {
        if (!this.pieceData) return null;

        // TODO: Genshin Piece Text
    }

    override async generateImage(score: number): Promise<string> { 
        if (!this.pieceData) return null;

        const data = {
            tplFile: cpath.HTMLPath + 'genshin_artifact.html',
            pluResPath: cpath.ProcessPath,
            artifactPiece: this,
            artifactScore: DisplayModes.Float1D(score),
            locked: false
        };

        return puppeteer.screenshot("genshin_artifact", data);
    }
};

export class Set extends base.Set<Piece> { };

export class Domain extends base.Domain<Piece, Set> { };

/*
export interface Genshin_ArtifactScorer {
    (piece: Genshin_ArtifactPiece): number
};

export interface Genshin_ArtifactScoreRule { [stat: string]: number };
*/
