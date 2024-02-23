import lodash from 'lodash';
import * as base from '../model/base_artifact.js';
import * as gs from '../model/genshin_artifact.js';
import Lottery from '../model/lottery.js';
import { DisplayModes } from '../model/utils.js';

/* ------------------------ Artifact Stat ------------------------ */
export const Genshin_ArtifactMainStat = {
    FlatHP: new base.ArtifactStatConst(
        "FlatHP", "生命值",
        717, [1530, 2342, 3155, 3967, 4780],
        DisplayModes.Integer
    ),
    FlatATK: new base.ArtifactStatConst(
        "FlatATK", "攻击力",
        47, [100, 152, 205, 258, 311],
        DisplayModes.Integer
    ),
    HP: new base.ArtifactStatConst(
        "HP", "生命值",
        7.0, [14.9, 22.8, 30.8, 38.7, 46.6],
        DisplayModes.Percentage1D
    ),
    ATK: new base.ArtifactStatConst(
        "ATK", "攻击力",
        7.0, [14.9, 22.8, 30.8, 38.7, 46.6],
        DisplayModes.Percentage1D
    ),
    DEF: new base.ArtifactStatConst(
        "DEF", "防御力",
        8.7, [18.6, 28.6, 38.5, 48.4, 58.3],
        DisplayModes.Percentage1D
    ),
    ElementMastery: new base.ArtifactStatConst(
        "Elemental Mastery", "元素精通",
        28, [60, 91, 123, 155, 187],
        DisplayModes.Integer
    ),
    EnergyRecharge: new base.ArtifactStatConst(
        "Energy Recharge", "元素充能效率",
        7.8, [16.6, 25.4, 34.2, 43.0, 51.8],
        DisplayModes.Percentage1D
    ),
    ElementalDMGBonus: new base.ArtifactStatConst(
        "Elemental DMG Bonus", "元素伤害加成",
        7.0, [14.9, 22.8, 30.8, 38.7, 46.6],
        DisplayModes.Percentage1D
    ), // requires alterName later
    PhysicalDMGBonus: new base.ArtifactStatConst(
        "Physical DMG Bonus", "物理伤害加成",
        8.7, [18.6, 28.6, 38.5, 48.4, 58.3],
        DisplayModes.Percentage1D
    ),
    CRITRate: new base.ArtifactStatConst(
        "CRIT Rate", "暴击率",
        4.7, [9.9, 15.2, 20.5, 25.8, 31.1],
        DisplayModes.Percentage1D
    ),
    CRITDamage: new base.ArtifactStatConst(
        "CRIT Damage", "暴击伤害",
        9.3, [19.9, 30.5, 41.0, 51.6, 62.2],
        DisplayModes.Percentage1D
    ),
    HealingBonus: new base.ArtifactStatConst(
        "Healing Bonus", "治疗加成",
        5.4, [11.5, 17.6, 23.7, 29.8, 35.9],
        DisplayModes.Percentage1D
    ),
};

const CRITRate = new Lottery<number>([2.70, 3.11, 3.50, 3.89]);
const CRITDamage = new Lottery<number>([5.44, 6.22, 6.99, 7.77]);
const ATK = new Lottery<number>([4.08, 4.66, 5.25, 5.83]);
const FlatATK = new Lottery<number>([13.62, 15.56, 17.51, 19.45]);
const HP = new Lottery<number>([4.08, 4.66, 5.25, 5.83]);
const FlatHP = new Lottery<number>([209.13, 239, 268.88, 298.75]);
const DEF = new Lottery<number>([5.10, 5.83, 6.56, 7.29]);
const FlatDEF = new Lottery<number>([16.2, 18.52, 20.83, 23.15]);
const ElementalMastery = new Lottery<number>([16.32, 18.65, 20.98, 23.31]);
const EnergyRecharge = new Lottery<number>([4.53, 5.18, 5.83, 6.48]);

