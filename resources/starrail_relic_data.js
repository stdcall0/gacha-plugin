import lodash from 'lodash';
import * as base from '../model/base_artifact.js';
import * as sr from '../model/starrail_relic.js';
import Lottery from '../model/lottery.js';
import { DisplayModes } from '../model/utils.js';
/* ------------------------  Relic Main Stat ------------------------ */
export const StarRail_RelicMainStat = {
    FlatHP: new base.ArtifactStatIncrease("FlatHP", "生命值", 112.896, 39.5136, DisplayModes.Integer),
    FlatATK: new base.ArtifactStatIncrease("FlatATK", "攻击力", 56.448, 19.7568, DisplayModes.Integer),
    HP: new base.ArtifactStatIncrease("HP", "生命值", 6.9120, 2.4192, DisplayModes.Percentage1D),
    ATK: new base.ArtifactStatIncrease("ATK", "攻击力", 6.9120, 2.4192, DisplayModes.Percentage1D),
    DEF: new base.ArtifactStatIncrease("DEF", "防御力", 8.64, 3.024, DisplayModes.Percentage1D),
    SPD: new base.ArtifactStatIncrease("SPD", "速度", 4.032, 1.4, DisplayModes.Integer),
    BreakEffect: new base.ArtifactStatIncrease("Break Effect", "击破特攻", 10.368, 3.6277, DisplayModes.Percentage1D),
    EffectHitRate: new base.ArtifactStatIncrease("Effect Hit Rate", "效果命中", 6.912, 2.4192, DisplayModes.Percentage1D),
    EnergyRegenerationRate: new base.ArtifactStatIncrease("Energy Regeneration Rate", "能量恢复效率", 3.1104, 1.0886, DisplayModes.Percentage1D),
    OutgoingHealingBoost: new base.ArtifactStatIncrease("Outgoing Healing Boost", "治疗量加成", 5.5296, 1.9354, DisplayModes.Percentage1D),
    DMGBoost: new base.ArtifactStatIncrease("DMG Boost", "属性伤害提高", 6.2208, 2.1773, DisplayModes.Percentage1D), // requires alterName later
    CRITRate: new base.ArtifactStatIncrease("CRIT Rate", "暴击率", 5.184, 1.8144, DisplayModes.Percentage1D),
    CRITDMG: new base.ArtifactStatIncrease("CRIT DMG", "暴击伤害", 10.368, 3.6288, DisplayModes.Percentage1D),
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
export const StarRail_RelicSubStat = {
    SPD: new base.ArtifactStatRandomS("SPD", "速度", SPD, DisplayModes.Integer),
    FlatHP: new base.ArtifactStatRandomS("FlatHP", "生命值", FlatHP, DisplayModes.Integer),
    FlatATK: new base.ArtifactStatRandomS("FlatATK", "攻击力", FlatATK, DisplayModes.Integer),
    FlatDEF: new base.ArtifactStatRandomS("FlatDEF", "防御力", FlatDEF, DisplayModes.Integer),
    HP: new base.ArtifactStatRandomS("HP", "生命值", HP, DisplayModes.Percentage1D),
    ATK: new base.ArtifactStatRandomS("ATK", "攻击力", ATK, DisplayModes.Percentage1D),
    DEF: new base.ArtifactStatRandomS("DEF", "防御力", DEF, DisplayModes.Percentage1D),
    BreakEffect: new base.ArtifactStatRandomS("Break Effect", "击破特攻", BreakEffect, DisplayModes.Percentage1D),
    EffectHitRate: new base.ArtifactStatRandomS("Effect Hit Rate", "效果命中", EffectHitRate, DisplayModes.Percentage1D),
    EffectRES: new base.ArtifactStatRandomS("Effect RES", "效果抵抗", EffectRES, DisplayModes.Percentage1D),
    CRITRate: new base.ArtifactStatRandomS("CRIT Rate", "暴击率", CRITRate, DisplayModes.Percentage1D),
    CRITDMG: new base.ArtifactStatRandomS("CRIT DMG", "暴击伤害", CRITDMG, DisplayModes.Percentage1D),
};
/* ------------------------ Relic Piece Substat ------------------------ */
const subStat = new Lottery([
    StarRail_RelicSubStat.FlatHP,
    StarRail_RelicSubStat.FlatATK,
    StarRail_RelicSubStat.FlatDEF,
    StarRail_RelicSubStat.HP,
    StarRail_RelicSubStat.ATK,
    StarRail_RelicSubStat.DEF,
    StarRail_RelicSubStat.EffectHitRate,
    StarRail_RelicSubStat.EffectRES,
    StarRail_RelicSubStat.BreakEffect,
    StarRail_RelicSubStat.CRITRate,
    StarRail_RelicSubStat.CRITDMG,
    StarRail_RelicSubStat.SPD,
], [
    125, 125, 125, 125, 125, 125, 100, 100, 100, 75, 75, 50
]);
const subCount = new Lottery([
    3, 4
], [
    8, 2
]);
/* ------------------------ Relic Piece ------------------------ */
export const StarRail_RelicPiecesOuter = {
    Head: new sr.StarRail_RelicPiece("Head", "头部", new Lottery([StarRail_RelicMainStat.FlatHP]), subStat, subCount),
    Hands: new sr.StarRail_RelicPiece("Hands", "手部", new Lottery([StarRail_RelicMainStat.FlatATK]), subStat, subCount),
    Body: new sr.StarRail_RelicPiece("Body", "躯干", new Lottery([
        StarRail_RelicMainStat.HP,
        StarRail_RelicMainStat.ATK,
        StarRail_RelicMainStat.DEF,
        StarRail_RelicMainStat.CRITRate,
        StarRail_RelicMainStat.CRITDMG,
        StarRail_RelicMainStat.OutgoingHealingBoost,
        StarRail_RelicMainStat.EffectHitRate,
    ], [20, 20, 20, 10, 10, 10, 10]), subStat, subCount),
    Feet: new sr.StarRail_RelicPiece("Feet", "脚部", new Lottery([
        StarRail_RelicMainStat.HP,
        StarRail_RelicMainStat.ATK,
        StarRail_RelicMainStat.DEF,
        StarRail_RelicMainStat.SPD
    ], [30, 30, 30, 10]), subStat, subCount),
};
export const StarRail_RelicPiecesInner = {
    PlanarSphere: new sr.StarRail_RelicPiece("Planar Sphere", "位面球", new Lottery([
        StarRail_RelicMainStat.HP,
        StarRail_RelicMainStat.ATK,
        StarRail_RelicMainStat.DEF,
        StarRail_RelicMainStat.DMGBoost.alterName("Physical DMG Boost", "物理属性伤害提高"),
        StarRail_RelicMainStat.DMGBoost.alterName("Fire DMG Boost", "火属性伤害提高"),
        StarRail_RelicMainStat.DMGBoost.alterName("Ice DMG Boost", "冰属性伤害提高"),
        StarRail_RelicMainStat.DMGBoost.alterName("Wind DMG Boost", "风属性伤害提高"),
        StarRail_RelicMainStat.DMGBoost.alterName("Lightning DMG Boost", "雷属性伤害提高"),
        StarRail_RelicMainStat.DMGBoost.alterName("Quantum DMG Boost", "量子属性伤害提高"),
        StarRail_RelicMainStat.DMGBoost.alterName("Imaginary DMG Boost", "虚数属性伤害提高"),
    ], [12.33, 12.33, 12.33, 9, 9, 9, 9, 9, 9, 9]), subStat, subCount),
    LinkRope: new sr.StarRail_RelicPiece("Link Rope", "连结绳", new Lottery([
        StarRail_RelicMainStat.HP,
        StarRail_RelicMainStat.ATK,
        StarRail_RelicMainStat.DEF,
        StarRail_RelicMainStat.BreakEffect,
        StarRail_RelicMainStat.EnergyRegenerationRate,
    ], [26.67, 26.67, 26.67, 15, 5]), subStat, subCount),
};
/* ------------------------ Resin Drop ------------------------ */
// Currently no data for Star Rail
// avg. Drop count:
// Domain= 2.1; WeeklyBoss = 2.466; SimUniverse = 2.1
/* ------------------------ Score Calculation ------------------------ */
// Will later implement a score calculator for SR.
/* ------------------------ Relic Set ------------------------ */
const piecesOuter = new Lottery(lodash.values(StarRail_RelicPiecesOuter));
const piecesInner = new Lottery(lodash.values(StarRail_RelicPiecesInner));
export const StarRail_RelicSets = {
    GeniusOfBrilliantStars: new sr.StarRail_RelicSet("Genius of Brilliant Stars", "繁星璀璨的天才", ["量子", "量子套"], piecesOuter, {
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
    })
};
/* ------------------------ Relic Domain ------------------------ */
export const StarRail_RelicDomains = [
    new sr.StarRail_RelicDomain("Path of Providence", "睿治之径", ["量子本"], new Lottery([
        StarRail_RelicSets.GeniusOfBrilliantStars,
    ])),
];
