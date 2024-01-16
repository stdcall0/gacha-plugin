import lodash from 'lodash';
import * as base from './base_artifact.js';
import Lottery from './lottery.js';

export class GenshinArtifactPiece extends base.ArtifactPiece {
    upgradeCount: number;

    constructor(
        name: string,
        displayName: string,
        mainStatList: Lottery<base.ArtifactStat>,
        subStatList: Lottery<base.ArtifactStat>,
        subStatCount: Lottery<number>
    ) {
        super(name, displayName, mainStatList, subStatList, subStatCount);
        this.upgradeCount = 0;
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
            this.subStats.push(
                this.subStatList
                    .filter(x => !(x.name in names))
                    .choice()
                    .instance()
            );
        } else {
            let l = lodash.random(0, this.subStats.length - 1);
            this.subStats[l].rollUpgrade();
        }
        this.upgradeCount += 1;
    }
};
