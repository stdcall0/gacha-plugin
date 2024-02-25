// Genshin Artifact Generation

import { Plugin, Common, DisplayModes, StrReplace } from '#gc';

import { Genshin as gs } from '#gc.model';
import { GenshinData as data } from '#gc.res';

const scorer = data.Scorer;

let throttle: boolean = false;
let lastArtifact: { [key: string]: gs.Piece | gs.Piece[] } = {};

export class GSPlugin extends Plugin {
    constructor() {
        super({
            name: '刷原神圣遗物',
            dsc: '刷原神圣遗物 (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^(刷圣遗物|#刷).*$',  // 刷圣遗物绝缘20
                    fnc: 'generateArtifact'
                },
                {
                    reg: '^((合成|合)圣遗物|#(合成|合)).*$',  // 合成圣遗物绝缘20
                    fnc: 'generateArtifactAlt'
                },
                {
                    reg: '^((强化|升)圣遗物|#(强化|升))(4|8|12|16|20)?$',
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

    async generateArtifactM(domains: gs.Domain[]) {
        let inst: string = this.e.msg;
        inst = StrReplace(inst, ["刷", "合成", "合", "圣遗物", "#", "次"]);

        let s_domain = "";
        let s_time = "";

        for (let i = 0; i < inst.length; ++i) {
            if ("0" <= inst[i] && inst[i] <= "9")
                s_time = s_time + inst[i];
            else
                s_domain = s_domain + inst[i];
        }
        let times = parseInt(s_time);
        let domain: gs.Domain = null;

        domains.forEach(x => {
            if (x.is(s_domain))
                domain = x;
        });

        if (domain == null) return;

        await this.makeArtifact(times, domain);
    }

    async makeArtifact(times: number, domain: gs.Domain) {
        if (throttle) return;
        throttle = true;

        if (times !== times || times <= 1) {
            let piece = domain.rollPiece();

            lastArtifact[this.e.user_id] = piece;
    
            const msg = await piece.generateImage(scorer(piece));
            await this.reply(msg, false, { at: false, recallMsg: 0 });

        } else if (times <= 20) {
            let imgs = [];
            let pieces = domain.rollPieceMulti(times);

            pieces.sort((a, b) => scorer(b) - scorer(a));
            for (const piece of pieces)
                imgs.push(await piece.generateImage(scorer(piece)));

            lastArtifact[this.e.user_id] = pieces;

            let scores: number[] = [];
            pieces.forEach(x => scores.push(scorer(x)));

            let max = DisplayModes.Float1D(Math.max(...scores));
            let avg = DisplayModes.Float1D(scores.reduce((a, b) => a+b, 0) / scores.length);

            const msg = await Common.makeForwardMsg(this.e, imgs, `点击查看圣遗物\n最高分: ${max}; 平均分: ${avg}`);
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }

        throttle = false;
    }

    private upgradeTimes(piece: gs.Piece, times: number) {
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
        if (throttle) return;
        if (!(this.e.user_id in lastArtifact)) return;
        throttle = true;

        let each: string = this.e.msg;
        each = StrReplace(each, ["强化", "升", "圣遗物", "#"]);
        let times = parseInt(each);

        if (times !== times || !([4, 8, 12, 16, 20].includes(times))) times = 20;

        let pieces = lastArtifact[this.e.user_id];
        if (!Array.isArray(pieces)) {
            let piece = pieces;

            this.upgradeTimes(piece, times);
            lastArtifact[this.e.user_id] = piece;
            
            const msg = await piece.generateImage(scorer(piece));
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        } else {
            let imgs = [];
            for (let piece of pieces) {
                this.upgradeTimes(piece, times);
            }

            pieces.sort((a, b) => scorer(b) - scorer(a));
            for (let piece of pieces) {
                imgs.push(await piece.generateImage(scorer(piece)));
            }
            lastArtifact[this.e.user_id] = pieces;

            let scores: number[] = [];
            pieces.forEach(x => scores.push(scorer(x)));

            let max = DisplayModes.Float1D(Math.max(...scores));
            let avg = DisplayModes.Float1D(scores.reduce((a, b) => a+b, 0) / scores.length);

            const msg = await Common.makeForwardMsg(this.e, imgs, `点击查看强化结果\n最高分: ${max}; 平均分: ${avg}`);
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }

        throttle = false;
    }
};
