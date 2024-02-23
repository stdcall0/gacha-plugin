import lodash from 'lodash';
import puppeteer from '../../../lib/puppeteer/puppeteer.js';
import * as base from './base_artifact.js';
import * as cpath from '../resources/cpath.js';
import { DisplayModes } from './utils.js';
export class Genshin_ArtifactPiece extends base.ArtifactPiece {
    get level() {
        return 0 + this.upgradeCount * 4;
    }
    rollSubStats() {
        this.subStats = [];
        this.subStatList
            .filter(x => x.name != this.mainStat.name)
            .sample(this.subStatCount.choice())
            .forEach(x => {
            this.subStats.push(x.instance());
        });
    }
    rollUpgrade() {
        if (this.upgradeCount >= 5)
            return;
        this.mainStat.rollUpgrade();
        if (this.subStats.length < Math.max(...this.subStatCount.objList)) {
            let names = [this.mainStat.name];
            this.subStats.forEach(x => names.push(x.name));
            this.subStats.push(this.subStatList
                .filter(x => !(names.includes(x.name)))
                .choice()
                .instance());
        }
        else {
            let l = lodash.random(0, this.subStats.length - 1);
            this.subStats[l].rollUpgrade();
        }
        this.upgradeCount += 1;
    }
    generateText(score) {
        if (!this.artifactSet)
            return null;
        if (!(this.name in this.artifactSet.pieceData))
            return null;
    }
    async generateImage(score) {
        if (!this.artifactSet)
            return null;
        if (!(this.name in this.artifactSet.pieceData))
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
export class Genshin_ArtifactSet extends base.ArtifactSet {
}
;
export class Genshin_ArtifactDomain extends base.ArtifactDomain {
}
;
;
;
