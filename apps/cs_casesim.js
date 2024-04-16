import { Plugin, Lottery } from '#gc';
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
export class CSCaseSimPlugin extends Plugin {
    constructor() {
        super({
            name: 'CSCaseSimPlugin',
            dsc: 'CS2 Case Opening Simulation (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^!开箱.*$',
                    fnc: 'single'
                }
            ]
        });
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
        if (st) {
            if (name.includes('（★）'))
                name = name.replace('（★）', '（★ StatTrak™）');
            else
                name = name.replace(' |', '（StatTrak™） |');
        }
        return name;
    }
    async single() {
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
        msg += `\n稀有度: ${rarity}\n磨损: ${float.toFixed(6)}\n图案模版: ${paint}`;
        msg += `\n估值: ¥${item.prices[this.getFloat(float)][st]}`;
        let recallMsg = 120;
        if ([CS.Rarity.Gold, CS.Rarity.Red, CS.Rarity.Pink].includes(rarity))
            recallMsg = 0;
        await this.reply(msg, true, { recallMsg });
    }
}
;