export const Genshin_ArtifactSubStat = {
    CRITRate: new base.ArtifactStatRandom(
        "CRIT Rate", "暴击率", CRITRate, CRITRate, DisplayModes.Percentage1D
    ),
    CRITDamage: new base.ArtifactStatRandom(
        "CRIT Damage", "暴击伤害", CRITDamage, CRITDamage, DisplayModes.Percentage1D
    ),
    ATK: new base.ArtifactStatRandom(
        "ATK", "攻击力", ATK, ATK, DisplayModes.Percentage1D
    ),
    FlatATK: new base.ArtifactStatRandom(
        "FlatATK", "攻击力", FlatATK, FlatATK, DisplayModes.Integer
    ),
    HP: new base.ArtifactStatRandom(
        "HP", "生命值", HP, HP, DisplayModes.Percentage1D
    ),
    FlatHP: new base.ArtifactStatRandom(
        "FlatHP", "生命值", FlatHP, FlatHP, DisplayModes.Integer
    ),
    DEF: new base.ArtifactStatRandom(
        "DEF", "防御力", DEF, DEF, DisplayModes.Percentage1D
    ),
    FlatDEF: new base.ArtifactStatRandom(
        "FlatDEF", "防御力", FlatDEF, FlatDEF, DisplayModes.Integer
    ),
    ElementalMastery: new base.ArtifactStatRandom(
        "Elemental Mastery", "元素精通", ElementalMastery, ElementalMastery, DisplayModes.Integer
    ),
    EnergyRecharge: new base.ArtifactStatRandom(
        "Energy Recharge", "元素充能效率", EnergyRecharge, EnergyRecharge, DisplayModes.Percentage1D
    ),
};


/* ------------------------ Artifact Piece ------------------------ */

