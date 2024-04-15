import { Plugin } from '#gc';
import { StarRail } from '#gc.model';
import { StarRailData } from '#gc.res';
let state = {};
export class SRGachaPlugin extends Plugin {
    constructor() {
        super({
            name: 'SRGachaPlugin',
            dsc: ' Star Rail Gacha Simulation (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^#星铁十连.*$',
                    fnc: 'ten'
                },
                {
                    reg: '^#星铁百连.*$',
                    fnc: 'hundred'
                },
                {
                    reg: '^#星铁单抽.*$',
                    fnc: 'single'
                }
            ]
        });
    }
    getGacha(key) {
        const s = state[key] || StarRail.defaultGachaState;
        return new StarRail.Gacha(s);
    }
    saveGacha(key, gacha) {
        state[key] = gacha.state();
    }
    item(x) {
        if (x.star > 3)
            return `${x.star}* ${x.displayName}`;
        return x.displayName;
    }
    async n(n, gacha, summary) {
        let res = gacha.nextMulti(StarRailData.Pool, n);
        // print 10 results per line
        let msg = [" 详情: "];
        let resStr = "";
        let cnt5 = 0;
        let s5 = [], s4 = [];
        for (let i = 0; i < res.length; ++i) {
            resStr += this.item(res[i].item) + ", ";
            if (i % 10 == 9) {
                msg.push(`${cnt5}~${res[i].count5}: ${resStr}`);
                resStr = "";
            }
            if (i % 10 == 0) {
                cnt5 = res[i].count5;
            }
            if (res[i].item.star == 5)
                s5.push(res[i]);
            if (res[i].item.star == 4)
                s4.push(res[i]);
        }
        if (resStr.length > 0)
            msg.push(`${cnt5}~${res[res.length - 1].count5}: ${resStr}`);
        if (summary) {
            msg.push("");
            msg.push("统计: ");
            if (s5.length > 0) {
                msg.push("5*: ");
                s5.forEach(x => {
                    msg.push(`- ${x.item.displayName} (${x.count5}${x.isGuaranteed ? " 大保底" : ""})`);
                });
                msg.push("");
            }
            msg.push(`共 ${s5.length} 个 5*，${s4.length} 个 4*`);
        }
        await this.reply(msg.join('\n'), true, { at: true, recallMsg: 0 });
        return gacha;
    }
    async single() {
        const key = this.e.user_id;
        let gacha = this.getGacha(key);
        gacha = await this.n(1, gacha, false);
        this.saveGacha(key, gacha);
    }
    async ten() {
        const key = this.e.user_id;
        let gacha = this.getGacha(key);
        gacha = await this.n(10, gacha, true);
        this.saveGacha(key, gacha);
    }
    async hundred() {
        const key = this.e.user_id;
        let gacha = this.getGacha(key);
        gacha = await this.n(100, gacha, true);
        this.saveGacha(key, gacha);
    }
}
;
