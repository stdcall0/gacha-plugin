// StarRail Relic Generation
import { Plugin, Common, StrReplace } from '#gc';
import { StarRailData as data } from '#gc.res';
let throttle = false;
let lastRelic = {};
export class SRPlugin extends Plugin {
    constructor() {
        super({
            name: '刷星铁遗器',
            dsc: '刷星铁遗器 (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^(刷遗器|#星铁刷).*$', // 刷遗器量子20
                    fnc: 'generateRelic'
                },
                {
                    reg: '^(#*(强化|升)遗器|#星铁(强化|升)(遗器)?)(3|6|9|12|15)?$',
                    fnc: 'upgradeRelic'
                }
            ]
        });
    }
    async generateRelic() {
        let inst = this.e.msg;
        inst = StrReplace(inst, ["刷", "遗器", "#", "星铁", "次"]);
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
        data.Domains.forEach(x => {
            if (x.is(s_domain))
                domain = x;
        });
        if (domain == null)
            return;
        await this.makeRelic(times, domain);
    }
    async makeRelic(times, domain) {
        if (throttle)
            return;
        throttle = true;
        if (times !== times || times <= 1) {
            let piece = domain.rollPiece();
            lastRelic[this.e.user_id] = piece;
            const img = await piece.generateImage();
            await this.reply(img, false, { at: false, recallMsg: 0 });
        }
        else if (times <= 20) {
            let imgs = [];
            let pieces = domain.rollPieceMulti(times);
            pieces.sort((a, b) => b.score - a.score);
            for (const piece of pieces)
                imgs.push(await piece.generateImage());
            lastRelic[this.e.user_id] = pieces;
            const msg = await Common.makeForwardMsg(this.e, imgs, `点击查看遗器`);
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
    async upgradeRelic() {
        if (throttle)
            return;
        if (!(this.e.user_id in lastRelic))
            return;
        throttle = true;
        let each = this.e.msg;
        each = StrReplace(each, ["强化", "升", "遗器", "#", "星铁"]);
        let times = parseInt(each);
        if (times !== times || !([3, 6, 9, 12, 15].includes(times)))
            times = 15;
        let pieces = lastRelic[this.e.user_id];
        if (!Array.isArray(pieces)) {
            let piece = pieces;
            this.upgradeTimes(piece, times);
            lastRelic[this.e.user_id] = piece;
            const img = await piece.generateImage();
            await this.reply(img, false, { at: false, recallMsg: 0 });
        }
        else {
            let imgs = [];
            for (let piece of pieces) {
                this.upgradeTimes(piece, times);
            }
            pieces.sort((a, b) => b.score - a.score);
            for (let piece of pieces) {
                imgs.push(await piece.generateImage());
            }
            lastRelic[this.e.user_id] = pieces;
            const msg = await Common.makeForwardMsg(this.e, imgs, `点击查看强化结果`);
            await this.reply(msg, false, { at: false, recallMsg: 0 });
        }
        throttle = false;
    }
}
;
