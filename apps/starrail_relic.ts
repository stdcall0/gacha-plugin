// StarRail Relic Generation

import plugin from '../../../lib/plugins/plugin.js';
import puppeteer from '../../../lib/puppeteer/puppeteer.js';
import common from '../../../lib/common/common.js';

import { StarRail_RelicPiece, StarRail_RelicDomain } from '../model/starrail_relic.js';
import { StarRail_RelicDomains } from '../resources/starrail_relic_data.js';

let throttle: boolean = false;

type RelicStorage = StarRail_RelicPiece | StarRail_RelicPiece[];
let lastRelic: { [key: string]: RelicStorage } = {};

export class StarRail_RelicPlugin extends plugin {
    constructor() {
        super({
            name: '刷星铁遗器',
            dsc: '刷星铁遗器 (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^\\**刷遗器.*$',  // 刷遗器量子20
                    fnc: 'generateRelic'
                },
                {
                    reg: '^\\**(强化|升)遗器(4|8|16|20)?$',
                    fnc: 'upgradeRelic'
                }
            ]
        });
    }

    async generateRelic() {
        let inst: string = this.e.msg;
        inst = inst.replace("刷遗器", "").replace("*", "").replace("次", "").trim();

        let s_domain = "";
        let s_time = "";

        for (let i = 0; i < inst.length; ++i) {
            if ("0" <= inst[i] && inst[i] <= "9")
                s_time = s_time + inst[i];
            else
                s_domain = s_domain + inst[i];
        }
        let times = parseInt(s_time);
        let domain: StarRail_RelicDomain = null;

        StarRail_RelicDomains.forEach(x => {
            if (x.check(s_domain))
                domain = x;
        });

        if (domain == null) return;

        await this.makeRelic(times, domain);
    }

    async makeRelic(times: number, domain: StarRail_RelicDomain) {
        if (throttle) return;
        throttle = true;

        if (times !== times || times <= 1) {
            let relicPiece = domain.rollPiece();

            lastRelic[this.e.user_id] = relicPiece;
    
            const msg = await relicPiece.generateText(0);
            await this.reply(msg, false, { at: false, recallMsg: 0 });

        } else if (times <= 20) {
            let msgs = [];
            let pieces = domain.rollPieceMulti(times);

            for (const relicPiece of pieces)
                msgs.push(await relicPiece.generateText(0));

            lastRelic[this.e.user_id] = pieces;

            const msg = await common.makeForwardMsg(this.e, msgs, `点击查看遗器`);
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }

        throttle = false;
    }

    private upgradeTimes(relicPiece: StarRail_RelicPiece, times: number) {
        if (times == 0) {
            relicPiece.rollUpgrade();
            return;
        }

        let count = 0;
        while (count <= 5 && relicPiece.level < times) {
            relicPiece.rollUpgrade();
            ++count;
        }
    }

    async upgradeRelic() {
        if (throttle) return;
        if (!(this.e.user_id in lastRelic)) return;
        throttle = true;

        let each: string = this.e.msg;
        let times = parseInt(each.replace("强化遗器", "").replace("升遗器", "")
            .replace("#", "").trim());

        if (times !== times || !([4, 8, 16, 20].includes(times))) times = 4;

        let pieces = lastRelic[this.e.user_id];
        if (!Array.isArray(pieces)) {
            let relicPiece = pieces;

            this.upgradeTimes(relicPiece, times);
            lastRelic[this.e.user_id] = relicPiece;
            
            const msg = await relicPiece.generateText(0);
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        } else {
            let msgs = [];
            for (let relicPiece of pieces) {
                this.upgradeTimes(relicPiece, times);
            }

            for (let relicPiece of pieces) {
                msgs.push(await relicPiece.generateText(0));
            }
            lastRelic[this.e.user_id] = pieces;

            const msg = await common.makeForwardMsg(this.e, msgs, `点击查看强化结果`);
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }

        throttle = false;
    }
};
