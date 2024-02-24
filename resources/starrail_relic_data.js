import lodash from 'lodash';
import Lottery from '../model/lottery.js';
import { DisplayModes } from '../model/utils.js';
import * as base from '../model/base.js';
import * as sr from '../model/starrail_relic.js';
/* ------------------------  Relic Main Stat ------------------------ */
export const MainStat = {
    FlatHP: new base.ConstantStat("FlatHP", "生命值", DisplayModes.Integer, 112.896, 39.5136 * 3),
    FlatATK: new base.ConstantStat("FlatATK", "攻击力", DisplayModes.Integer, 56.448, 19.7568 * 3),
    HP: new base.ConstantStat("HP", "生命值", DisplayModes.Percentage1D, 6.9120, 2.4192 * 3),
    ATK: new base.ConstantStat("ATK", "攻击力", DisplayModes.Percentage1D, 6.9120, 2.4192 * 3),
    DEF: new base.ConstantStat("DEF", "防御力", DisplayModes.Percentage1D, 8.64, 3.024 * 3),
    SPD: new base.ConstantStat("SPD", "速度", DisplayModes.Integer, 4.032, 1.4 * 3),
    BreakEffect: new base.ConstantStat("Break Effect", "击破特攻", DisplayModes.Percentage1D, 10.368, 3.6277 * 3),
    EffectHitRate: new base.ConstantStat("Effect Hit Rate", "效果命中", DisplayModes.Percentage1D, 6.912, 2.4192 * 3),
    EnergyRegenerationRate: new base.ConstantStat("Energy Regeneration Rate", "能量恢复效率", DisplayModes.Percentage1D, 3.1104, 1.0886 * 3),
    OutgoingHealingBoost: new base.ConstantStat("Outgoing Healing Boost", "治疗量加成", DisplayModes.Percentage1D, 5.5296, 1.9354 * 3),
    DMGBoost: new base.ConstantStat("DMG Boost", "属性伤害提高", DisplayModes.Percentage1D, 6.2208, 2.1773 * 3), // requires alterName later
    CRITRate: new base.ConstantStat("CRIT Rate", "暴击率", DisplayModes.Percentage1D, 5.184, 1.8144 * 3),
    CRITDMG: new base.ConstantStat("CRIT DMG", "暴击伤害", DisplayModes.Percentage1D, 10.368, 3.6288 * 3),
};
/* ------------------------  Relic Sub Stat ------------------------ */
const SPD = new Lottery([2, 2.3, 2.6]);
const FlatHP = new Lottery([33.87, 38.103755, 42.33751]);
const FlatATK = new Lottery([16.935, 19.051877, 21.168754]);
const FlatDEF = new Lottery([16.935, 19.051877, 21.168754]);
const HP = new Lottery([3.456, 3.888, 4.32]);
const ATK = new Lottery([3.456, 3.888, 4.32]);
const DEF = new Lottery([4.32, 4.86, 5.4]);
const BreakEffect = new Lottery([5.184, 5.832, 6.48]);
const EffectHitRate = new Lottery([3.456, 3.888, 4.32]);
const EffectRES = new Lottery([3.456, 3.888, 4.32]);
const CRITRate = new Lottery([2.592, 2.916, 3.24]);
const CRITDMG = new Lottery([5.184, 5.832, 6.48]);
export const SubStat = {
    SPD: new base.RandomStat("SPD", "速度", DisplayModes.Integer, SPD),
    FlatHP: new base.RandomStat("FlatHP", "生命值", DisplayModes.Integer, FlatHP),
    FlatATK: new base.RandomStat("FlatATK", "攻击力", DisplayModes.Integer, FlatATK),
    FlatDEF: new base.RandomStat("FlatDEF", "防御力", DisplayModes.Integer, FlatDEF),
    HP: new base.RandomStat("HP", "生命值", DisplayModes.Percentage1D, HP),
    ATK: new base.RandomStat("ATK", "攻击力", DisplayModes.Percentage1D, ATK),
    DEF: new base.RandomStat("DEF", "防御力", DisplayModes.Percentage1D, DEF),
    BreakEffect: new base.RandomStat("Break Effect", "击破特攻", DisplayModes.Percentage1D, BreakEffect),
    EffectHitRate: new base.RandomStat("Effect Hit Rate", "效果命中", DisplayModes.Percentage1D, EffectHitRate),
    EffectRES: new base.RandomStat("Effect RES", "效果抵抗", DisplayModes.Percentage1D, EffectRES),
    CRITRate: new base.RandomStat("CRIT Rate", "暴击率", DisplayModes.Percentage1D, CRITRate),
    CRITDMG: new base.RandomStat("CRIT DMG", "暴击伤害", DisplayModes.Percentage1D, CRITDMG),
};
/* ------------------------ Relic Piece Substat ------------------------ */
const subStat = new Lottery([
    SubStat.FlatHP,
    SubStat.FlatATK,
    SubStat.FlatDEF,
    SubStat.HP,
    SubStat.ATK,
    SubStat.DEF,
    SubStat.EffectHitRate,
    SubStat.EffectRES,
    SubStat.BreakEffect,
    SubStat.CRITRate,
    SubStat.CRITDMG,
    SubStat.SPD,
], [
    125, 125, 125, 125, 125, 125, 100, 100, 100, 75, 75, 50
]);
const subCount = new Lottery([
    3, 4
], [
    8, 2
]);
/* ------------------------ Relic Piece ------------------------ */
export const PiecesOuter = {
    Head: new sr.Piece("Head", "头部", new Lottery([MainStat.FlatHP]), subStat, subCount),
    Hands: new sr.Piece("Hands", "手部", new Lottery([MainStat.FlatATK]), subStat, subCount),
    Body: new sr.Piece("Body", "躯干", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.CRITRate,
        MainStat.CRITDMG,
        MainStat.OutgoingHealingBoost,
        MainStat.EffectHitRate,
    ], [20, 20, 20, 10, 10, 10, 10]), subStat, subCount),
    Feet: new sr.Piece("Feet", "脚部", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.SPD
    ], [30, 30, 30, 10]), subStat, subCount),
};
export const PiecesInner = {
    PlanarSphere: new sr.Piece("Planar Sphere", "位面球", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.DMGBoost.alterName("Physical DMG Boost", "物理属性伤害提高"),
        MainStat.DMGBoost.alterName("Fire DMG Boost", "火属性伤害提高"),
        MainStat.DMGBoost.alterName("Ice DMG Boost", "冰属性伤害提高"),
        MainStat.DMGBoost.alterName("Wind DMG Boost", "风属性伤害提高"),
        MainStat.DMGBoost.alterName("Lightning DMG Boost", "雷属性伤害提高"),
        MainStat.DMGBoost.alterName("Quantum DMG Boost", "量子属性伤害提高"),
        MainStat.DMGBoost.alterName("Imaginary DMG Boost", "虚数属性伤害提高"),
    ], [12.33, 12.33, 12.33, 9, 9, 9, 9, 9, 9, 9]), subStat, subCount),
    LinkRope: new sr.Piece("Link Rope", "连结绳", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.BreakEffect,
        MainStat.EnergyRegenerationRate,
    ], [26.67, 26.67, 26.67, 15, 5]), subStat, subCount),
};
/* ------------------------ Resin Drop ------------------------ */
// Currently no data for Star Rail
// avg. Drop count:
// Domain= 2.1; WeeklyBoss = 2.466; SimUniverse = 2.1
/* ------------------------ Score Calculation ------------------------ */
const ScoreMultipler = {
    "CRIT Rate": 2,
    "CRIT DMG": 1
}; // a very simple multipler
const findRule = (stat, rule) => {
    if (stat.name in rule)
        return rule[stat.name];
    return 0;
};
export const Scorer = (piece) => {
    let score = 0;
    piece.subStats.forEach(subStat => {
        score += subStat.value
            * findRule(subStat, ScoreMultipler);
    });
    return score;
};
/* ------------------------ Relic Set ------------------------ */
const piecesOuter = new Lottery(lodash.values(PiecesOuter));
const piecesInner = new Lottery(lodash.values(PiecesInner));
export const Sets = {
    GeniusOfBrilliantStars: new sr.Set("Genius of Brilliant Stars", "繁星璀璨的天才", ["量子", "量子套"], sr.RelicType.Outer, piecesOuter, {
        "Head": {
            name: "Genius's Ultraremote Sensing Visor",
            displayName: "天才的超距遥感",
            image: "量子/1.webp",
        },
        "Hands": {
            name: "Genius's Frequency Catcher",
            displayName: "天才的频变捕手",
            image: "量子/2.webp",
        },
        "Body": {
            name: "Genius's Metafield Suit",
            displayName: "天才的元域深潜",
            image: "量子/3.webp",
        },
        "Feet": {
            name: "Genius's Gravity Walker",
            displayName: "天才的引力漫步",
            image: "量子/4.webp",
        },
    }),
    RutilantArena: new sr.Set("Rutilant Arena", "繁星竞技场", ["繁星", "繁星套"], sr.RelicType.Inner, piecesInner, {
        "Planar Sphere": {
            name: "Taikiyan Laser Stadium",
            displayName: "泰科铵的镭射球场",
            image: "繁星/1.webp",
        },
        "Link Rope": {
            name: "Taikiyan's Arclight Race Track",
            displayName: "泰科铵的弧光赛道",
            image: "繁星/2.webp",
        },
    })
};
/* ------------------------ Relic Domain ------------------------ */
export const Domains = [
    new sr.Domain("Path of Providence", "睿治之径", ["量子本"], new Lottery([
        Sets.GeniusOfBrilliantStars,
    ])),
    new sr.Domain("World 7", "第七世界", [""], new Lottery([
        Sets.RutilantArena,
    ])),
];