const subStat1 = new Lottery<base.ArtifactStat>(
    [
        Genshin_ArtifactSubStat.FlatHP,
        Genshin_ArtifactSubStat.FlatATK,
        Genshin_ArtifactSubStat.FlatDEF,
        Genshin_ArtifactSubStat.HP,
        Genshin_ArtifactSubStat.ATK,
        Genshin_ArtifactSubStat.DEF,
        Genshin_ArtifactSubStat.EnergyRecharge,
        Genshin_ArtifactSubStat.ElementalMastery,
        Genshin_ArtifactSubStat.CRITRate,
        Genshin_ArtifactSubStat.CRITDamage,
    ],
    [
        15.79, 15.79, 15.79, 10.53, 10.53, 10.53, 10.53, 10.53, 7.89, 7.89
    ]
);
const subStat2 = new Lottery<base.ArtifactStat>(
    [
        Genshin_ArtifactSubStat.FlatHP,
        Genshin_ArtifactSubStat.FlatATK,
        Genshin_ArtifactSubStat.FlatDEF,
        Genshin_ArtifactSubStat.HP,
        Genshin_ArtifactSubStat.ATK,
        Genshin_ArtifactSubStat.DEF,
        Genshin_ArtifactSubStat.EnergyRecharge,
        Genshin_ArtifactSubStat.ElementalMastery,
        Genshin_ArtifactSubStat.CRITRate,
        Genshin_ArtifactSubStat.CRITDamage,
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


export const Genshin_ArtifactPieces = {
    FlowerOfLife: new gs.Genshin_ArtifactPiece(
        "Flower of Life", "生之花",
        new Lottery<base.ArtifactStat>([Genshin_ArtifactMainStat.FlatHP]),
        subStat1, subCount
    ),
    PlumeOfDeath: new gs.Genshin_ArtifactPiece(
        "Plume of Death", "死之羽",
        new Lottery<base.ArtifactStat>([Genshin_ArtifactMainStat.FlatATK]),
        subStat1, subCount
    ),
    SandsOfEon: new gs.Genshin_ArtifactPiece(
        "Sands of Eon", "时之沙",
        new Lottery<base.ArtifactStat>(
            [
                Genshin_ArtifactMainStat.HP,
                Genshin_ArtifactMainStat.ATK,
                Genshin_ArtifactMainStat.DEF,
                Genshin_ArtifactMainStat.EnergyRecharge,
                Genshin_ArtifactMainStat.ElementMastery
            ],
            [
                26.68, 26.66, 26.66, 10.00, 10.00
            ]
        ),
        subStat2, subCount
    ),
    GobletOfEonothem: new gs.Genshin_ArtifactPiece(
        "Goblet of Eonothem", "空之杯",
        new Lottery<base.ArtifactStat>(
            [
                Genshin_ArtifactMainStat.HP,
                Genshin_ArtifactMainStat.ATK,
                Genshin_ArtifactMainStat.DEF,
                Genshin_ArtifactMainStat.ElementalDMGBonus.alterName("Pyro DMG Bonus", "火元素伤害加成"),
                Genshin_ArtifactMainStat.ElementalDMGBonus.alterName("Electro DMG Bonus", "雷元素伤害加成"),
                Genshin_ArtifactMainStat.ElementalDMGBonus.alterName("Cryo DMG Bonus", "冰元素伤害加成"),
                Genshin_ArtifactMainStat.ElementalDMGBonus.alterName("Hydro DMG Bonus", "水元素伤害加成"),
                Genshin_ArtifactMainStat.ElementalDMGBonus.alterName("Anemo DMG Bonus", "风元素伤害加成"),
                Genshin_ArtifactMainStat.ElementalDMGBonus.alterName("Geo DMG Bonus", "岩元素伤害加成"),
                Genshin_ArtifactMainStat.ElementalDMGBonus.alterName("Dendro DMG Bonus", "草元素伤害加成"),
                Genshin_ArtifactMainStat.PhysicalDMGBonus,
                Genshin_ArtifactMainStat.ElementMastery,
            ],
            [
                19.175, 19.175, 19.15, 5,5,5,5,5,5,5,5, 2.5
            ]
        ),
        subStat2, subCount
    ),
    CircletOfLogos: new gs.Genshin_ArtifactPiece(
        "Circlet of Logos", "理之冠",
        new Lottery<base.ArtifactStat>(
            [
                Genshin_ArtifactMainStat.HP,
                Genshin_ArtifactMainStat.ATK,
                Genshin_ArtifactMainStat.DEF,
                Genshin_ArtifactMainStat.CRITRate,
                Genshin_ArtifactMainStat.CRITDamage,
                Genshin_ArtifactMainStat.HealingBonus,
                Genshin_ArtifactMainStat.ElementMastery
            ],
            [
                22, 22, 22, 10, 10, 10, 4
            ]
        ),
        subStat2, subCount
    ),
};

let Genshin_ArtifactPiecesAlt_ = {};
Object.keys(Genshin_ArtifactPieces).forEach(x => {
    let y: gs.Genshin_ArtifactPiece = Object.create(Genshin_ArtifactPieces[x]);
    y.subStatCount = subCountAlt;
    Genshin_ArtifactPiecesAlt_[x] = y;
});
export const Genshin_ArtifactPiecesAlt = Genshin_ArtifactPiecesAlt_;



/* ------------------------ Resin Drop ------------------------ */

export const GenshinOriginalResinDropLottery = new Lottery<number>(
    [
        1, 2
    ],
    [
        93, 7
    ]
);

export const GenshinCondensedResinDropLottery = new Lottery<number>(
    [
        2, 3
    ],
    [
        86.49, 100 - 86.49
    ]
);




/* ------------------------ Score Calculation ------------------------ */


export const Genshin_ArtifactScore_BaseMultipler: gs.Genshin_ArtifactScoreRule = {
    "CRIT Rate": 2,
    "CRIT Damage": 1,
    "Elemental Mastery": 0.33,
    "Energy Recharge": 1.1979,
    "ATK": 1.33,
    "HP": 1.33,
    "DEF": 1.06,
    "FlatATK": 0.398 * 0.5,
    "FlatHP": 0.026 * 0.66,
    "FlatDEF": 0.335 * 0.66
};

export const Genshin_ArtifactScore_TempMultipler: gs.Genshin_ArtifactScoreRule = {
    "CRIT Rate": 1,
    "CRIT Damage": 1,
    "Elemental Mastery": 0.15,
    "Energy Recharge": 0.15,
    "ATK": 0.1,
    "HP": 0.1,
    "DEF": 0,
    "FlatATK": 0.05,
    "FlatHP": 0.05,
    "FlatDEF": 0
};

const findRule = (stat: base.ArtifactStat, rule: gs.Genshin_ArtifactScoreRule): number => {
    if (stat.name in rule) return rule[stat.name];
    return 0;
};

const spStat = ["CRIT Rate", "CRIT Damage"];

export const Genshin_ArtifactScorer: gs.Genshin_ArtifactScorer =
    (piece) => {
        let score = 0;
        if (spStat.includes(piece.mainStat.name)) score = 20;
        piece.subStats.forEach(subStat => {
            score += subStat.value
                * findRule(subStat, Genshin_ArtifactScore_BaseMultipler)
                * findRule(subStat, Genshin_ArtifactScore_TempMultipler);
        });
        return score;
    };



/* ------------------------ Artifact Set ------------------------ */

const pieces = new Lottery<gs.Genshin_ArtifactPiece>(lodash.values(Genshin_ArtifactPieces));
const piecesAlt = new Lottery<gs.Genshin_ArtifactPiece>(lodash.values(Genshin_ArtifactPiecesAlt));

export const Genshin_ArtifactSets = {
    EmblemOfSeveredFate: new gs.Genshin_ArtifactSet(
        "Emblem of Severed Fate", "绝缘之旗印",
        ["绝缘"],
        pieces,
        {
            "Flower of Life": {
                name: "Magnificent Tsuba",
                displayName: "明威之镡",
                image: "绝缘之旗印/1.webp",
            },
            "Plume of Death": {
                name: "Sundered Feather",
                displayName: "切落之羽",
                image: "绝缘之旗印/2.webp",
            },
            "Sands of Eon": {
                name: "Storm Cage",
                displayName: "雷云之笼",
                image: "绝缘之旗印/3.webp",
            },
            "Goblet of Eonothem": {
                name: "Scarlet Vessel",
                displayName: "绯花之壶",
                image: "绝缘之旗印/4.webp",
            },
            "Circlet of Logos": {
                name: "Ornate Kabuto",
                displayName: "华饰之兜",
                image: "绝缘之旗印/5.webp",
            },
        },
    ),
    ShimenawasReminiscence: new gs.Genshin_ArtifactSet(
        "Shimenawa's Reminiscence", "追忆之注连",
        ["追忆"],
        pieces,
        {
            "Flower of Life": {
                name: "Entangling Bloom",
                displayName: "羁缠之花",
                image: "追忆之注连/1.webp",
            },
            "Plume of Death": {
                name: "Shaft of Remembrance",
                displayName: "思忆之矢",
                image: "追忆之注连/2.webp",
            },
            "Sands of Eon": {
                name: "Morning Dew's Moment",
                displayName: "朝露之时",
                image: "追忆之注连/3.webp",
            },
            "Goblet of Eonothem": {
                name: "Hopeful Heart",
                displayName: "祈望之心",
                image: "追忆之注连/4.webp",
            },
            "Circlet of Logos": {
                name: "Capricious Visage",
                displayName: "无常之面",
                image: "追忆之注连/5.webp",
            },
        },
    ),
    DeepwoodMemories: new gs.Genshin_ArtifactSet(
        "Deepwood Memories", "深林的记忆",
        ["草套", "深林"],
        pieces,
        {
            "Flower of Life": {
                name: "Labyrinth Wayfarer",
                displayName: "迷宫的游人",
                image: "深林的记忆/1.webp",
            },
            "Plume of Death": {
                name: "Scholar of Vines",
                displayName: "翠蔓的智者",
                image: "深林的记忆/2.webp",
            },
            "Sands of Eon": {
                name: "A Time of Insight",
                displayName: "贤智的定期",
                image: "深林的记忆/3.webp",
            },
            "Goblet of Eonothem": {
                name: "Lamp of the Lost",
                displayName: "迷误者之灯",
                image: "深林的记忆/4.webp",
            },
            "Circlet of Logos": {
                name: "Laurel Coronet",
                displayName: "月桂的宝冠",
                image: "深林的记忆/5.webp",
            },
        },
    ),
    GildedDreams: new gs.Genshin_ArtifactSet(
        "Gilded Dreams", "饰金之梦",
        ["饰金"],
        pieces,
        {
            "Flower of Life": {
                name: "Dreaming Steelbloom",
                displayName: "梦中的铁花",
                image: "饰金之梦/1.webp",
            },
            "Plume of Death": {
                name: "Feather of Judgment",
                displayName: "裁断的翎羽",
                image: "饰金之梦/2.webp",
            },
            "Sands of Eon": {
                name: "The Sunken Years",
                displayName: "沉金的岁月",
                image: "饰金之梦/3.webp",
            },
            "Goblet of Eonothem": {
                name: "Honeyed Final Feast",
                displayName: "如蜜的终宴",
                image: "饰金之梦/4.webp",
            },
            "Circlet of Logos": {
                name: "Shadow of the Sand King",
                displayName: "沙王的投影",
                image: "饰金之梦/5.webp",
            },
        },
    ),
    MarechausseeHunter: new gs.Genshin_ArtifactSet(
        "Marechaussee Hunter", "逐影猎人",
        ["猎人", "逐影"],
        pieces,
        {
            "Flower of Life": {
                name: "Hunter's Brooch",
                displayName: "猎人的胸花",
                image: "逐影猎人/1.webp",
            },
            "Plume of Death": {
                name: "Masterpiece's Overture",
                displayName: "杰作的序曲",
                image: "逐影猎人/2.webp",
            },
            "Sands of Eon": {
                name: "Moment of Judgment",
                displayName: "裁判的时刻",
                image: "逐影猎人/3.webp",
            },
            "Goblet of Eonothem": {
                name: "Forgotten Vessel",
                displayName: "遗忘的容器",
                image: "逐影猎人/4.webp",
            },
            "Circlet of Logos": {
                name: "Veteran's Visage",
                displayName: "老兵的容颜",
                image: "逐影猎人/5.webp",
            },
        },
    ),
    GoldenTroupe: new gs.Genshin_ArtifactSet(
        "Golden Troupe", "黄金剧团",
        ["黄金", "剧团"],
        pieces,
        {
            "Flower of Life": {
                name: "Golden Song's Variation",
                displayName: "黄金乐曲的变奏",
                image: "黄金剧团/1.webp",
            },
            "Plume of Death": {
                name: "Golden Bird's Shedding",
                displayName: "黄金飞鸟的落羽",
                image: "黄金剧团/2.webp",
            },
            "Sands of Eon": {
                name: "Golden Era's Prelude",
                displayName: "黄金时代的先声",
                image: "黄金剧团/3.webp",
            },
            "Goblet of Eonothem": {
                name: "Golden Night's Bustle",
                displayName: "黄金之夜的喧嚣",
                image: "黄金剧团/4.webp",
            },
            "Circlet of Logos": {
                name: "Golden Troupe's Reward",
                displayName: "黄金剧团的奖赏",
                image: "黄金剧团/5.webp",
            },
        },
    ),
};

let Genshin_ArtifactSetsAlt_ = lodash.clone(Genshin_ArtifactSets);
Object.keys(Genshin_ArtifactSets).forEach(x => {
    let y: gs.Genshin_ArtifactSet = Object.create(Genshin_ArtifactSets[x]);
    y.pieceList = piecesAlt;
    Genshin_ArtifactSetsAlt_[x] = y;
});
export const Genshin_ArtifactSetsAlt = Genshin_ArtifactSetsAlt_;



/* ------------------------ Artifact Domain ------------------------ */

export const Genshin_ArtifactDomains = [
    new gs.Genshin_ArtifactDomain(
        "Momiji-Dyed Court", "椛染之庭",
        ["绝缘本"],
        new Lottery<gs.Genshin_ArtifactSet>([
            Genshin_ArtifactSets.EmblemOfSeveredFate,
            Genshin_ArtifactSets.ShimenawasReminiscence,
        ])
    ),
    new gs.Genshin_ArtifactDomain(
        "Spire of Solitary Enlightenment", "缘觉塔",
        ["草本"],
        new Lottery<gs.Genshin_ArtifactSet>([
            Genshin_ArtifactSets.DeepwoodMemories,
            Genshin_ArtifactSets.GildedDreams,
        ])
    ),
    new gs.Genshin_ArtifactDomain(
        "Denouement of Sin", "罪祸的终末",
        ["猎人本"],
        new Lottery<gs.Genshin_ArtifactSet>([
            Genshin_ArtifactSets.MarechausseeHunter,
            Genshin_ArtifactSets.GoldenTroupe,
        ])
    ),
];

export const Genshin_ArtifactDomainsAlt = [
    new gs.Genshin_ArtifactDomain(
        "Momiji-Dyed Court", "椛染之庭",
        ["绝缘本"],
        new Lottery<gs.Genshin_ArtifactSet>([
            Genshin_ArtifactSetsAlt.EmblemOfSeveredFate,
            Genshin_ArtifactSetsAlt.ShimenawasReminiscence,
        ])
    ),
    new gs.Genshin_ArtifactDomain(
        "Spire of Solitary Enlightenment", "缘觉塔",
        ["草本"],
        new Lottery<gs.Genshin_ArtifactSet>([
            Genshin_ArtifactSetsAlt.DeepwoodMemories,
            Genshin_ArtifactSetsAlt.GildedDreams,
        ])
    ),
    new gs.Genshin_ArtifactDomain(
        "Denouement of Sin", "罪祸的终末",
        ["猎人本"],
        new Lottery<gs.Genshin_ArtifactSet>([
            Genshin_ArtifactSetsAlt.MarechausseeHunter,
            Genshin_ArtifactSetsAlt.GoldenTroupe,
        ])
    ),
];
