import lodash from 'lodash';
import { Path } from "#gc";
export class Piece {
    constructor(name, displayName, mainStatList, subStatList, subStatCount) {
        this.name = name;
        this.displayName = displayName;
        this.mainStatList = mainStatList;
        this.subStatList = subStatList;
        this.subStatCount = subStatCount;
        this.mainStat = null;
        this.subStats = [];
        this.upgradeCount = 0;
    }
    get imagePath() {
        if (!(this.pieceData))
            return null;
        return Path.Image + "/" + this.pieceData.image;
    }
    get pieceData() {
        if (this.parentSet && this.name in this.parentSet.pieceData)
            return this.parentSet.pieceData[this.name];
        return null;
    }
    rollMainStat() {
        this.mainStat = this.mainStatList.choice().instance();
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
    instance(set) {
        let piece = Object.create(this);
        piece.parentSet = set;
        piece.rollMainStat();
        piece.rollSubStats();
        return piece;
    }
}
;
