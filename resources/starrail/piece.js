import { Lottery } from '#gc';
import { StarRail } from '#gc.model';
import { MainStat, SubStat } from './stat.js';
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
    Head: new StarRail.Piece("Head", "头部", new Lottery([MainStat.FlatHP]), subStat, subCount),
    Hands: new StarRail.Piece("Hands", "手部", new Lottery([MainStat.FlatATK]), subStat, subCount),
    Body: new StarRail.Piece("Body", "躯干", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.CRITRate,
        MainStat.CRITDMG,
        MainStat.OutgoingHealingBoost,
        MainStat.EffectHitRate,
    ], [20, 20, 20, 10, 10, 10, 10]), subStat, subCount),
    Feet: new StarRail.Piece("Feet", "脚部", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.SPD
    ], [30, 30, 30, 10]), subStat, subCount),
};
export const PiecesInner = {
    PlanarSphere: new StarRail.Piece("Planar Sphere", "位面球", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.PhysicalDMGBoost,
        MainStat.FireDMGBoost,
        MainStat.IceDMGBoost,
        MainStat.WindDMGBoost,
        MainStat.LightningDMGBoost,
        MainStat.QuantumDMGBoost,
        MainStat.ImaginaryDMGBoost,
    ], [12.33, 12.33, 12.33, 9, 9, 9, 9, 9, 9, 9]), subStat, subCount),
    LinkRope: new StarRail.Piece("Link Rope", "连结绳", new Lottery([
        MainStat.HP,
        MainStat.ATK,
        MainStat.DEF,
        MainStat.BreakEffect,
        MainStat.EnergyRegenerationRate,
    ], [26.67, 26.67, 26.67, 15, 5]), subStat, subCount),
};
