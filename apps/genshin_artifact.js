// Genshin Artifact Generation
import plugin from '../../../lib/plugins/plugin.js';
import common from '../../../lib/common/common.js';
import { DisplayModes } from '../model/utils.js';
import * as data from '../resources/genshin_artifact_data.js';
const scorer = data.Scorer;
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
        await this.generateArtifactM(data.Domains);
    }
    async generateArtifactAlt() {
        await this.generateArtifactM(data.DomainsAlt);
    }
    async generateArtifactM(domains) {
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
        domains.forEach(x => {
            if (x.is(s_domain))
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
            let piece = domain.rollPiece();
            lastArtifact[this.e.user_id] = piece;
            const msg = await piece.generateImage(scorer(piece));
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }
        else if (times <= 20) {
            let imgs = [];
            let pieces = domain.rollPieceMulti(times);
            pieces.sort((a, b) => scorer(b) - scorer(a));
            for (const piece of pieces)
                imgs.push(await piece.generateImage(scorer(piece)));
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
    upgradeTimes(piece, times) {
        if (times == 0) {
            piece.rollUpgrade();
            return;
        }
        let count = 0;
        while (count <= 5 && piece.level < times) {
            piece.rollUpgrade();
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
            let piece = pieces;
            this.upgradeTimes(piece, times);
            lastArtifact[this.e.user_id] = piece;
            const msg = await piece.generateImage(scorer(piece));
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }
        else {
            let imgs = [];
            for (let piece of pieces) {
                this.upgradeTimes(piece, times);
            }
            pieces.sort((a, b) => scorer(b) - scorer(a));
            for (let piece of pieces) {
                imgs.push(await piece.generateImage(scorer(piece)));
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
