import { DisplayModes, Lottery } from '#gc';
import { Base } from '#gc.model';


export const MainStat = {
    FlatHP: new Base.ConstantStat(
        "FlatHP", "生命值", DisplayModes.Integer,
        112.896, 39.5136 * 3
    ),
    FlatATK: new Base.ConstantStat(
        "FlatATK", "攻击力", DisplayModes.Integer,
        56.448, 19.7568 * 3
    ),
    HP: new Base.ConstantStat(
        "HP", "生命值", DisplayModes.Percentage1D,
        6.9120, 2.4192 * 3
    ),
    ATK: new Base.ConstantStat(
        "ATK", "攻击力", DisplayModes.Percentage1D,
        6.9120, 2.4192 * 3
    ),
    DEF: new Base.ConstantStat(
        "DEF", "防御力", DisplayModes.Percentage1D,
        8.64, 3.024 * 3
    ),
    SPD: new Base.ConstantStat(
        "SPD", "速度", DisplayModes.Integer,
        4.032, 1.4 * 3
    ),
    BreakEffect: new Base.ConstantStat(
        "Break Effect", "击破特攻", DisplayModes.Percentage1D,
        10.368,	3.6277 * 3
    ),
    EffectHitRate: new Base.ConstantStat(
        "Effect Hit Rate", "效果命中", DisplayModes.Percentage1D,
        6.912, 2.4192 * 3
    ),
    EnergyRegenerationRate: new Base.ConstantStat(
        "Energy Regeneration Rate", "能量恢复效率", DisplayModes.Percentage1D,
        3.1104, 1.0886 * 3
    ),
    OutgoingHealingBoost: new Base.ConstantStat(
        "Outgoing Healing Boost", "治疗量加成", DisplayModes.Percentage1D,
        5.5296, 1.9354 * 3
    ),
    DMGBoost: new Base.ConstantStat(
        "DMG Boost", "属性伤害提高", DisplayModes.Percentage1D,
        6.2208, 2.1773 * 3
    ), // requires alterName later
    CRITRate: new Base.ConstantStat(
        "CRIT Rate", "暴击率", DisplayModes.Percentage1D,
        5.184, 1.8144 * 3
    ),
    CRITDMG: new Base.ConstantStat(
        "CRIT DMG", "暴击伤害", DisplayModes.Percentage1D,
        10.368, 3.6288 * 3
    ),
};



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
    SPD: new Base.RandomStat(
        "SPD", "速度", DisplayModes.Integer, SPD
    ),
    FlatHP: new Base.RandomStat(
        "FlatHP", "生命值", DisplayModes.Integer, FlatHP
    ),
    FlatATK: new Base.RandomStat(
        "FlatATK", "攻击力", DisplayModes.Integer, FlatATK
    ),
    FlatDEF: new Base.RandomStat(
        "FlatDEF", "防御力", DisplayModes.Integer, FlatDEF
    ),
    HP: new Base.RandomStat(
        "HP", "生命值", DisplayModes.Percentage1D, HP
    ),
    ATK: new Base.RandomStat(
        "ATK", "攻击力", DisplayModes.Percentage1D, ATK
    ),
    DEF: new Base.RandomStat(
        "DEF", "防御力", DisplayModes.Percentage1D, DEF
    ),
    BreakEffect: new Base.RandomStat(
        "Break Effect", "击破特攻", DisplayModes.Percentage1D, BreakEffect
    ),
    EffectHitRate: new Base.RandomStat(
        "Effect Hit Rate", "效果命中", DisplayModes.Percentage1D, EffectHitRate
    ),
    EffectRES: new Base.RandomStat(
        "Effect RES", "效果抵抗", DisplayModes.Percentage1D, EffectRES
    ),
    CRITRate: new Base.RandomStat(
        "CRIT Rate", "暴击率", DisplayModes.Percentage1D, CRITRate
    ),
    CRITDMG: new Base.RandomStat(
        "CRIT DMG", "暴击伤害", DisplayModes.Percentage1D, CRITDMG
    ),
};
