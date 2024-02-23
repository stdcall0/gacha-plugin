// Genshin Artifact Generation
import plugin from '../../../lib/plugins/plugin.js';
import common from '../../../lib/common/common.js';
import { DisplayModes } from '../model/utils.js';
import { Genshin_ArtifactScorer as scorer } from '../resources/genshin_artifact_data.js';
import { Genshin_ArtifactDomains } from '../resources/genshin_artifact_data.js';
import { Genshin_ArtifactDomainsAlt } from '../resources/genshin_artifact_data.js';
let throttle = false;
let lastArtifact = {};
export class Genshin_ArtifactPlugin extends plugin {
    constructor() {
        super({
            name: '刷原神圣遗物',
            dsc: '刷原神圣遗物 (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^#*刷圣遗物.*$', // 刷圣遗物绝缘20
                    fnc: 'generateArtifact'
                },
                {
                    reg: '^#*(合成|合)圣遗物.*$', // 合成圣遗物绝缘20
                    fnc: 'generateArtifactAlt'
                },
                {
                    reg: '^#*(强化|升)圣遗物(4|8|12|16|20)?$',
                    fnc: 'upgradeArtifact'
                }
            ]
        });
    }
    async generateArtifact() {
        let inst = this.e.msg;
        inst = inst.replace("刷圣遗物", "").replace("#", "").replace("次", "").trim();
        let s_domain = "";
        let s_time = "";
        for (let i = 0; i < inst.length; ++i) {
            if ("0" <= inst[i] && inst[i] <= "9")
                s_time = s_time + inst[i];
            else
                s_domain = s_domain + inst[i];
        }
        let times = parseInt(s_time);
        let domain = null;
        Genshin_ArtifactDomains.forEach(x => {
            if (x.check(s_domain))
                domain = x;
        });
        if (domain == null)
            return;
        await this.makeArtifact(times, domain);
    }
    async generateArtifactAlt() {
        let inst = this.e.msg;
        inst = inst.replace("合圣遗物", "").replace("合成圣遗物", "")
            .replace("#", "").replace("次", "").trim();
        let s_domain = "";
        let s_time = "";
        for (let i = 0; i < inst.length; ++i) {
            if ("0" <= inst[i] && inst[i] <= "9")
                s_time = s_time + inst[i];
            else
                s_domain = s_domain + inst[i];
        }
        let times = parseInt(s_time);
        let domain = null;
        Genshin_ArtifactDomainsAlt.forEach(x => {
            if (x.check(s_domain))
                domain = x;
        });
        if (domain == null)
            return;
        await this.makeArtifact(times, domain);
    }
    async makeArtifact(times, domain) {
        if (throttle)
            return;
        throttle = true;
        if (times !== times || times <= 1) {
            let artifactPiece = domain.rollPiece();
            lastArtifact[this.e.user_id] = artifactPiece;
            const msg = await artifactPiece.generateImage(scorer(artifactPiece));
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }
        else if (times <= 20) {
            let imgs = [];
            let pieces = domain.rollPieceMulti(times);
            pieces.sort((a, b) => scorer(b) - scorer(a));
            for (const artifactPiece of pieces)
                imgs.push(await artifactPiece.generateImage(scorer(artifactPiece)));
            lastArtifact[this.e.user_id] = pieces;
            let scores = [];
            pieces.forEach(x => scores.push(scorer(x)));
            let max = DisplayModes.Float1D(Math.max(...scores));
            let avg = DisplayModes.Float1D(scores.reduce((a, b) => a + b, 0) / scores.length);
            const msg = await common.makeForwardMsg(this.e, imgs, `点击查看圣遗物\n最高分: ${max}; 平均分: ${avg}`);
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }
        throttle = false;
    }
    upgradeTimes(artifactPiece, times) {
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
        if (throttle)
            return;
        if (!(this.e.user_id in lastArtifact))
            return;
        throttle = true;
        let each = this.e.msg;
        let times = parseInt(each.replace("强化圣遗物", "").replace("升圣遗物", "")
            .replace("#", "").trim());
        if (times !== times || !([4, 8, 12, 16, 20].includes(times)))
            times = 0;
        let pieces = lastArtifact[this.e.user_id];
        if (!Array.isArray(pieces)) {
            let artifactPiece = pieces;
            this.upgradeTimes(artifactPiece, times);
            lastArtifact[this.e.user_id] = artifactPiece;
            const msg = await artifactPiece.generateImage(scorer(artifactPiece));
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }
        else {
            let imgs = [];
            for (let artifactPiece of pieces) {
                this.upgradeTimes(artifactPiece, times);
            }
            pieces.sort((a, b) => scorer(b) - scorer(a));
            for (let artifactPiece of pieces) {
                imgs.push(await artifactPiece.generateImage(scorer(artifactPiece)));
            }
            lastArtifact[this.e.user_id] = pieces;
            let scores = [];
            pieces.forEach(x => scores.push(scorer(x)));
            let max = DisplayModes.Float1D(Math.max(...scores));
            let avg = DisplayModes.Float1D(scores.reduce((a, b) => a + b, 0) / scores.length);
            const msg = await common.makeForwardMsg(this.e, imgs, `点击查看强化结果\n最高分: ${max}; 平均分: ${avg}`);
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }
        throttle = false;
    }
}
;
