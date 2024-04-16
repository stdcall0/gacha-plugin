import { Plugin, Common } from '#gc';

import { StarRail } from '#gc.model';
import { StarRailData } from '#gc.res';

interface RankData {
    name: string;
    star5: number;
    up: number;
    total: number;
};
interface NResult {
    gacha: StarRail.Gacha;
    star5: number;
    up: number;
    total: number;
}
let rank: { [ key: string]: RankData } = {};
let state: { [key: string]: StarRail.GachaState } = {};

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
                },
                {
                    reg: '^#星铁抽卡排名.*$',
                    fnc: 'showrank'
                }
            ]
        });
    }

    private getGacha(key: string): StarRail.Gacha {
        const s = state[key] || StarRail.defaultGachaState;
        return new StarRail.Gacha(s);
    }
    private saveGacha(key: string, gacha: StarRail.Gacha) {
        state[key] = gacha.state();
    }

    item(x: StarRail.GachaItem): string {
        if (x.star > 3) return `${x.star}* ${x.displayName}`;
        return x.displayName;
    }

    lastFive(lastRes: StarRail.GachaResult): number {
        if (lastRes.item.star == 5) return 0;
        return lastRes.count5;
    }

    async n(n: number, gacha: StarRail.Gacha, summary: boolean): Promise<NResult> {
        let res = gacha.nextMulti(StarRailData.Pool, n);

        // print 10 results per line
        let msg: string[] = [" 详情: "];
        let resStr = "";

        let cnt5 = 0;

        let s5: StarRail.GachaResult[] = [], s4: StarRail.GachaResult[] = [];

        for (let i = 0; i < res.length; ++i) {
            resStr += this.item(res[i].item) + ", ";
            if (i % 10 == 9) {
                msg.push(`${cnt5}~${res[i].count5}: ${resStr}`);
                resStr = "";
            }
            if (i % 10 == 0) {
                cnt5 = res[i].count5;
            }

            if (res[i].item.star == 5) s5.push(res[i]);
            if (res[i].item.star == 4) s4.push(res[i]);
        }

        if (resStr.length > 0)
            msg.push(`${cnt5}~${res[res.length - 1].count5}: ${resStr}`);

        if (summary) {
            msg.push(""); msg.push("统计: ");

            if (s4.length > 0) {
                msg.push("4*: ");
                let st = "- ";
                s4.forEach(x => {
                    st += `${x.item.displayName} (${x.count}), `;
                });
                msg.push(st.substring(0, st.length - 2));
                msg.push("");
            }

            if (s5.length > 0) {
                msg.push("5*: ");
                s5.forEach(x => {
                    msg.push(`- ${x.item.displayName} (${x.count5}${x.isGuaranteed ? " 大保底" : ""})`);
                });
                msg.push("");
            }
            msg.push(`共 ${s5.length} 个 5*，${s4.length} 个 4*，已垫 ${this.lastFive(res[res.length - 1])} 抽`);
        }
        
        await this.reply(msg.join('\n'), true);
        return {
            gacha,
            star5: s5.length,
            up: s5.filter(x => x.item.up).length,
            total: n
        };
    }

    initRank(key: string, name: string) {
        if (!rank[key])
            rank[key] = { name: name, star5: 0, up: 0, total: 0 };
        else
            rank[key].name = name;
    }
    updateRank(key: string, res: NResult) {
        rank[key].star5 += res.star5;
        rank[key].up += res.up;
        rank[key].total += res.total;
    }

    async single() {
        const key = this.e.user_id;
        this.initRank(key, this.e.sender.nickname);
        let gacha = this.getGacha(key);
        let res = await this.n(1, gacha, false);
        this.saveGacha(key, res.gacha);
        this.updateRank(key, res);
    }

    async ten() {
        const key = this.e.user_id;
        this.initRank(key, this.e.sender.nickname);
        let gacha = this.getGacha(key);
        let res = await this.n(10, gacha, true);
        this.saveGacha(key, gacha);
        this.updateRank(key, res);
    }

    async hundred() {
        const key = this.e.user_id;
        this.initRank(key, this.e.sender.nickname);
        let gacha = this.getGacha(key);
        let res = await this.n(100, gacha, true);
        this.saveGacha(key, gacha);
        this.updateRank(key, res);
    }

    getUpPercentage(rankData: RankData): number {
        if (rankData.star5 == 0) return 0;
        return rankData.up / rankData.star5;
    }

    getAverageUpCount(rankData: RankData): number {
        if (rankData.star5 == 0) return 180;
        return rankData.total / rankData.star5;
    }

    async showrank() {
        let msg = [" 抽卡统计: "];
        this.initRank(this.e.user_id, this.e.sender.nickname);
        const me = rank[this.e.user_id];
        msg.push(`- ${me.name}: 共 ${me.total} 抽，${me.star5} 个 5* (${me.up} 个 UP)`);

        msg.push(""); msg.push("排行榜 (小保底不歪): ");
        let top1 = Object.values(rank)
            .filter(r => r.star5 > 0).sort((a, b) => this.getUpPercentage(b) - this.getUpPercentage(a));
        let top2 = Object.values(rank)
            .filter(r => r.star5 > 0).sort((a, b) => this.getAverageUpCount(a) - this.getAverageUpCount(b));
        
        // show top 5
        for (let i = 0; i < 5; ++i) {
            if (i < top1.length) {
                let r = top1[i];
                msg.push(`- ${r.name}: ${r.star5} 个 5*，${r.up} 个 UP，小保底不歪 ${(this.getUpPercentage(r)*100).toFixed(2)}%`);
            }
        }
        // show top2 5
        msg.push(""); msg.push("排行榜 (平均 5* 抽数): ");
        for (let i = 0; i < 5; ++i) {
            if (i < top2.length) {
                let r = top2[i];
                msg.push(`- ${r.name}: 共 ${r.total} 抽，${r.star5} 个 5*，平均 ${this.getAverageUpCount(r).toFixed(2)} 抽`);
            }
        }
        // reply msg
        await this.reply(msg.join('\n'), true);
    }
};
