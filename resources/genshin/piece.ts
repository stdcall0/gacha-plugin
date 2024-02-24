import { Lottery } from '#gc';
import { Genshin } from '#gc.model';

import { MainStat, SubStat } from './stat.js';


const subStat1 = new Lottery(
    [
        SubStat.FlatHP,
        SubStat.FlatATK,
        SubStat.FlatDEF,
        SubStat.HP,
        SubStat.ATK,
        SubStat.DEF,
        SubStat.EnergyRecharge,
        SubStat.ElementalMastery,
        SubStat.CRITRate,
        SubStat.CRITDamage,
    ],
    [
        15.79, 15.79, 15.79, 10.53, 10.53, 10.53, 10.53, 10.53, 7.89, 7.89
    ]
);

const subStat2 = new Lottery(
    [
        SubStat.FlatHP,
        SubStat.FlatATK,
        SubStat.FlatDEF,
        SubStat.HP,
        SubStat.ATK,
        SubStat.DEF,
        SubStat.EnergyRecharge,
        SubStat.ElementalMastery,
        SubStat.CRITRate,
        SubStat.CRITDamage,
    ],
    [
        15.00, 15.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 7.50, 7.50
    ]
);

const subCount = new Lottery<number>(
    [
        3, 4
    ],
    [
        8, 2
    ]
);

const subCountAlt = new Lottery<number>( // Crafting Table, BOSS drop
    [
        3, 4
    ],
    [
        2, 1
    ]
);


export const Pieces = {
    FlowerOfLife: new Genshin.Piece(
        "Flower of Life", "生之花",
        new Lottery([MainStat.FlatHP]),
        subStat1, subCount
    ),
    PlumeOfDeath: new Genshin.Piece(
        "Plume of Death", "死之羽",
        new Lottery([MainStat.FlatATK]),
        subStat1, subCount
    ),
    SandsOfEon: new Genshin.Piece(
        "Sands of Eon", "时之沙",
        new Lottery(
            [
                MainStat.HP,
                MainStat.ATK,
                MainStat.DEF,
                MainStat.EnergyRecharge,
                MainStat.ElementMastery
            ],
            [
                26.68, 26.66, 26.66, 10.00, 10.00
            ]
        ),
        subStat2, subCount
    ),
    GobletOfEonothem: new Genshin.Piece(
        "Goblet of Eonothem", "空之杯",
        new Lottery(
            [
                MainStat.HP,
                MainStat.ATK,
                MainStat.DEF,
                MainStat.ElementalDMGBonus.alterName("Pyro DMG Bonus", "火元素伤害加成"),
                MainStat.ElementalDMGBonus.alterName("Electro DMG Bonus", "雷元素伤害加成"),
                MainStat.ElementalDMGBonus.alterName("Cryo DMG Bonus", "冰元素伤害加成"),
                MainStat.ElementalDMGBonus.alterName("Hydro DMG Bonus", "水元素伤害加成"),
                MainStat.ElementalDMGBonus.alterName("Anemo DMG Bonus", "风元素伤害加成"),
                MainStat.ElementalDMGBonus.alterName("Geo DMG Bonus", "岩元素伤害加成"),
                MainStat.ElementalDMGBonus.alterName("Dendro DMG Bonus", "草元素伤害加成"),
                MainStat.PhysicalDMGBonus,
                MainStat.ElementMastery,
            ],
            [
                19.175, 19.175, 19.15, 5,5,5,5,5,5,5,5, 2.5
            ]
        ),
        subStat2, subCount
    ),
    CircletOfLogos: new Genshin.Piece(
        "Circlet of Logos", "理之冠",
        new Lottery(
            [
                MainStat.HP,
                MainStat.ATK,
                MainStat.DEF,
                MainStat.CRITRate,
                MainStat.CRITDamage,
                MainStat.HealingBonus,
                MainStat.ElementMastery
            ],
            [
                22, 22, 22, 10, 10, 10, 4
            ]
        ),
        subStat2, subCount
    ),
};

let piecesAlt_ = {};
Object.keys(Pieces).forEach(x => {
    let y: Genshin.Piece = Object.create(Pieces[x]);
    y.subStatCount = subCountAlt;
    piecesAlt_[x] = y;
});
export const PiecesAlt = piecesAlt_;
