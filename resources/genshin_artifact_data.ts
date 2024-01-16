import lodash from 'lodash';
import * as base from '../model/base_artifact.js';
import * as gs from '../model/genshin_artifact.js';
import Lottery from '../model/lottery.js';
import { DisplayModes } from '../model/utils.js';

/* ------------------------ Artifact Stat ------------------------ */
export const GenshinArtifactMainStat = {
    FlatHP: new base.ArtifactStatConst(
        "HP", "生命值",
        717, [1530, 2342, 3155, 3967, 4780],
        DisplayModes.Integer
    ),
    FlatATK: new base.ArtifactStatConst(
        "ATK", "攻击力",
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

export const GenshinArtifactSubStat = {
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
        "ATK", "攻击力", FlatATK, FlatATK, DisplayModes.Integer
    ),
    HP: new base.ArtifactStatRandom(
        "HP", "生命值", HP, HP, DisplayModes.Percentage1D
    ),
    FlatHP: new base.ArtifactStatRandom(
        "HP", "生命值", FlatHP, FlatHP, DisplayModes.Integer
    ),
    DEF: new base.ArtifactStatRandom(
        "DEF", "防御力", DEF, DEF, DisplayModes.Percentage1D
    ),
    FlatDEF: new base.ArtifactStatRandom(
        "DEF", "防御力", FlatDEF, FlatDEF, DisplayModes.Integer
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
        GenshinArtifactSubStat.FlatHP,
        GenshinArtifactSubStat.FlatATK,
        GenshinArtifactSubStat.FlatDEF,
        GenshinArtifactSubStat.HP,
        GenshinArtifactSubStat.ATK,
        GenshinArtifactSubStat.DEF,
        GenshinArtifactSubStat.EnergyRecharge,
        GenshinArtifactSubStat.ElementalMastery,
        GenshinArtifactSubStat.CRITRate,
        GenshinArtifactSubStat.CRITDamage,
    ],
    [
        15.79, 15.79, 15.79, 10.53, 10.53, 10.53, 10.53, 10.53, 7.89, 7.89
    ]
);
const subStat2 = new Lottery<base.ArtifactStat>(
    [
        GenshinArtifactSubStat.FlatHP,
        GenshinArtifactSubStat.FlatATK,
        GenshinArtifactSubStat.FlatDEF,
        GenshinArtifactSubStat.HP,
        GenshinArtifactSubStat.ATK,
        GenshinArtifactSubStat.DEF,
        GenshinArtifactSubStat.EnergyRecharge,
        GenshinArtifactSubStat.ElementalMastery,
        GenshinArtifactSubStat.CRITRate,
        GenshinArtifactSubStat.CRITDamage,
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
        80, 20
    ]
);

export const GenshinArtifactPieces = {
    FlowerOfLife: new gs.GenshinArtifactPiece(
        "Flower of Life", "生之花",
        new Lottery<base.ArtifactStat>([GenshinArtifactMainStat.FlatHP]),
        subStat1, subCount
    ),
    PlumeOfDeath: new gs.GenshinArtifactPiece(
        "Plume of Death", "死之羽",
        new Lottery<base.ArtifactStat>([GenshinArtifactMainStat.FlatATK]),
        subStat1, subCount
    ),
    SandsOfEon: new gs.GenshinArtifactPiece(
        "Sands of Eon", "时之沙",
        new Lottery<base.ArtifactStat>(
            [
                GenshinArtifactMainStat.HP,
                GenshinArtifactMainStat.ATK,
                GenshinArtifactMainStat.DEF,
                GenshinArtifactMainStat.EnergyRecharge,
                GenshinArtifactMainStat.ElementMastery
            ],
            [
                26.68, 26.66, 26.66, 10.00, 10.00
            ]
        ),
        subStat2, subCount
    ),
    GobletOfEonothem: new gs.GenshinArtifactPiece(
        "Goblet of Eonothem", "空之杯",
        new Lottery<base.ArtifactStat>(
            [
                GenshinArtifactMainStat.HP,
                GenshinArtifactMainStat.ATK,
                GenshinArtifactMainStat.DEF,
                GenshinArtifactMainStat.ElementalDMGBonus.alterName("Pyro DMG Bonus", "火元素伤害加成"),
                GenshinArtifactMainStat.ElementalDMGBonus.alterName("Electro DMG Bonus", "雷元素伤害加成"),
                GenshinArtifactMainStat.ElementalDMGBonus.alterName("Cryo DMG Bonus", "冰元素伤害加成"),
                GenshinArtifactMainStat.ElementalDMGBonus.alterName("Hydro DMG Bonus", "水元素伤害加成"),
                GenshinArtifactMainStat.ElementalDMGBonus.alterName("Anemo DMG Bonus", "风元素伤害加成"),
                GenshinArtifactMainStat.ElementalDMGBonus.alterName("Geo DMG Bonus", "岩元素伤害加成"),
                GenshinArtifactMainStat.ElementalDMGBonus.alterName("Dendro DMG Bonus", "草元素伤害加成"),
                GenshinArtifactMainStat.PhysicalDMGBonus,
                GenshinArtifactMainStat.ElementMastery,
            ],
            [
                19.175, 19.175, 19.15, 5,5,5,5,5,5,5,5, 2.5
            ]
        ),
        subStat2, subCount
    ),
    CircletOfLogos: new gs.GenshinArtifactPiece(
        "Circlet of Logos", "理之冠",
        new Lottery<base.ArtifactStat>(
            [
                GenshinArtifactMainStat.HP,
                GenshinArtifactMainStat.ATK,
                GenshinArtifactMainStat.DEF,
                GenshinArtifactMainStat.CRITRate,
                GenshinArtifactMainStat.CRITDamage,
                GenshinArtifactMainStat.HealingBonus,
                GenshinArtifactMainStat.ElementMastery
            ],
            [
                22, 22, 22, 10, 10, 10, 4
            ]
        ),
        subStat2, subCount
    ),
};


/* ------------------------ Artifact Set ------------------------ */
const pieces = new Lottery<gs.GenshinArtifactPiece>(lodash.values(GenshinArtifactPieces));

export const GenshinArtifactSets = {
    EmblemOfSeveredFate: new gs.GenshinArtifactSet(
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
    )
};
