import { Plugin, Common, Lottery } from '#gc';
import lodash from 'lodash';
import { CSData } from '#gc.res';
import { CS } from '#gc.model';
const STLot = new Lottery([CS.StatTrak.StatTrak, CS.StatTrak.Normal], [0.1, 0.9]);
const FloatLot = new Lottery([
    function fn() {
        // random value 0.00-0.07 
        return lodash.random(0.00, 0.07, true);
    },
    function mw() {
        // 0.07-0.15
        return lodash.random(0.07, 0.15, true);
    },
    function ft() {
        // 0.15-0.38
        return lodash.random(0.15, 0.38, true);
    },
    function ww() {
        // 0.38-0.45
        return lodash.random(0.38, 0.45, true);
    },
    function bs() {
        // 0.45-1.00
        return lodash.random(0.45, 1.00, true);
    }
], [3, 24, 33, 24, 16]);
const PaintLot = new Lottery(
// a list containing 0 - 999
lodash.range(0, 1000));
const c = CSData.CaseKilowatt;
;
let stat = {};
export class CSCaseSimPlugin extends Plugin {
    constructor() {
        super({
            name: 'CSCaseSimPlugin',
            dsc: 'CS2 Case Opening Simulation (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^(!|！)开箱.*$',
                    fnc: 'single'
                },
                {
                    reg: '^(!|！)开十箱.*$',
                    fnc: 'ten'
                },
                {
                    reg: '^(!|！)统计.*$',
                    fnc: 'stats'
                }
            ]
        });
    }
    getRarityEmojiSquare(rarity) {
        if (rarity == CS.Rarity.Gold)
            return '🟨';
        if (rarity == CS.Rarity.Red)
            return '🟥';
        if (rarity == CS.Rarity.Purple)
            return '🟪';
        if (rarity == CS.Rarity.Pink)
            return '🌸';
        if (rarity == CS.Rarity.Blue)
            return '🟦';
        return '';
    }
    getFloat(float) {
        if (float < 0.07)
            return CS.Float.FN;
        if (float < 0.15)
            return CS.Float.MW;
        if (float < 0.38)
            return CS.Float.FT;
        if (float < 0.45)
            return CS.Float.WW;
        return CS.Float.BS;
    }
    getItemName(item, float, st) {
        let name = `${item.name} (${float})`;
        if (st == CS.StatTrak.StatTrak) {
            if (name.includes('（★）'))
                name = name.replace('（★）', '（★ StatTrak）');
            else
                name = name.replace(' |', '（StatTrak） |');
        }
        return name;
    }
    gen(user_id) {
        // use CaseKilowatt.rarity as lottery table and select a rarity
        const rarityLot = new Lottery(Object.keys(c.rarity), Object.values(c.rarity));
        const rarity = rarityLot.choice();
        // Select one item fron the rarity level
        const rarityItems = c.items[rarity];
        const itemLot = new Lottery(rarityItems);
        const item = itemLot.choice();
        // Decide float
        const floatRaw = FloatLot.choice()();
        // Scale float to item's float range
        const float = item.minFloat + floatRaw * (item.maxFloat - item.minFloat);
        // Decide StatTrak
        const st = STLot.choice();
        // Decide Paint Kit
        const paint = PaintLot.choice();
        let msg = `${this.getItemName(item, this.getFloat(float), st)}\n`;
        msg += `\n稀有度: ${this.getRarityEmojiSquare(rarity)}${rarity}\n磨损: ${float.toFixed(16)}\n图案模版: ${paint}`;
        msg += `\n估值: ¥${item.prices[this.getFloat(float)][st].toFixed(2)}`;
        stat[user_id] = stat[user_id] || {
            totalCase: 0,
            countByRarity: {
                [CS.Rarity.Gold]: 0,
                [CS.Rarity.Red]: 0,
                [CS.Rarity.Purple]: 0,
                [CS.Rarity.Pink]: 0,
                [CS.Rarity.Blue]: 0
            },
            totalValue: 0
        };
        stat[user_id].totalCase += 1;
        stat[user_id].countByRarity[rarity] += 1;
        stat[user_id].totalValue += item.prices[this.getFloat(float)][st];
        return { msg, rarity, item, float, st, paint };
    }
    async single() {
        let d = this.gen(this.e.user_id);
        let recallMsg = 120;
        if ([CS.Rarity.Gold, CS.Rarity.Red, CS.Rarity.Pink].includes(d.rarity))
            recallMsg = 0;
        await this.reply(d.msg, true, { recallMsg });
    }
    async ten() {
        let d = Array.from({ length: 10 }, () => this.gen(this.e.user_id));
        // get highest rarity
        let raritySort = [CS.Rarity.Gold, CS.Rarity.Red, CS.Rarity.Pink, CS.Rarity.Purple, CS.Rarity.Blue];
        let rarity = raritySort.find(r => d.map(x => x.rarity).includes(r));
        // get total price
        let price = d.map(x => x.item.prices[this.getFloat(x.float)][x.st])
            .reduce((acc, x) => acc + x, 0);
        let previewMsg = `最高稀有度: ${this.getRarityEmojiSquare(rarity)}${rarity}\n`;
        previewMsg += `总估值: ¥${price.toFixed(2)}`;
        let recallMsg = 120;
        if ([CS.Rarity.Gold, CS.Rarity.Red, CS.Rarity.Pink].includes(rarity))
            recallMsg = 0;
        const fMsg = await Common.makeForwardMsg(this.e, d.map(x => x.msg), previewMsg);
        await this.reply(fMsg, false, { recallMsg });
    }
    async stats() {
        if (!(this.e.user_id in stat)) {
            await this.reply('你还没有开过箱子哦', true);
            return;
        }
        let s = stat[this.e.user_id];
        let msg = `总开箱数: ${s.totalCase}\n`;
        msg += `稀有度统计: \n`;
        for (const rarity of [CS.Rarity.Gold, CS.Rarity.Red, CS.Rarity.Pink, CS.Rarity.Purple, CS.Rarity.Blue]) {
            const count = s.countByRarity[rarity];
            msg += `- ${this.getRarityEmojiSquare(rarity)}${rarity}: ${count}\n`;
        }
        msg += `\n开箱费用: ¥${s.totalCase * c.price}`;
        msg += `\n总估值: ¥${s.totalValue}`;
        msg += `\n盈亏: ¥${s.totalValue - s.totalCase * c.price}`;
        await this.reply(msg, true);
    }
}
;
