// Genshin Artifact Generation

import plugin from '../../../lib/plugins/plugin.js';
import puppeteer from '../../../lib/puppeteer/puppeteer.js';
import common from '../../../lib/common/common.js';

import { ArtifactPiece } from '../model/base_artifact.js';
import { GenshinArtifactSets } from '../resources/genshin_artifact_data.js';

let throttle: boolean = false;
let lastArtifact: { [key: string]: ArtifactPiece } = {};

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

        const artifactSet = GenshinArtifactSets.EmblemOfSeveredFate; // consider adding set reference to piece

        let artifactPiece = artifactSet.rollPiece();

        lastArtifact[this.e.user_id] = artifactPiece;

        let msg = await artifactPiece.generateImage();
        await this.reply(msg, false, { at: false, recallMsg: 0 });

        throttle = false;
    }

    async upgradeArtifact() {
        if (throttle) return;
        if (!(this.e.user_id in lastArtifact)) return;
        throttle = true;

        const artifactSet = GenshinArtifactSets.EmblemOfSeveredFate;

        let artifactPiece = lastArtifact[this.e.user_id];
        artifactPiece.rollUpgrade();

        lastArtifact[this.e.user_id] = artifactPiece;
        
        let msg = await artifactPiece.generateImage();
        await this.reply(msg, false, { at: false, recallMsg: 0 });

        throttle = false;
    }
};
