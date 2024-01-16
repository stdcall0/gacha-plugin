import lodash from 'lodash';
import puppeteer from '../../../lib/puppeteer/puppeteer.js';
import * as cpath from '../resources/cpath.js';
import * as base from './base_artifact.js';
export class GenshinArtifactPiece extends base.ArtifactPiece {
    constructor(name, displayName, mainStatList, subStatList, subStatCount) {
        super(name, displayName, mainStatList, subStatList, subStatCount);
        this.upgradeCount = 0;
    }
    get imagePath() {
        if (!(this.artifactSet))
            return null;
        if (!(this.name in this.artifactSet.pieceData))
            return null;
        return cpath.ImagePath + this.artifactSet.pieceData[this.name].image;
    }
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
    async generateImage() {
        if (!this.artifactSet)
            return null;
        if (!(this.name in this.artifactSet.pieceData))
            return null;
        const data = {
            tplFile: cpath.HTMLPath + 'genshin_artifact.html',
            pluResPath: cpath.ProcessPath,
            artifactPiece: this,
            locked: false
        };
        return puppeteer.screenshot("genshin_artifact", data);
    }
}
;
;
export class GenshinArtifactSet extends base.ArtifactSet {
    constructor(name, displayName, aliases, pieceList, pieceData) {
        super(name, displayName, aliases, pieceList, pieceData);
        this.pieceData = pieceData;
    }
}
;
