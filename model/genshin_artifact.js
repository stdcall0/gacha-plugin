// @ts-ignore
import puppeteer from '../../../lib/puppeteer/puppeteer.js';
import * as base from './base.js';
import * as cpath from '../resources/cpath.js';
import { DisplayModes } from './utils.js';
export class Piece extends base.Piece {
    get level() {
        return 0 + this.upgradeCount * 4;
    }
    generateText(score) {
        if (!this.pieceData)
            return null;
        // TODO: Genshin Piece Text
    }
    async generateImage(score) {
        if (!this.pieceData)
            return null;
        const data = {
            tplFile: cpath.HTMLPath + 'genshin_artifact.html',
            pluResPath: cpath.ProcessPath,
            artifactPiece: this,
            artifactScore: DisplayModes.Float1D(score),
            locked: false
        };
        return puppeteer.screenshot("genshin_artifact", data);
    }
}
;
export class Set extends base.Set {
}
;
export class Domain extends base.Domain {
}
;
;
;
