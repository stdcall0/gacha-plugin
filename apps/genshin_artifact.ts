// Genshin Artifact Generation

import plugin from '../../../lib/plugins/plugin.js';
import puppeteer from '../../../lib/puppeteer/puppeteer.js';
import common from '../../../lib/common/common.js';

import { ArtifactPiece } from '../model/base_artifact.js';
import { GenshinArtifactSets, GenshinArtifactScorers } from '../resources/genshin_artifact_data.js';
import { GenshinArtifactPiece } from '../model/genshin_artifact.js';

let throttle: boolean = false;
let lastArtifact: { [key: string]: ArtifactPiece | ArtifactPiece[] } = {};

const scorer = GenshinArtifactScorers[0];

export class GenshinArtifactPlugin extends plugin {
    constructor() {
        super({
            name: '刷原神圣遗物',
            dsc: '刷原神圣遗物 (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^#*刷圣遗物.*$',
                    fnc: 'generateArtifact'
                },
                {
                    reg: '^#*强化圣遗物(4|8|16|20)?$',
                    fnc: 'upgradeArtifact'
                }
            ]
        });
    }

    async generateArtifact() {
        if (throttle) return;
        throttle = true;

        let each: string = this.e.msg;
        let times = parseInt(each.replace("刷圣遗物", "").replace("#", "").replace("次", "").trim());
        
        if (times !== times || times <= 1) {
            const artifactSet = GenshinArtifactSets.EmblemOfSeveredFate; // consider adding set reference to piece

            let artifactPiece = artifactSet.rollPiece() as GenshinArtifactPiece; // NEED TO RESTRUCT the class to avoid explict conversion
    
            lastArtifact[this.e.user_id] = artifactPiece;
    
            const msg = await artifactPiece.generateImage(artifactPiece.getScore(scorer));
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        } else if (times <= 20) {
            const artifactSet = GenshinArtifactSets.EmblemOfSeveredFate; // consider adding set reference to piece
    
            let imgs = [];
            let pieces = artifactSet.rollPieceMulti(times) as GenshinArtifactPiece[];

            pieces.sort((a, b) => b.getScore(scorer) - a.getScore(scorer));
            for (const artifactPiece of pieces)
                imgs.push(await artifactPiece.generateImage(artifactPiece.getScore(scorer)));
            lastArtifact[this.e.user_id] = pieces;

            const msg = await common.makeForwardMsg(this.e, imgs, '点我查看圣遗物');
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }

        throttle = false;
    }

    private upgradeTimes(artifactPiece: ArtifactPiece, times: number) {
        if (times == 0) {
            artifactPiece.rollUpgrade();
            return;
        }

        let count = 0;
        while (count <= 5 && artifactPiece.level < times) {
            artifactPiece.rollUpgrade();
            ++count;
        }
    }

    async upgradeArtifact() {
        if (throttle) return;
        if (!(this.e.user_id in lastArtifact)) return;
        throttle = true;

        let each: string = this.e.msg;
        let times = parseInt(each.replace("强化圣遗物", "").replace("#", "").trim());

        if (times !== times || !([4, 8, 16, 20].includes(times))) times = 0;

        let pieces = lastArtifact[this.e.user_id] as (GenshinArtifactPiece | GenshinArtifactPiece[]);
        if (!Array.isArray(pieces)) {
            let artifactPiece = pieces;

            this.upgradeTimes(artifactPiece, times);
            lastArtifact[this.e.user_id] = artifactPiece;
            
            const msg = await artifactPiece.generateImage(artifactPiece.getScore(scorer));
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        } else {
            let imgs = [];
            for (let artifactPiece of pieces) {
                this.upgradeTimes(artifactPiece, times);
            }

            pieces.sort((a, b) => b.getScore(scorer) - a.getScore(scorer));
            for (let artifactPiece of pieces) {
                imgs.push(await artifactPiece.generateImage(artifactPiece.getScore(scorer)));
            }
            lastArtifact[this.e.user_id] = pieces;

            const msg = await common.makeForwardMsg(this.e, imgs, '点我查看强化结果');
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }

        throttle = false;
    }
};
