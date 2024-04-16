import { Plugin, Common, Lottery } from '#gc';
import lodash from 'lodash';

const RarityLot = new Lottery(
    ['金', '红', '粉', '紫', '蓝'],
    [0.26, 0.64, 3.2, 15.98, 79.92]
);
const FloatLot = new Lottery(
    [
        function fn() {
            // random value 0.00-0.07 
            return "Factory New " + lodash.random(0.00, 0.07, true).toFixed(3);
        },
        function mw() {
            // 0.07-0.15
            return "Minimal Wear " + lodash.random(0.07, 0.15, true).toFixed(3);
        },
        function ft() {
            // 0.15-0.38
            return "Field-Tested " + lodash.random(0.15, 0.38, true).toFixed(3);
        },
        function ww() {
            // 0.38-0.45
            return "Well-Worn " + lodash.random(0.38, 0.45, true).toFixed(3);
        },
        function bs() {
            // 0.45-1.00
            return "Battle-Scarred " + lodash.random(0.45, 1.00, true).toFixed(3);
        }
    ],
    [3,24,33,24,16]
);
const PaintLot = new Lottery(
    // a list containing 0 - 999
    lodash.range(0, 1000),
);

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

    async single() {
        const rarity = RarityLot.choice();
        const float = FloatLot.choice()();
        const paint = PaintLot.choice();
        const result = `\n稀有度：${rarity}\n磨损：${float}\n图案模版：${paint}`;
        await this.reply(result, true);
    }
};
