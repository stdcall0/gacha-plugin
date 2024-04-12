import { Plugin, Lottery } from '#gc';
import { StarRail } from "#gc.model";
const fiveStarUp = new Lottery([new StarRail.FiveStarItem("Acheron", "黄泉", "")]);
const fourStarUp = new Lottery([
    new StarRail.FourStarItem("41", "王俊超A", ""),
    new StarRail.FourStarItem("42", "王俊超B", ""),
    new StarRail.FourStarItem("43", "王俊超C", ""),
]);
const fiveStarNorm = new Lottery([
    new StarRail.FiveStarItem("Welt", "瓦尔特", ""),
    new StarRail.FiveStarItem("Himeko", "姬子", ""),
    new StarRail.FiveStarItem("Bronya", "布洛妮娅", ""),
    new StarRail.FiveStarItem("Gepard", "杰帕德", ""),
    new StarRail.FiveStarItem("Clara", "克拉拉", ""),
    new StarRail.FiveStarItem("Yanqing", "彦卿", ""),
    new StarRail.FiveStarItem("Bailu", "白露", ""),
]);
let pool = new StarRail.GachaPool(fiveStarUp, fiveStarNorm, fourStarUp, new Lottery([new StarRail.ThreeStarItem("垃圾", "垃圾", "")]));
let last5 = {};
let last4 = {};
let upg = {};
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
    getGachaState(key) {
        // get last5 and last4 from global variable
        // default 0 if not exist
        let l5 = last5[key] || 0;
        let l4 = last4[key] || 0;
        let up = upg[key] || false;
        return new StarRail.GachaState(pool, l4, l5, up);
    }
    saveGachaState(key, state) {
        // save last5 and last4 to global variable
        last5[key] = state.lastFive;
        last4[key] = state.lastFour;
        upg[key] = state.upGuaranteed;
    }
    item(i) {
        if (i.star == 5)
            return `[[${i.displayName}]]`;
        if (i.star == 4)
            return `[${i.displayName}]`;
        return i.displayName;
    }
    async n(n, state, summary) {
        let res = state.nextMulti(n);
        // print 10 results per line
        let msg = [];
        let resStr = "";
        for (let i = 0; i < res.length; ++i) {
            resStr += this.item(res[i]) + " ";
            if (i % 10 == 9) {
                msg.push(resStr);
                resStr = "";
            }
        }
        if (resStr.length > 0)
            msg.push(resStr);
        if (summary) {
            msg.push("");
            let summary = "5*: ";
            // show 5* with format name xcount
            let five = res.filter(x => x.star == 5);
            let fiveMap = new Map();
            five.forEach(x => {
                let name = x.displayName;
                let count = fiveMap.get(name) || 0;
                fiveMap.set(name, count + 1);
            });
            fiveMap.forEach((v, k) => {
                summary += `[${k}]x${v} `;
            });
            msg.push(summary);
        }
        msg.push(`目前已垫 ${state.lastFive} 抽`);
        await this.reply(msg, true, { at: false, recallMsg: 0 });
        return state;
    }
    async single() {
        const key = this.e.user_id;
        let state = this.getGachaState(key);
        state = await this.n(1, state, false);
        this.saveGachaState(key, state);
    }
    async ten() {
        const key = this.e.user_id;
        let state = this.getGachaState(key);
        state = await this.n(10, state, false);
        this.saveGachaState(key, state);
    }
    async hundred() {
        const key = this.e.user_id;
        let state = this.getGachaState(key);
        state = await this.n(100, state, true);
        this.saveGachaState(key, state);
    }
}
;
