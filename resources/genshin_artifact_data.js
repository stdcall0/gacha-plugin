import lodash from 'lodash';
import Lottery from '../model/lottery.js';
import { DisplayModes } from '../model/utils.js';
import * as base from '../model/base.js';
import * as gs from '../model/genshin_artifact.js';
/* ------------------------ Artifact Stat ------------------------ */
export const MainStat = {
    FlatHP: new base.ArrayStat("FlatHP", "生命值", DisplayModes.Integer, [717, 1530, 2342, 3155, 3967, 4780]),
    FlatATK: new base.ArrayStat("FlatATK", "攻击力", DisplayModes.Integer, [47, 100, 152, 205, 258, 311]),
    HP: new base.ArrayStat("HP", "生命值", DisplayModes.Percentage1D, [7.0, 14.9, 22.8, 30.8, 38.7, 46.6]),
    ATK: new base.ArrayStat("ATK", "攻击力", DisplayModes.Percentage1D, [7.0, 14.9, 22.8, 30.8, 38.7, 46.6]),
    DEF: new base.ArrayStat("DEF", "防御力", DisplayModes.Percentage1D, [8.7, 18.6, 28.6, 38.5, 48.4, 58.3]),
    ElementMastery: new base.ArrayStat("Elemental Mastery", "元素精通", DisplayModes.Integer, [28, 60, 91, 123, 155, 187]),
    EnergyRecharge: new base.ArrayStat("Energy Recharge", "元素充能效率", DisplayModes.Percentage1D, [7.8, 16.6, 25.4, 34.2, 43.0, 51.8]),
    ElementalDMGBonus: new base.ArrayStat("Elemental DMG Bonus", "元素伤害加成", DisplayModes.Percentage1D, [7.0, 14.9, 22.8, 30.8, 38.7, 46.6]), // requires alterName later
    PhysicalDMGBonus: new base.ArrayStat("Physical DMG Bonus", "物理伤害加成", DisplayModes.Percentage1D, [8.7, 18.6, 28.6, 38.5, 48.4, 58.3]),
    CRITRate: new base.ArrayStat("CRIT Rate", "暴击率", DisplayModes.Percentage1D, [4.7, 9.9, 15.2, 20.5, 25.8, 31.1]),
    CRITDamage: new base.ArrayStat("CRIT Damage", "暴击伤害", DisplayModes.Percentage1D, [9.3, 19.9, 30.5, 41.0, 51.6, 62.2]),
    HealingBonus: new base.ArrayStat("Healing Bonus", "治疗加成", DisplayModes.Percentage1D, [5.4, 11.5, 17.6, 23.7, 29.8, 35.9]),
};
const CRITRate = new Lottery([2.70, 3.11, 3.50, 3.89]);
const CRITDamage = new Lottery([5.44, 6.22, 6.99, 7.77]);
const ATK = new Lottery([4.08, 4.66, 5.25, 5.83]);
const FlatATK = new Lottery([13.62, 15.56, 17.51, 19.45]);
const HP = new Lottery([4.08, 4.66, 5.25, 5.83]);
const FlatHP = new Lottery([209.13, 239, 268.88, 298.75]);
const DEF = new Lottery([5.10, 5.83, 6.56, 7.29]);
const FlatDEF = new Lottery([16.2, 18.52, 20.83, 23.15]);
const ElementalMastery = new Lottery([16.32, 18.65, 20.98, 23.31]);
const EnergyRecharge = new Lottery([4.53, 5.18, 5.83, 6.48]);
export const SubStat = {
    CRITRate: new base.RandomStat("CRIT Rate", "暴击率", DisplayModes.Percentage1D, CRITRate),
    CRITDamage: new base.RandomStat("CRIT Damage", "暴击伤害", DisplayModes.Percentage1D, CRITDamage),
    ATK: new base.RandomStat("ATK", "攻击力", DisplayModes.Percentage1D, ATK),
    FlatATK: new base.RandomStat("FlatATK", "攻击力", DisplayModes.Integer, FlatATK),
    HP: new base.RandomStat("HP", "生命值", DisplayModes.Percentage1D, HP),
    FlatHP: new base.RandomStat("FlatHP", "生命值", DisplayModes.Integer, FlatHP),
    DEF: new base.RandomStat("DEF", "防御力", DisplayModes.Percentage1D, DEF),
    FlatDEF: new base.RandomStat("FlatDEF", "防御力", DisplayModes.Integer, FlatDEF),
    ElementalMastery: new base.RandomStat("Elemental Mastery", "元素精通", DisplayModes.Integer, ElementalMastery),
    EnergyRecharge: new base.RandomStat("Energy Recharge", "元素充能效率", DisplayModes.Percentage1D, EnergyRecharge),
};
/* ------------------------ Artifact Piece ------------------------ */
const subStat1 = new Lottery([
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
], [
    15.79, 15.79, 15.79, 10.53, 10.53, 10.53, 10.53, 10.53, 7.89, 7.89
]);
const subStat2 = new Lottery([
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
], [
    15.00, 15.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 7.50, 7.50
]);
const subCount = new Lottery([
    3, 4
], [
    8, 2
]);
const subCountAlt = new Lottery(// Crafting Table, BOSS drop
[
    3, 4
], [
    2, 1
]);
export const Pieces = {
    FlowerOfLife: new gs.Piece("Flower of Life", "生之花", new Lottery([MainStat.FlatHP]), subStat1, subCount),
    PlumeOfDeath: new gs.Piece("Plume of Death", "死之羽", new Lottery([MainStat.FlatATK]), subStat1, subCount),
    SandsOfEon: new gs.Piece("Sands of Eon", "时之沙", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.EnergyRecharge,
        MainStat.ElementMastery
    ], [
        26.68, 26.66, 26.66, 10.00, 10.00
    ]), subStat2, subCount),
    GobletOfEonothem: new gs.Piece("Goblet of Eonothem", "空之杯", new Lottery([
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
    ], [
        19.175, 19.175, 19.15, 5, 5, 5, 5, 5, 5, 5, 5, 2.5
    ]), subStat2, subCount),
    CircletOfLogos: new gs.Piece("Circlet of Logos", "理之冠", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.CRITRate,
        MainStat.CRITDamage,
        MainStat.HealingBonus,
        MainStat.ElementMastery
    ], [
        22, 22, 22, 10, 10, 10, 4
    ]), subStat2, subCount),
};
let piecesAlt_ = {};
Object.keys(Pieces).forEach(x => {
    let y = Object.create(Pieces[x]);
    y.subStatCount = subCountAlt;
    piecesAlt_[x] = y;
});
export const PiecesAlt = piecesAlt_;
/* ------------------------ Resin Drop ------------------------ */
export const OriginalResinDrop = new Lottery([
    1, 2
], [
    93, 7
]);
export const CondensedResinDrop = new Lottery([
    2, 3
], [
    86.49, 100 - 86.49
]);
/* ------------------------ Score Calculation ------------------------ */
const BaseScoreMultipler = {
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
const TempScoreMultipler = {
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
const findRule = (stat, rule) => {
    if (stat.name in rule)
        return rule[stat.name];
    return 0;
};
const spStat = ["CRIT Rate", "CRIT Damage"];
export const Scorer = (piece) => {
    let score = 0;
    if (spStat.includes(piece.mainStat.name))
        score = 20;
    piece.subStats.forEach(subStat => {
        score += subStat.value
            * findRule(subStat, BaseScoreMultipler)
            * findRule(subStat, TempScoreMultipler);
    });
    return score;
};
/* ------------------------ Artifact Set ------------------------ */
const pieces = new Lottery(lodash.values(Pieces));
const piecesAlt = new Lottery(lodash.values(PiecesAlt));
export const Sets = {
    EmblemOfSeveredFate: new gs.Set("Emblem of Severed Fate", "绝缘之旗印", ["绝缘"], pieces, {
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
    }),
    ShimenawasReminiscence: new gs.Set("Shimenawa's Reminiscence", "追忆之注连", ["追忆"], pieces, {
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
    }),
    DeepwoodMemories: new gs.Set("Deepwood Memories", "深林的记忆", ["草套", "深林"], pieces, {
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
    }),
    GildedDreams: new gs.Set("Gilded Dreams", "饰金之梦", ["饰金"], pieces, {
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
    }),
    MarechausseeHunter: new gs.Set("Marechaussee Hunter", "逐影猎人", ["猎人", "逐影"], pieces, {
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
    }),
    GoldenTroupe: new gs.Set("Golden Troupe", "黄金剧团", ["黄金", "剧团"], pieces, {
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
    }),
};
let setsAlt_ = lodash.clone(Sets);
Object.keys(Sets).forEach(x => {
    let y = Object.create(Sets[x]);
    y.pieceList = piecesAlt;
    setsAlt_[x] = y;
});
export const SetsAlt = setsAlt_;
/* ------------------------ Artifact Domain ------------------------ */
export const Domains = [
    new gs.Domain("Momiji-Dyed Court", "椛染之庭", ["绝缘本"], new Lottery([
        Sets.EmblemOfSeveredFate,
        Sets.ShimenawasReminiscence,
    ])),
    new gs.Domain("Spire of Solitary Enlightenment", "缘觉塔", ["草本"], new Lottery([
        Sets.DeepwoodMemories,
        Sets.GildedDreams,
    ])),
    new gs.Domain("Denouement of Sin", "罪祸的终末", ["猎人本"], new Lottery([
        Sets.MarechausseeHunter,
        Sets.GoldenTroupe,
    ])),
];
export const DomainsAlt = [
    new gs.Domain("Momiji-Dyed Court", "椛染之庭", ["绝缘本"], new Lottery([
        SetsAlt.EmblemOfSeveredFate,
        SetsAlt.ShimenawasReminiscence,
    ])),
    new gs.Domain("Spire of Solitary Enlightenment", "缘觉塔", ["草本"], new Lottery([
        SetsAlt.DeepwoodMemories,
        SetsAlt.GildedDreams,
    ])),
    new gs.Domain("Denouement of Sin", "罪祸的终末", ["猎人本"], new Lottery([
        SetsAlt.MarechausseeHunter,
        SetsAlt.GoldenTroupe,
    ])),
];
